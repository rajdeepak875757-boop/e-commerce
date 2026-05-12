const express = require('express');
const auth = require('../middleware/auth');
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? require('stripe')(stripeKey) : null;

const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', auth, async (req, res) => {
  const { amount } = req.body; // amount in cents
  if (!stripe) {
    return res.status(500).json({ message: 'Stripe is not configured' });
  }
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe payment error:', error)
    res.status(500).json({ message: 'Payment intent creation failed' });
  }
});

module.exports = router;