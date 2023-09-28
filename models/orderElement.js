const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const Product = require('./Product');
const Order = require('./Order'); // Import the Order model

const OrderElement = sequelize.define('order_element', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: "id",
      targetKey: "id"
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: "id",
      targetKey: "id"
    }
  }
});

OrderElement.belongsTo(Product, { foreignKey: 'product_id' });
OrderElement.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = OrderElement;
