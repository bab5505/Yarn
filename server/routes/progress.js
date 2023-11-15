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
    const result = await client.query('SELECT * FROM progress_items');
    res.json(result.rows);
  } finally {
    client.release();
  }
});

router.post('/', async (req, res) => {
  const newItem = req.body.item;
  const client = await pool.connect();
  try {
    await client.query('INSERT INTO progress_items (description) VALUES ($1)', [newItem.description]);
    res.json({ message: 'Progress item added' });
  } finally {
    client.release();
  }
});

router.delete('/:item', async (req, res) => {
  const itemToRemove = req.params.item;
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM progress_items WHERE description = $1', [itemToRemove]);
    if (result.rowCount > 0) {
      res.json({ message: 'Progress item removed' });
    } else {
      res.status(404).json({ message: 'Progress item not found' });
    }
  } finally {
    client.release();
  }
});

module.exports = router;