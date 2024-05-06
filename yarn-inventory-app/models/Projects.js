const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Project = sequelize.define('Project', {
  project_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  project_name: { type: DataTypes.STRING(100), allowNull: false },
  project_type: { type: DataTypes.STRING(20) },
  start_date: { type: DataTypes.DATE },
  end_date: { type: DataTypes.DATE },
  project_notes: { type: DataTypes.TEXT },
});

module.exports = Project;
