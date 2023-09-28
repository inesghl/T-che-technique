const { DataTypes } = require('sequelize');
const db = require ('../config/database');

const Sequelize = require('sequelize') ;

// define user model 
const User = db.define('user', {
 
 
  user_id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

 
  
  role: {
    type: Sequelize.ENUM('user','admin'),
    allowNull: false,
    defaultValue:'user'
  },
  
}

);



module.exports = User;