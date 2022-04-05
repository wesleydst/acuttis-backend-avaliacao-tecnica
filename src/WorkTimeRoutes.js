require('dotenv').config();
const mysql = require('mysql2');
const express = require('express')
const router = express.Router()
const timeCalculator = require("./domain/TimeCalculator");

// TODO: tudo tem que passar por validação de entrada (usar Joi?)
// TODO: separar: Router | Controller | Repository
// TODO: pesquisar como são migrations no Node.js
// TODO: separar configuração do banco

// Database Connection
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

router.post('/work-time', (req, res) => {
  const { start, end, user_email } = req.body;
  const result = timeCalculator.calculate(start, end);
  const data = {
    start: start,
    end: end,
    minutes_daytime: result.daytimeInMinutes,
    minutes_nocturnal: result.nocturnalInMinutes,
    user_email: user_email,
  };
  const sqlQuery = "INSERT INTO work_time SET ?";
  conn.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

router.get('/work-time', (req, res) => {
  const sqlQuery = "SELECT * FROM work_time";
  conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

router.get('/work-time/:email', (req, res) => {
  const sqlQuery = "SELECT * FROM work_time WHERE email = ?";
  conn.query(sqlQuery, [req.params.id], (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

router.put('/work-time', (req, res) => {
  // não faz muito sentido, é apenas para finalidade de teste
  const old_email = req.body.old_email;
  const new_email = req.body.new_email;
  const sqlQuery = "UPDATE work_time SET user_email = ? WHERE user_email = ?"
  conn.query(sqlQuery, [new_email, old_email], (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

router.delete('/work-time/:email', (req, res) => {
  const email = req.params.email;
  const sqlQuery = "DELETE FROM work_time WHERE user_email = ?";
  conn.query(sqlQuery, [email], (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

function apiResponse(results) {
  return JSON.stringify({ "status": 200, "error": null, "response": results });
}

module.exports = router;