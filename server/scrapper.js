const puppeteer = require("puppeteer");

const Countries = require("./models/countries");

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

  browser.close();

  return {
    totalCases: totalCases,
    totalDeaths: totalDeaths,
    totalRecovered: totalRecovered,
  };
};

const convertToNumber = (num) => {
  if (num === "NaN" || num === " " || num === "" || num === "N/A") {
    return undefined;
  } else {
    return parseInt(num.replace(/,/g, ""));
  }
};

const getCountries = async () => {
  let countries = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.worldometers.info/coronavirus/");

  const countryNodes = await page.$$("a.mt_a");
  for (country of countryNodes.slice(0, 216)) {
    let parentNodes = await country.$x("ancestor::td/following-sibling::td");

    let countryText = await (
      await country.getProperty("textContent")
    ).jsonValue();
    countryText = countryText ? String(countryText) : undefined;

    let totalCases = await (
      await parentNodes[0].getProperty("textContent")
    ).jsonValue();
    totalCases = totalCases ? convertToNumber(totalCases) : undefined;

    let newCases = await (
      await parentNodes[1].getProperty("textContent")
    ).jsonValue();
    newCases = newCases ? convertToNumber(newCases) : undefined;

    let totalDeaths = await (
      await parentNodes[2].getProperty("textContent")
    ).jsonValue();
    totalDeaths = totalDeaths ? convertToNumber(totalDeaths) : undefined;

    let newDeaths = await (
      await parentNodes[3].getProperty("textContent")
    ).jsonValue();
    newDeaths = newDeaths ? convertToNumber(newDeaths) : undefined;

    let totalRecovered = await (
      await parentNodes[4].getProperty("textContent")
    ).jsonValue();
    totalRecovered = totalRecovered
      ? convertToNumber(totalRecovered)
      : undefined;

    let activeCases = await (
      await parentNodes[5].getProperty("textContent")
    ).jsonValue();
    activeCases = activeCases ? convertToNumber(activeCases) : undefined;

    let seriousCritical = await (
      await parentNodes[6].getProperty("textContent")
    ).jsonValue();
    seriousCritical = seriousCritical
      ? convertToNumber(seriousCritical)
      : undefined;

    let totalCasesP1M = await (
      await parentNodes[7].getProperty("textContent")
    ).jsonValue();
    totalCasesP1M = totalCasesP1M ? convertToNumber(totalCasesP1M) : undefined;

    let deathsP1M = await (
      await parentNodes[8].getProperty("textContent")
    ).jsonValue();
    deathsP1M = deathsP1M ? convertToNumber(deathsP1M) : undefined;

    let totalTests = await (
      await parentNodes[9].getProperty("textContent")
    ).jsonValue();
    totalTests = totalTests ? convertToNumber(totalTests) : undefined;

    let testsP1M = await (
      await parentNodes[10].getProperty("textContent")
    ).jsonValue();
    testsP1M = testsP1M ? convertToNumber(testsP1M) : undefined;

    let population = await (
      await parentNodes[11].getProperty("textContent")
    ).jsonValue();
    population = population ? convertToNumber(population) : undefined;

    let continent = await (
      await parentNodes[12].getProperty("textContent")
    ).jsonValue();
    continent = continent ? String(continent) : undefined;

    let scrappedCountry = {
      name: countryText,
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
    await countries.push(scrappedCountry);
  }
  browser.close();
  return countries;
};

const saveDataToDb = async () => {
  const countriesData = await getCountries();
  for (countryData of countriesData) {
    const country = new Countries({
      name: countryData.name,
      totalCases: countryData.totalCases,
      newCases: countryData.newCases,
      totalDeaths: countryData.totalDeaths,
      newDeaths: countryData.newDeaths,
      totalRecovered: countryData.totalRecovered,
      activeCases: countryData.activeCases,
      seriousCritical: countryData.seriousCritical,
      totalCasesP1M: countryData.totalCasesP1M,
      deathsP1M: countryData.deathsP1M,
      totalTests: countryData.totalTests,
      testsP1M: countryData.testsP1M,
      population: countryData.population,
      continent: countryData.continent,
    });
    try {
      await country.save();
    } catch (err) {
      console.log(countryData.name);
      console.log(err);
    }
  }
  console.log("Database successfully created!");
};

module.exports = {
  getAll: getAll,
  getCountries: getCountries,
  saveDataToDb: saveDataToDb,
};
