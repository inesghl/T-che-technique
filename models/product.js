const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const User = require('./User');

const Product = sequelize.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model : User,
      key : "user_id",
      targetKey: "user_id"
    }
  },
  
});

Product.belongsTo(User , {foreignKey:'user_id'})
module.exports = Product;
