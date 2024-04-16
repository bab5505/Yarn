const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM projects');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new project
router.post('/', async (req, res) => {
  const { description, hookSize, needleSize } = req.body;
  const values = [description, hookSize, needleSize];

  try {
    const { rows } = await pool.query('INSERT INTO projects (description, hookSize, needleSize) VALUES ($1, $2, $3) RETURNING *', values);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a project
router.put('/:id', async (req, res) => {
  const projectId = req.params.id;
  const { description, hookSize, needleSize } = req.body;
  const values = [description, hookSize, needleSize, projectId];

  try {
    const { rows } = await pool.query('UPDATE projects SET description = $1, hookSize = $2, needleSize = $3 WHERE id = $4 RETURNING *', values);
    if (rows.length === 0) {
      throw new Error('Project not found');
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  const projectId = req.params.id;

  try {
    const { rows } = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [projectId]);
    if (rows.length === 0) {
      throw new Error('Project not found');
    }
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
