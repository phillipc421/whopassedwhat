import puppeteer from "puppeteer";
import { app } from "./firebaseAdminConfig.js";
import { getDatabase } from "firebase-admin/database";
import { linkPresident } from "./presidents.js";

// will default to current congress
const LAWS_URL = "https://www.congress.gov/public-laws/";
const CONGRESSES_SELECTOR = "#congresses > option";
import { PRESIDENTS } from "./presidents.js";

// init db
const db = getDatabase(app);

const presidentRef = db.ref("v2/presidents");
const congressRef = db.ref("v2/congresses");
const lawsRef = db.ref(`v2/laws`);

// scrape current page (latest congress)
const pageScrape = async (browser, congressUrl, congress) => {
  const page = await browser.newPage();
  await page.goto(congressUrl);
  console.log("page opened", congressUrl);

  const tableRows = await page.$$("tr");
  const laws = [];
  // start at index 1, skip header row
  for (let i = 1; i < tableRows.length; i++) {
    const currentRow = tableRows[i];
    try {
      const lawData = await currentRow.$$eval(
        "td",
        (columns, congress) => {
          const isOlderTable = columns.length === 4;
          const law = {};
          // first column always the same (law number)

          const lawNumberColumn = columns[0];
          const lawNumberNode =
            lawNumberColumn.children.length !== 0
              ? lawNumberColumn.children[0]
              : lawNumberColumn.innerText;
          law.publicLawNumber = lawNumberNode.innerText;
          law.textLink = lawNumberNode.href || null;

          // account for older tables - older congresses have a "statutes at large" column
          let index = isOlderTable ? 2 : 1;

          const billNumberColumn = columns[index];
          const billNumberNodes = billNumberColumn.childNodes;
          const billLink = billNumberNodes[0];
          const billTitle = billNumberNodes[1];

          law.billNumber = billLink.innerText;
          law.billLink = billLink.href || null;
          law.billTitle = billTitle.textContent;

          index += 1;

          const dateColumn = columns[index];
          const date = dateColumn.innerText;
          law.passedDate = date;

          law.congress = congress;

          return law;
        },
        congress
      );
      const president = linkPresident(lawData.passedDate);
      if (!president) console.log(lawData);
      lawData.president = president;

      laws.push(lawData);
    } catch (e) {
      console.log(e);
    }
  }
  await page.close();
  console.log("Page closed", congressUrl);
  return laws;
};

const saveToDb = (data) => {
  data.forEach((law) => {
    const newLawRef = lawsRef.push();
    const lawId = newLawRef.key;
    const lawObj = { ...law, id: lawId };
    newLawRef.set(lawObj);

    const newPresRef = presidentRef.child(`${law.president.slug}/${lawId}`);
    newPresRef.set(lawObj);

    const newCongressRef = congressRef.child(`${law.congress}/${lawId}`);
    newCongressRef.set(lawObj);
  });
};

const scrapeAndWriteDb = async (link, browser, db) => {
  // link format -> 118th-congress
  try {
    const lawData = await pageScrape(
      browser,
      LAWS_URL + link,
      link.split("-")[0]
    );
    // rework to have law title and bill title at root level
    saveToDb(lawData, db);
  } catch (e) {
    console.log("caught here", e);
  }
};

const batchRun = (batchSize, startIndex, links, browser, db) => {
  const batch = [];
  for (
    let i = startIndex;
    i < startIndex + batchSize && i < links.length;
    i++
  ) {
    const link = links[i];
    batch.push(scrapeAndWriteDb(link, browser, db));
  }

  return Promise.all(batch);
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
    try {
      await batchRun(5, i, links, browser, db);
      console.log(
        "batch done",
        i,
        i + 5 > links.length ? links.length - 1 : i + 5
      );
    } catch (e) {
      console.log("caught in for loop");
    }
  }

  await browser.close();
  console.log("Browser closed.");
};

scrape();

const testRefs = () => {
  const ass = [
    "ass",
    "butt",
    "ass",
    "phillip",
    "phillip",
    "ass",
    "booty",
    "pipe",
    "ass",
    "claire",
  ];
  // const presidentRef = db.ref("v2/presidents");
  for (let i = 0; i < 10; i++) {
    const yeetRef = presidentRef.child(ass[i]);
    const yeetrefA = yeetRef.push();
    const yeetrefid = yeetrefA.key;
    yeetrefA.set({ val: "hi" });
  }
};

// testRefs();
// testRefs();
// testRefs();

// console.log(PRESIDENTS[PRESIDENTS.length - 1]);

// PRESIDENTS.forEach((pres) => {
//   console.log(pres);
// });
