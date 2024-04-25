const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());

// Sample data for the yarn inventory, projects, and progress
const yarnInventory = [];
const projects = [];
const progress = [];

// Helper function to check if an item exists in an array
const findItemIndex = (array, id) => {
  return array.findIndex((item) => item.id === id);
};

// Route to get the yarn inventory
app.get('/inventory', (req, res) => {
  res.json(yarnInventory);
});

// Route to add an item to the yarn inventory
app.post('/inventory', (req, res) => {
  const newItem = req.body;
  yarnInventory.push(newItem);
  res.json({ message: 'Item added to inventory' });
});

// Route to remove an item from the yarn inventory
app.delete('/inventory/:id', (req, res) => {
  const { id } = req.params;
  const index = findItemIndex(yarnInventory, id);
  if (index > -1) {
    yarnInventory.splice(index, 1);
    res.json({ message: 'Item removed from inventory' });
  } else {
    res.status(404).json({ message: 'Item not found in inventory' });
  }
});

// Route to get all projects
app.get('/projects', (req, res) => {
  res.json(projects);
});

// Route to add a new project
app.post('/projects', (req, res) => {
  const newProject = req.body;
  projects.push(newProject);
  res.json({ message: 'Project added successfully' });
});

// Route to update a project by ID
app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const updatedProject = req.body;
  const index = findItemIndex(projects, id);
  if (index > -1) {
    projects[index] = updatedProject;
    res.json({ message: 'Project updated successfully' });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

// Route to delete a project by ID
app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  const index = findItemIndex(projects, id);
  if (index > -1) {
    projects.splice(index, 1);
    res.json({ message: 'Project deleted successfully' });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

// Route to get all progress
app.get('/progress', (req, res) => {
  res.json(progress);
});

// Route to add new progress
app.post('/progress', (req, res) => {
  const newProgress = req.body;
  progress.push(newProgress);
  res.json({ message: 'Progress added successfully' });
});

// Route to update progress by ID
app.put('/progress/:id', (req, res) => {
  const { id } = req.params;
  const updatedProgress = req.body;
  const index = findItemIndex(progress, id);
  if (index > -1) {
    progress[index] = updatedProgress;
    res.json({ message: 'Progress updated successfully' });
  } else {
    res.status(404).json({ message: 'Progress not found' });
  }
});

// Route to delete progress by ID
app.delete('/progress/:id', (req, res) => {
  const { id } = req.params;
  const index = findItemIndex(progress, id);
  if (index > -1) {
    progress.splice(index, 1);
    res.json({ message: 'Progress deleted successfully' });
  } else {
    res.status(404).json({ message: 'Progress not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
