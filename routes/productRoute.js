const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../controllers/authMiddleware');

//  authenticateToken
router.use(authMiddleware.authenticateToken);

router.get('/products',productController.getAllProducts);
router.get('/products/search', productController.searchProducts);


router.post('/products', authMiddleware.authorizeAdmin, productController.createProduct);
router.put('/products/:id', authMiddleware.authorizeAdmin, productController.updateProduct);
router.delete('/products/:id', authMiddleware.authorizeAdmin, productController.deleteProduct);

module.exports = router;

