const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CountriesSchema = new Schema(
  {
    name: { type: String, required: true },
    totalCases: Number,
    newCases: Number,
    totalDeaths: Number,
    newDeaths: Number,
    totalRecovered: Number,
    activeCases: Number,
    seriousCritical: Number,
    totalCasesP1M: Number,
    deathsP1M: Number,
    totalTests: Number,
    testsP1M: Number,
    population: Number,
    continent: { type: String, required: true },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Countries", CountriesSchema);
