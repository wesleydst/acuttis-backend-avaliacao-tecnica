const express = require("express");
const cors = require('cors');
const timeCalculator = require("./domain/TimeCalculator");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Hello Universe!"
  });
});

app.get("/time-calculator/calculate/:start/:end", (req, res) => {
  const { start, end } = req.params;
  const result = timeCalculator.calculate(start, end);
  res.json(result);
});

app.use((req, res, next) => {
  res.status(404).send();
});

module.exports = app;