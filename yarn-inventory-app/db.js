const { Pool } = require('pg');

const pool = new Pool({
  user: 'robert',
  host: 'localhost',
  database: 'yarn_inventory',
  password: 'cookers5',
  port: 5432, 
});

module.exports = pool;
