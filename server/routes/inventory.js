const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');

const router = express.Router();

const pool = new Pool({
  user: 'robert',
  host: 'localhost',
  database: 'yarn_inventory',
  password: 'cookers5',
  port: 5432,
});

// Base URL for Axios requests
const baseURL = 'http://localhost:5000'; // Update with your server's base URL

// GET all inventory items using Axios
router.get('/yarns', async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/yarns`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching inventory items:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new inventory item using Axios
router.post('/yarns', async (req, res) => {
  try {
    const newItemName = req.body.name;

    if (!newItemName || typeof newItemName !== 'string') {
      throw new Error('Invalid item name');
    }

    const client = await pool.connect();
    try {
      await client.query('INSERT INTO yarns (name) VALUES ($1)', [newItemName]);
      res.status(201).json({ message: 'Item added successfully' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error adding item:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// PUT (update) an existing inventory item by ID using Axios
router.put('/:id', async (req, res) => {
  const itemId = req.params.id;
  const { name } = req.body; // Extract 'name' property from request body
  try {
    // Your code to update the item in the database...

    // Example code to send a response (replace with your logic)
    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error('Error updating item:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE an inventory item by ID using Axios
router.delete('/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    // Your code to delete the item from the database...

    // Example code to send a response (replace with your logic)
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
