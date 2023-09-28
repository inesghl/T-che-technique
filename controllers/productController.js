const Product = require('../models/Product'); 
const { Op } = require('sequelize');
module.exports = {

  // Add a new product 
  createProduct: async (req, res) => {
    try {
      
      const { name, description, price } = req.body;

      const { userId } = req.user;

      // Create a new product 
      const product = await Product.create({
        name,
        description,
        price,
        user_id: userId, 
      });

     
      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Unable to create product' });
    }
  },


  // Update a product 
  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const { name, description, price } = req.body; 

      // Find the product by ID and update 
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      product.name = name;
      product.description = description;
      product.price = price;
      
      await product.save();

      res.json(product);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Unable to update product' });
    }
  },

  // Delete a product
  deleteProduct: async (req, res) => {
    try {
     
      const productId = req.params.id;

      // Find the product and delete it
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      await product.destroy();

    
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Unable to delete product' });
    }
  },

  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Unable to fetch products' });
    }
  },

  // Search 
  searchProducts: async (req, res) => {
    try {
      const searchName = req.query.name;
      const products = await Product.findAll({
        where: {
          name: { [Op.like]: `%${searchName}%` },
        },
      });

      res.json(products);
    } catch (error) {
      console.error('Error searching for products:', error);
      res.status(500).json({ error: 'Unable to search for products' });
    }
  },
};
