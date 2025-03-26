const express = require("express");
const esnovelRoutes = require("../src/novels/routes/esnovelsRoutes");
const bacalightRoutes = require("../src/novels/routes/bacalightRoutes");

const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Jellee Api - your destination for scrapping data from various novel & manga sites! Seamlessly access  id, title, image and more.");
});

app.use("/novel", esnovelRoutes);
app.use("/novel", bacalightRoutes);

// Start server
module.exports = app;
