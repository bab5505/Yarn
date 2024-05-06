const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const InventoryItem = sequelize.define('InventoryItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(255) },
  quantity: { type: DataTypes.INTEGER },
});

module.exports = InventoryItem;
