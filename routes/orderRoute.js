const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../controllers/authMiddleware');

// Authentication middleware
router.use(authMiddleware.authenticateToken);

// Create a new order
router.post('/orders', authMiddleware.authorizeUser, orderController.createOrder);

// Update order status
router.put('/orders/:id', authMiddleware.authorizeAdmin, orderController.updateOrderStatus);

// Get order history 
router.get('/orders/history', orderController.getOrderHistory);

module.exports = router;
