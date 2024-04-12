import axios from 'axios';

const BACKEND_BASE_URL = 'http://localhost:5000'; // Assuming backend server is running on port 5000

const api = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const API = {
  getAllYarns: () => api.get('/yarns'),
  createYarn: (data) => api.post('/yarns', data),
  getInventory: () => api.get('/inventory'),
  deleteYarn: (itemName) => api.delete(`/yarns/${itemName}`),
  getProjects: () => api.get('/projects'), // Backend API for projects
  getTrackers: () => api.get('/trackers'), // Backend API for trackers
  createProject: (projectData) => api.post('/projects', projectData), // Backend API for creating projects
  createTracker: (trackerData) => api.post('/trackers', trackerData), // Backend API for creating trackers
};

export default API;
