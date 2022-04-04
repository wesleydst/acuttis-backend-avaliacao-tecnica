const express = require("express");
const cors = require('cors');
const timeCalculator = require("./domain/TimeCalculator");
const app = express();

app.use(cors());

app.get("/time-calculator/calculate/:start/:end", (req, res) => {
  const { start, end } = req.params;
  const result = timeCalculator.calculate(start, end);
  res.json(result);
});

app.use((req, res, next) => {
  res.status(404).send();
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ error: err.message })
})

module.exports = app;