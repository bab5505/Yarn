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

// GET all inventory items
router.get('/yarns', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM yarn_inventory');
    res.json(result.rows);
  } finally {
    client.release();
  }
});

// POST a new inventory item
router.post('/yarns', async (req, res) => {
  const newItem = req.body.item;
  const client = await pool.connect();
  try {
    await client.query('INSERT INTO yarn_inventory (name) VALUES ($1)', [newItem.name]);
    res.json({ message: 'Item added to yarn inventory' });
  } finally {
    client.release();
  }
});

// PUT (update) an existing inventory item by ID
router.put('/:id', async (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body.item; // Assuming you send the updated item data in the request body
  const client = await pool.connect();
  try {
    const result = await client.query('UPDATE yarn_inventory SET name = $1 WHERE id = $2', [updatedItem.name, itemId]);
    if (result.rowCount > 0) {
      res.json({ message: 'Item updated in yarn inventory' });
    } else {
      res.status(404).json({ message: 'Item not found in yarn inventory' });
    }
  } finally {
    client.release();
  }
});

// DELETE an inventory item by ID
router.delete('/:id', async (req, res) => {
  const itemId = req.params.id;
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM yarn_inventory WHERE id = $1', [itemId]);
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
