const express = require('express');
const router = express.Router();
const { pool } = require('../config');

router.get('/', (req, res) => {
  const queryString = 'SELECT * FROM users'
  pool.query(queryString, (error, results) => {
    if (error) {
      throw error
    }
    if (results.rows.length > 0) {
      res.json(results.rows)
    } else {
      res.json("no users")
    }
  })
});

router.post('/', (req, res) => {
  const values = [
    req.body.name,
    req.body.password,
    req.body.avatar
  ];
  

  const queryString = 'INSERT INTO users(name, password, avatar) VALUES ($1, $2, $3);';

  pool.query(queryString, values, (error, results) => {
    if (error) {
      throw error
    }
    console.log(results)
    res.json("user inserted");
  })
});

module.exports = router;