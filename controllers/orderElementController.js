const OrderElement = require('../models/OrderElement'); 
const Order = require('../models/Order');
module.exports = {

 //add product to an order 
addProduct: async (req, res) => {
  try {
  
    const { userId } = req.user;

   
    const { orderId, productDetails } = req.body;

    let order;
 // if it doesnt exist , create new order
    if (orderId) {
   
      order = await Order.findOne({ where: { id: orderId, user_id: userId } });
      if (!order) {
        return res.status(404).json({ error: 'Order not found or  does no belong to the user' });
      }
    } else {
      
      order = await Order.create({ user_id: userId });
    }

    // Add the product to the order 
    await OrderElement.create({
      order_id: order.id,
      product_id: productDetails.product_id,
      quantity: productDetails.quantity,
    });

 
    res.status(201).json(order);
  } catch (error) {
    console.log('Request Body:', req.body);

    console.error('Error adding product to order:', error);
    res.status(500).json({ error: 'Unable to add product to order' });
  }
},

// update quantity
updateItemQuantity: async (req, res) => {
  try {
    const orderElementId = req.params.id;
    const newQuantity = req.body.quantity; 

    // Find the order element and update quantity
    const orderElement = await OrderElement.findByPk(orderElementId);
    if (!orderElement) {
      return res.status(404).json({ error: 'Order element not found' });
    }

    orderElement.quantity = newQuantity;
    await orderElement.save();

    res.json(orderElement);
  } catch (error) {
    console.error('Error updating item quantity:', error);
    res.status(500).json({ error: 'Unable to update item quantity' });
  }
},

// Remove an item from an order
removeItemFromOrder: async (req, res) => {
  try {
    const orderElementId = req.params.id;

    // Find the order and delete it
    const orderElement = await OrderElement.findByPk(orderElementId);
    if (!orderElement) {
      return res.status(404).json({ error: 'Order element not found' });
    }

    await orderElement.destroy();

    
    res.json({ message: 'Order element removed successfully' });
  } catch (error) {
    console.error('Error removing item from order:', error);
    res.status(500).json({ error: 'Unable to remove item from order' });
  }
},
};
