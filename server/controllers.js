const { getAll } = require("./scrapper");
const Countries = require("./models/countries");

exports.getSummary = async (req, res, next) => {
  const summary = await getAll();
  res.json(summary);
};

exports.getAllCountries = async (req, res, next) => {
  const all = await Countries.find();
  res.json(all);
};

exports.getCountry = async (req, res, next) => {
  const country = req.params.country;
  const countryQuery = await Countries.find({ name: country });
  res.json(countryQuery);
};

exports.getContinent = async (req, res, next) => {
  const continent = req.params.continent;
  const continentQuery = await Countries.find({ continent: continent });
  res.json(continentQuery);
};
