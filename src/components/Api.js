import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001'; 

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
};

export default API;
