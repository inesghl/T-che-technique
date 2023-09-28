
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create new Sequelize instance
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql" ,
        define: {
          // not add columns updatedAt , createdAt  auto
          timestamps: false,
          // make table names plural 
          freezeTableName: false
        }
       
    }

   
);

// const jwtSecret = process.env.JWT_SECRET; 
//test 
db
  .authenticate()
  .then(() => {
    console.log('Connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = db;
