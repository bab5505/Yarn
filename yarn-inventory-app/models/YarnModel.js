const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const YarnModel = sequelize.define('Yarn', {
  yarn_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  brand: { type: DataTypes.STRING(100), allowNull: false },
  color: { type: DataTypes.STRING(50) },
  weight: { type: DataTypes.STRING(20) },
  quantity: { type: DataTypes.INTEGER },
  notes: { type: DataTypes.TEXT },
  date_added: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = YarnModel;
