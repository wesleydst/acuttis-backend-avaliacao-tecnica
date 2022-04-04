const express = require("express");
const timeCalculator = require("./domain/TimeCalculator");
const app = express();

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

module.exports = app;