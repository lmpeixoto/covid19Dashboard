const puppeteer = require("puppeteer");

var getAll = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.worldometers.info/coronavirus/");

  const values = await page.$x('//*[@id="maincounter-wrap"]/div/span');

  let totalCases = await (
    await values[0].getProperty("textContent")
  ).jsonValue();

  totalCases = parseInt(totalCases.replace(/,/g, ""));

  let totalDeaths = await (
    await values[1].getProperty("textContent")
  ).jsonValue();

  totalDeaths = parseInt(totalDeaths.replace(/,/g, ""));

  let totalRecovered = await (
    await values[2].getProperty("textContent")
  ).jsonValue();

  totalRecovered = parseInt(totalRecovered.replace(/,/g, ""));

  console.log({ totalCases, totalDeaths, totalRecovered });

  browser.close();
};

getAll();
