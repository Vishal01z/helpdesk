const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ticket = sequelize.define('Ticket', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'open',
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'tickets',
  timestamps: true,
});

module.exports = Ticket;
