const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/database');
const port = 8050;

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  models
const User = require('./models/User');
const Order = require('./models/Order');
const OrderElement = require('./models/OrderElement');
const Product = require('./models/Product');

// //  routes 
 const userRoutes = require('./routes/userRoute');
  const orderRoutes = require('./routes/orderRoute');
const orderElementRoutes = require('./routes/orderElementRoute');
 const productRoutes = require('./routes/productRoute');

app.use('/', userRoutes);
 app.use('/', orderRoutes);
 app.use('/', orderElementRoutes);
app.use('/', productRoutes);

// Sync models with the database
db.sync({ alter: true })
  .then(() => {
    console.log('Models synced with the database successfully.');
  })
  .catch((error) => {
    console.error('Error syncing models with the database:', error);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
