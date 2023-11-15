const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('yarn_inventory', 'robert', 'cookers5', {
  host: 'localhost',
  dialect: 'postgres',
});

const Project = sequelize.define('Project', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hookSize: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  needleSize: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Add other fields as needed
});

module.exports = Project;