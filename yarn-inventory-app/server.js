const express = require('express');
const cors = require('cors');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'ejs', ejs);
app.set('views', path.join(__dirname, 'views'));

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

const Progress = sequelize.define('Progress', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Define API routes
app.get('/', async (req, res) => {
  try {
    res.render('home');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/inventory', async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.findAll();
    res.json(inventoryItems);
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

app.get('/progress', async (req, res) => {
  try {
    const progress = await Progress.findAll();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle POST request to add items
app.post('/add-item', async (req, res) => {
  try {
    const { type, name, description } = req.body;

    // Determine which model to use based on the type
    const model = type === 'yarn' ? InventoryItem : Project;

    // Create a new item
    const newItem = await model.create({
      name,
      description,
    });

    res.json(newItem);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define routes to render HTML pages
app.get('/inventory-html', async (req, res) => {
  try {
    const inventory = await InventoryItem.findAll();
    res.render('inventory', { items: inventory });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/projects-html', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.render('projects', { projects: projects });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/progress-html', async (req, res) => {
  try {
    const progress = await Progress.findAll();
    res.render('progress', { progress: progress });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// Sync Sequelize models with the database and start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
