const { Pool } = require('pg');

const pool = new Pool({
  user: 'robert',
  host: 'your_host',
  database: 'yarn_inventory',
  password: 'cookers5',
  port: 5432, 
});

module.exports = pool;
