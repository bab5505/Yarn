const express = require('express');
const { Pool } = require('pg');

const router = express.Router();

const pool = new Pool({
  user: 'robert',
  host: 'localhost',
  database: 'yarn_inventory',
  password: 'cookers5',
  port: 5432,
});

router.get('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM projects');
    res.json(result.rows);
  } finally {
    client.release();
  }
});

router.post('/', async (req, res) => {
  const newProject = req.body.project;
  const client = await pool.connect();
  try {
    await client.query('INSERT INTO projects (name, description) VALUES ($1, $2)', [newProject.name, newProject.description]);
    res.json({ message: 'Project added' });
  } finally {
    client.release();
  }
});

router.delete('/:project', async (req, res) => {
  const projectToRemove = req.params.project;
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM projects WHERE name = $1', [projectToRemove]);
    if (result.rowCount > 0) {
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } finally {
    client.release();
  }
});

module.exports = router;