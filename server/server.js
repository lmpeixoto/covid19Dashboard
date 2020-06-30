const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const controllers = require("./controllers");

const app = express();
const PORT = 3000;
const MONGODB_URI = `mongodb+srv://sleepl:oMLvdUrSfsOlZY3w@cluster0-kwnmr.mongodb.net/test`;

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

const public_folder = path.join(__dirname, "public");

app.use(express.static(public_folder));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", controllers.getSummary);

app.get("/all", controllers.getAllCountries);

app.get("/country/:country", controllers.getCountry);

app.get("/continent/:continent", controllers.getContinent);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
