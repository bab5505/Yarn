const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Sample data for the yarn inventory
const yarnInventory = [];

// Route to get the yarn inventory
app.get('/api/inventory', (req, res) => {
  res.json(yarnInventory);
});

// Route to add an item to the yarn inventory
app.post('/api/inventory', (req, res) => {
  const newItem = req.body.item;
  yarnInventory.push(newItem);
  res.json({ message: 'Item added to inventory' });
});

// Route to remove an item from the yarn inventory
app.delete('/api/inventory/:item', (req, res) => {
  const itemToRemove = req.params.item;
  const index = yarnInventory.indexOf(itemToRemove);
  if (index > -1) {
    yarnInventory.splice(index, 1);
    res.json({ message: 'Item removed from inventory' });
  } else {
    res.status(404).json({ message: 'Item not found in inventory' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});