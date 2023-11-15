const express = require('express');
const router = express.Router();
const pool = require('../db'); 


// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM projects');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new project
router.post('/projects', async (req, res) => {
  const { description, hookSize, needleSize } = req.body;
  const values = [description, hookSize, needleSize];

  try {
    const { rows } = await pool.query('INSERT INTO projects (description, hookSize, needleSize) VALUES ($1, $2, $3) RETURNING *', values);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
