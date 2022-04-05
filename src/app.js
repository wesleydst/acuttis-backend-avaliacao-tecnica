const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const timeCalculator = require("./domain/TimeCalculator");
const app = express();
const workTimeRoutes = require("./WorkTimeRoutes");

app.use(bodyParser.json()); // parse application/json
app.use(cors());
app.use(workTimeRoutes);

app.get("/time-calculator/calculate/:start/:end", (req, res) => {
  const { start, end } = req.params;
  const result = timeCalculator.calculate(start, end);
  res.json(result);
});

app.use((req, res, next) => {
  res.status(404).send();
});

app.use((err, req, res, next) => {
  const isRunningTest = process.env.JEST_WORKER_ID !== undefined;
  if (isRunningTest === false) {
    console.error(err.stack)
  }

  res.status(500).send({ error: err.message })
})

module.exports = app;