import puppeteer from "puppeteer";

// will default to current congress
const LAWS_URL = "https://www.congress.gov/public-laws/";
const CONGRESSES_SELECTOR = "#congresses > option";

    // scrape current page (latest congress)
    const pageScrape = async (browser, congressUrl) => {
        const page = await browser.newPage();
        await page.goto(congressUrl);
            
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
                    law.law = {...law.law, [child.innerText]: child.href}
                }

                // account for older tables
                let index = isOlderTable ? 2 : 1;
          
                const billNumberColumn = columns[index];
                const billNumberNodes = billNumberColumn.childNodes;
                const billLink = billNumberNodes[0];
                const billTitle = billNumberNodes[1]
                law.bill = {number: billLink.innerText, link: billLink.href, title: billTitle.textContent}

                index += 1;

                const dateColumn = columns[index];
                law.date = dateColumn.innerText;


                return law;
            })
            laws.push(lawData)
        }
        await page.close()
        return laws;
    }

(async () => {
    const browser = await puppeteer.launch({headless: "new"});
    const lawsPage = await browser.newPage();
    await lawsPage.goto(LAWS_URL);

    // get all congresses links
    const options = await lawsPage.$$eval(CONGRESSES_SELECTOR, (options) => options.map(option => option.textContent))
    // create link format - starting format: number 'congress' daterange
    const links = options.map(option => `${option.split(" ")[0]}-congress`)
    
    const data = links.map(async (link, i) => {
        if (i > 5) return {}
        const lawData = await pageScrape(browser, LAWS_URL + link)
        return {[link]: {laws: lawData, total: lawData.length}}
    })

    // TODO write to DB, firebase?
    
    const final = await Promise.all(data);

    console.dir(final)
    
    
    await browser.close()


})()


  // older congresses have a "statutes at large" column