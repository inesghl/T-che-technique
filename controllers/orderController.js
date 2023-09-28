const Order = require('../models/Order'); 

module.exports = {
  // Create a new order
  createOrder: async (req, res) => {
    try {
     
      const { userId } = req.user;

      
      const order = await Order.create({ user_id: userId }); 

     
      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Unable to create order' });
    }
  },


  // Update order status
  updateOrderStatus: async (req, res) => {
    try {
      const orderId = req.params.id;
      const newStatus = req.body.status; // New status 

      // Find order by ID and update status
      const order = await Order.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      order.status = newStatus;
      await order.save();

      //updated order
      res.json(order);
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Unable to update order status' });
    }
  },

  // Get order history for a user
  getOrderHistory: async (req, res) => {
    try {
      const { user_id } = req.user;

      // Retrieve all orders for the user
      const orders = await Order.findAll({ where: { user_id } });

    
      res.json(orders);
    } catch (error) {
      console.error('Error getting order history:', error);
      res.status(500).json({ error: 'Unable to get order history' });
    }
  },
};
