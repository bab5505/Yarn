const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Create a Sequelize instance and connect to PostgreSQL
const sequelize = new Sequelize('yarn_inventory', 'robert', 'cookers5', {
  host: 'localhost',
  dialect: 'postgres',
});

// Define Sequelize models
const InventoryItem = sequelize.define('InventoryItem', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Define API routes
app.get('/inventory', async (req, res) => {
  try {
    const inventory = await InventoryItem.findAll();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/inventory', async (req, res) => {
  const { name, description } = req.body;
  try {
    const newItem = await InventoryItem.create({ name, description });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/projects', async (req, res) => {
  const { name, description } = req.body;
  try {
    const newProject = await Project.create({ name, description });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Sync Sequelize models with the database and start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
