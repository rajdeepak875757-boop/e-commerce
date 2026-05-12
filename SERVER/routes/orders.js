const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

const router = express.Router();

// Create order
router.post('/', auth, async (req, res) => {
  const { items, totalPrice, shippingAddress, shippingMethod, shippingCost, paymentIntentId } = req.body;
  if (!items || !items.length) return res.status(400).json({ message: 'Cart items are required' });
  if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city || !shippingAddress.phone) {
    return res.status(400).json({ message: 'Complete shipping information is required' });
  }

  try {
    const order = new Order({
      userId: req.user.id,
      items,
      totalPrice,
      shippingAddress,
      shippingMethod,
      shippingCost,
      paymentIntentId
    });
    await order.save();
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.json(order);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order || order.userId.toString() !== req.user.id) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;