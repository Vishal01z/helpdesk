// src/models/index.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Ticket = require('./ticket')(sequelize, Sequelize.DataTypes);

// Associations
db.User.hasMany(db.Ticket, { foreignKey: 'createdBy', as: 'tickets' });
db.Ticket.belongsTo(db.User, { foreignKey: 'createdBy', as: 'user' });

module.exports = db;
