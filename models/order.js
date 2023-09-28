const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); 

const Order = sequelize.define('order', {
  status: {
    type: Sequelize.ENUM('pending', 'shipped', 'delivered', 'canceled'),
    allowNull: false,
    defaultValue: 'pending', 
  },
});

Order.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Order, { foreignKey: 'user_id' });

module.exports = Order;
