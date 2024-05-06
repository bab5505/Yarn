const express = require('express');
const cors = require('cors');
const path = require('path');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const Yarn = require('./models/YarnModel');
const InventoryItem = require('./models/InventoryItem');
const Project = require('./models/Projects');
const Progress = require('./models/Progress');
const sequelize = require('./db');
// const ejs = require('ejs');

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));


// Define API routes
app.get('/', async (req, res) => {
  try {
    res.render('home');
  } catch (error) {
    console.error('Error rendering home:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/inventory', async (req, res) => {
  try {
    console.log('GET /inventory request received');
    const inventoryItems = await InventoryItem.findAll();
    res.json(inventoryItems);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/projects', async (req, res) => {
  try {
    console.log('GET /projects request received');
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/progress', async (req, res) => {
  try {
    console.log('GET /progress request received');
    const progress = await Progress.findAll();
    res.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle POST request to add items
app.post('/add-item', async (req, res) => {
  try {
    console.log('POST /add-item request received');
    const { type, name, description } = req.body;
    console.log('Request body:', req.body);

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

// Define missing endpoints
app.get('/yarns', (req, res) => {
  try {
    // Replace this with your logic to fetch yarn items from your database
    const yarnItems = [{ name: 'Yarn Item 1' }, { name: 'Yarn Item 2' }];
    res.json(yarnItems);
  } catch (error) {
    console.error('Error fetching yarn items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/yarns', async (req, res) => {
  try {
    console.log('POST /yarns request received');
    
    // Extract the item data from the request body
    const { name } = req.body.item;

    // Check if the name is valid (example validation, adjust as needed)
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid name for yarn item');
    }

    // Create a new yarn item in your database using Sequelize or any ORM
    const newYarn = await Yarn.create({
      name,
      // Add other properties if necessary
    });

    // Respond with the newly created yarn item
    res.status(201).json(newYarn);
  } catch (error) {
    console.error('Error adding yarn:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/projects', async (req, res) => {
  try {
    console.log('POST /projects request received');
    // Add logic to create a new project
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/trackers', async (req, res) => {
  try {
    console.log('GET /trackers request received');
    // Add logic to fetch trackers
  } catch (error) {
    console.error('Error fetching trackers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/trackers', async (req, res) => {
  try {
    console.log('POST /trackers request received');
    // Add logic to handle the POST request for trackers
    res.json({ message: 'Tracker added successfully' });
  } catch (error) {
    console.error('Error adding tracker:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Define routes to render HTML pages
// app.get('/inventory-html', async (req, res) => {
//   try {
//     const inventory = await InventoryItem.findAll();
//     res.render('inventory', { items: inventory });
//   } catch (error) {
//     console.error('Error rendering inventory HTML:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.get('/projects-html', async (req, res) => {
//   try {
//     const projects = await Project.findAll();
//     res.render('projects', { projects: projects });
//   } catch (error) {
//     console.error('Error rendering projects HTML:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.get('/progress-html', async (req, res) => {
//   try {
//     const progress = await Progress.findAll();
//     res.render('progress', { progress: progress });
//   } catch (error) {
//     console.error('Error rendering progress HTML:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// Sync Sequelize models with the database and start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
