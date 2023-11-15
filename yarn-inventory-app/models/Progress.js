const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('yarn_inventory', 'robert', 'cookers5', {
  host: 'localhost',
  dialect: 'postgres',
});

const Progress = sequelize.define('Progress', {
  project: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  needleSize: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Add other fields as needed
});

module.exports = Progress;