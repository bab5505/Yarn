const express = require('express');
const router = express.Router();
const pool = require('../db'); 


// Get all progress items
router.get('/progress', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM progress');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new progress item
router.post('/progress', async (req, res) => {
  const { project, timer, needleSize } = req.body;
  const values = [project, timer, needleSize];

  try {
    const { rows } = await pool.query('INSERT INTO progress (project, timer, needleSize) VALUES ($1, $2, $3) RETURNING *', values);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
