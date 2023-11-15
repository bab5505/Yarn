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
    const result = await client.query('SELECT * FROM yarn_inventory');
    res.json(result.rows);
  } finally {
    client.release();
  }
});

router.post('/', async (req, res) => {
  const newItem = req.body.item;
  const client = await pool.connect();
  try {
    await client.query('INSERT INTO yarn_inventory (name) VALUES ($1)', [newItem.name]);
    res.json({ message: 'Item added to yarn inventory' });
  } finally {
    client.release();
  }
});

router.delete('/:item', async (req, res) => {
  const itemToRemove = req.params.item;
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM yarn_inventory WHERE name = $1', [itemToRemove]);
    if (result.rowCount > 0) {
      res.json({ message: 'Item removed from yarn inventory' });
    } else {
      res.status(404).json({ message: 'Item not found in yarn inventory' });
    }
  } finally {
    client.release();
  }
});

module.exports = router;