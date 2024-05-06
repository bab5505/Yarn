// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'robert',
//   host: 'localhost',
//   database: 'yarn_inventory',
//   password: 'cookers5',
//   port: 5432, 
// });

// module.exports = pool;


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('yarn_inventory', 'robert', 'cookers5', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;