const puppeteer = require("puppeteer");

const getAll = async () => {
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

  // parse table rows and columns and save to array

  console.log({ totalCases, totalDeaths, totalRecovered });

  browser.close();
};

const convertToNumber = (num) => {
  return parseInt(num.replace(/,/g, ""));
};

const getCountries = async () => {
  let countries = {};
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.worldometers.info/coronavirus/");

  const countryNodes = await page.$$("a.mt_a");
  for (country of countryNodes) {
    let parentNodes = await country.$x("ancestor::td/following-sibling::td");

    let countryText = await (
      await country.getProperty("textContent")
    ).jsonValue();
    countryText = countryText ? String(countryText) : null;

    let totalCases = await (
      await parentNodes[0].getProperty("textContent")
    ).jsonValue();
    totalCases = totalCases ? convertToNumber(totalCases) : null;

    let newCases = await (
      await parentNodes[1].getProperty("textContent")
    ).jsonValue();
    newCases = newCases ? convertToNumber(newCases) : null;

    let totalDeaths = await (
      await parentNodes[2].getProperty("textContent")
    ).jsonValue();
    totalDeaths = totalDeaths ? convertToNumber(totalDeaths) : null;

    let newDeaths = await (
      await parentNodes[3].getProperty("textContent")
    ).jsonValue();
    newDeaths = newDeaths ? convertToNumber(newDeaths) : null;

    let totalRecovered = await (
      await parentNodes[4].getProperty("textContent")
    ).jsonValue();
    totalRecovered = totalRecovered ? convertToNumber(totalRecovered) : null;

    let activeCases = await (
      await parentNodes[5].getProperty("textContent")
    ).jsonValue();
    activeCases = activeCases ? convertToNumber(activeCases) : null;

    let seriousCritical = await (
      await parentNodes[6].getProperty("textContent")
    ).jsonValue();
    seriousCritical = seriousCritical ? convertToNumber(seriousCritical) : null;

    let totalCasesP1M = await (
      await parentNodes[7].getProperty("textContent")
    ).jsonValue();
    totalCasesP1M = totalCasesP1M ? convertToNumber(totalCasesP1M) : null;

    let deathsP1M = await (
      await parentNodes[8].getProperty("textContent")
    ).jsonValue();
    deathsP1M = deathsP1M ? convertToNumber(deathsP1M) : null;

    let totalTests = await (
      await parentNodes[9].getProperty("textContent")
    ).jsonValue();
    totalTests = totalTests ? convertToNumber(totalTests) : null;

    let testsP1M = await (
      await parentNodes[10].getProperty("textContent")
    ).jsonValue();
    testsP1M = testsP1M ? convertToNumber(testsP1M) : null;

    let population = await (
      await parentNodes[11].getProperty("textContent")
    ).jsonValue();
    population = population ? convertToNumber(population) : null;

    let continent = await (
      await parentNodes[12].getProperty("textContent")
    ).jsonValue();
    continent = continent ? String(continent) : null;

    countries[countryText] = {
      totalCases: totalCases,
      newCases: newCases,
      totalDeaths: totalDeaths,
      newDeaths: newDeaths,
      totalRecovered: totalRecovered,
      activeCases: activeCases,
      seriousCritical: seriousCritical,
      totalCasesP1M: totalCasesP1M,
      deathsP1M: deathsP1M,
      totalTests: totalTests,
      testsP1M: testsP1M,
      population: population,
      continent: continent,
    };
  }
  console.log(countries);
  browser.close();
};

// getAll();
getCountries();
//*[@id="main_table_countries_today"]/tbody[1]/tr[3]/td[2]/a
