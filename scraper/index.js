import puppeteer from "puppeteer";
import { app } from "./firebaseAdminConfig.js";
import { getDatabase } from "firebase-admin/database";

// will default to current congress
const LAWS_URL = "https://www.congress.gov/public-laws/";
const CONGRESSES_SELECTOR = "#congresses > option";

// init db
const db = getDatabase(app);

// scrape current page (latest congress)
const pageScrape = async (browser, congressUrl) => {
  const page = await browser.newPage();
  await page.goto(congressUrl);
  console.log("page opened", congressUrl);

  const tableRows = await page.$$("tr");
  const laws = [];
  // start at index 1, skip header row
  for (let i = 1; i < tableRows.length; i++) {
    const currentRow = tableRows[i];
    const lawData = await currentRow.$$eval("td", (columns) => {
      const isOlderTable = columns.length === 4;
      const law = {};
      // first column always the same (law number)
      const lawNumberColumn = columns[0];
      for (let i = 0; i < lawNumberColumn.children.length; i++) {
        const child = lawNumberColumn.children[i];
        law.law = { ...law.law, [child.innerText]: child.href };
      }

      // account for older tables - older congresses have a "statutes at large" column
      let index = isOlderTable ? 2 : 1;

      const billNumberColumn = columns[index];
      const billNumberNodes = billNumberColumn.childNodes;
      const billLink = billNumberNodes[0];
      const billTitle = billNumberNodes[1];
      law.bill = {
        number: billLink.innerText,
        link: billLink.href,
        title: billTitle.textContent,
      };

      index += 1;

      const dateColumn = columns[index];
      law.date = dateColumn.innerText;

      return law;
    });
    laws.push(lawData);
  }
  await page.close();
  console.log("Page closed", congressUrl);
  return laws;
};

const saveToDb = (data, db) => {
  // laws ref
  const congressRef = db.ref(`laws/${data.congress}`);
  const totalRef = congressRef.child("total");
  totalRef.set(data.data.total);
  const lawsRef = congressRef.child("laws");
  data.data.laws.forEach((law) => {
    const newLawRef = lawsRef.push();
    const id = newLawRef.key;
    newLawRef.set({ ...law, id });
  });
};

const scrapeAndWriteDb = async (link, browser, db) => {
  const lawData = await pageScrape(browser, LAWS_URL + link);
  // rework to have law title and bill title at root level
  const dbData = {
    congress: link,
    data: { laws: lawData, total: lawData.length },
  };
  saveToDb(dbData, db);
};

const batchRun = async (batchSize, startIndex, links, browser, db) => {
  const batch = [];
  for (
    let i = startIndex;
    i < startIndex + batchSize && i < links.length;
    i++
  ) {
    const link = links[i];
    batch.push(scrapeAndWriteDb(link, browser, db));
  }

  return Promise.allSettled(batch);
};

const scrape = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const lawsPage = await browser.newPage();
  await lawsPage.goto(LAWS_URL);

  // get all congresses links
  const options = await lawsPage.$$eval(CONGRESSES_SELECTOR, (options) =>
    options.map((option) => option.textContent)
  );
  // create link format - starting format: number 'congress' daterange
  const links = options.map((option) => `${option.split(" ")[0]}-congress`);

  for (let i = 0; i < links.length; i += 5) {
    await batchRun(5, i, links, browser, db);
    console.log(
      "batch done",
      i,
      i + 5 > links.length ? links.length - 1 : i + 5
    );
  }

  await browser.close();
  console.log("Browser closed.");
};

scrape();
