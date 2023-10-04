import puppeteer from "puppeteer";
import { app } from "./firebaseAdminConfig.js";
import { getDatabase } from "firebase-admin/database";
import { linkPresident } from "./presidents.js";

// will default to current congress
const LAWS_URL = "https://www.congress.gov/public-laws/";
const CONGRESSES_SELECTOR = "#congresses > option";

// init db
const db = getDatabase(app);

const DB_VERSION_PREFIX = "v3";

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
          // date format on site = mm/dd/yyyy -> convert to yyyy-mm-dd
          const dateValues = dateColumn.innerText
            .split("/")
            .map((v) => parseInt(v));
          const [month, day, year] = dateValues;
          const dateObj = new Date(year, month - 1, day);
          law.passedDate = dateObj.toISOString();

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

const saveToDb = (data, db) => {
  // laws ref
  const lawsRef = db.ref(`${DB_VERSION_PREFIX}/laws`);
  const lawsRefTotalsRef = lawsRef.child("total");
  data.forEach((law) => {
    // law entry
    const lawYearRef = lawsRef.child(law.passedDate.split("-")[0]);
    const lawYearLawsRef = lawYearRef.child("laws");
    const lawYearTotalsRef = lawYearRef.child("total");
    const newLawRef = lawYearLawsRef.push();
    const lawId = newLawRef.key;
    const lawObj = { ...law, id: lawId };
    lawYearTotalsRef.transaction((currentValue) => {
      return (currentValue || 0) + 1;
    });
    lawsRefTotalsRef.transaction((currentValue) => {
      return (currentValue || 0) + 1;
    });
    newLawRef.set(lawObj);

    // president ref
    const presidentRef = db.ref(
      `${DB_VERSION_PREFIX}/presidents/${law.president.slug}`
    );
    const presidentRefLawsRef = presidentRef.child(`laws/${lawId}`);
    const presidentRefTotalsRef = presidentRef.child("total");
    presidentRefLawsRef.set({ ...law, id: lawId });
    presidentRefTotalsRef.transaction((currentValue) => {
      return (currentValue || 0) + 1;
    });

    // congress ref
    const congressRef = db.ref(
      `${DB_VERSION_PREFIX}/congresses/${law.congress}`
    );
    const congressRefLawsRef = congressRef.child(`laws/${lawId}`);
    const congressRefTotalsRef = congressRef.child("total");
    congressRefLawsRef.set({ ...law, id: lawId });
    congressRefTotalsRef.transaction((currentValue) => {
      return (currentValue || 0) + 1;
    });

    // can we get a total during write?
  });
};

const scrapeAndWriteDb = async (link, browser, db) => {
  // link format -> 118th-congress
  try {
    const lawDataPerCongress = await pageScrape(
      browser,
      LAWS_URL + link,
      link.split("-")[0]
    );
    // rework to have law title and bill title at root level
    saveToDb(lawDataPerCongress, db);
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
