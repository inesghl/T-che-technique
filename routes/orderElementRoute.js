const express = require('express');
const router = express.Router();
const orderElementController = require('../controllers/orderElementController');
const authMiddleware = require('../controllers/authMiddleware');

// authentification
router.use(authMiddleware.authenticateToken);

router.post('/orderElement', authMiddleware.authorizeUser, orderElementController.addProduct);
router.put('/orderElement/:id', authMiddleware.authorizeUser, orderElementController.updateItemQuantity);
router.delete('/orderElement/:id', authMiddleware.authorizeUser, orderElementController.removeItemFromOrder);

module.exports = router;