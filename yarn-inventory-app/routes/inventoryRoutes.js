const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all inventory items
router.get('/inventory', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM inventory');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new inventory item
router.post('/inventory', async (req, res) => {
  const { yarnType, completedProjects } = req.body;
  const values = [yarnType, completedProjects];

  try {
    const { rows } = await pool.query('INSERT INTO inventory (yarnType, completedProjects) VALUES ($1, $2) RETURNING *', values);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
