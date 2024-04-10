import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const API = {
  getAllYarns: () => api.get('/yarns'),
  createYarn: (data) => api.post('/yarns', data),
  getInventory: () => api.get('/inventory')
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching inventory:', error);
      throw error; // rethrow the error to maintain consistency in error handling
    }),
  deleteYarn: (itemName) => api.delete(`/yarns/${itemName}`),
  getProjects: () => api.get('/projects'),
  getTrackers: () => api.get('/trackers'),
  createProject: (projectData) => api.post('/projects', projectData) // Added createProject function
};

export default API;
