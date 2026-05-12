import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../REDUX/Cartslice'
import api from '../utils/api'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_publishable_key_here')

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
    email: ''
  })
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [shippingCost, setShippingCost] = useState(5.99)
  const [processing, setProcessing] = useState(false)

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value })
  }

  const handleShippingChange = (method) => {
    setShippingMethod(method)
    setShippingCost(method === 'standard' ? 5.99 : 12.99)
  }

  const totalWithShipping = Number(cart.total) + shippingCost
  const orderItems = cart.items.map((item) => {
    const product = item.productId && item.productId._id ? item.productId : item
    return {
      productId: product._id || product.id || product.productId,
      quantity: item.quantity,
      price: item.price
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user.isAuthenticated) {
      alert('Please login to place an order')
      return
    }
    if (!stripe || !elements) return
    if (orderItems.length === 0) {
      alert('Your cart is empty')
      return
    }

    setProcessing(true)
    try {
      const { data } = await api.post('/api/payments/create-payment-intent', {
        amount: Math.round(totalWithShipping * 100)
      })

      const cardElement = elements.getElement(CardElement)
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: shippingAddress.fullName,
            email: shippingAddress.email
          }
        }
      })

      if (error) {
        alert('Payment failed: ' + error.message)
        setProcessing(false)
        return
      }

      await api.post('/api/orders', {
        items: orderItems,
        totalPrice: totalWithShipping,
        shippingAddress,
        shippingMethod,
        shippingCost,
        paymentIntentId: paymentIntent?.id || data.clientSecret.split('_secret_')[0]
      })

      dispatch(clearCart())
      alert('Order placed successfully')
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || error.message || 'Error'))
    }
    setProcessing(false)
  }

  return (
    <div className='py-10 md:py-20 px-5 flex flex-col md:flex-row gap-5'>
      <div className='px-5 md:px-20 py-10 w-full md:w-2/5 border rounded-3xl shadow-sm'>
        <h1 className='text-xl md:text-2xl font-semibold capitalize'>Billing details</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium'>Full name</label>
            <input className='capitalize border p-2 w-full rounded-md' type='text' name='fullName' value={shippingAddress.fullName} onChange={handleChange} placeholder='Enter your name' required />
          </div>
          <div>
            <label className='block text-sm font-medium'>Address</label>
            <input className='capitalize border p-2 w-full rounded-md' type='text' name='address' value={shippingAddress.address} onChange={handleChange} placeholder='Enter your address' required />
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <label className='block text-sm font-medium'>Town / City</label>
              <input className='capitalize border p-2 w-full rounded-md' type='text' name='city' value={shippingAddress.city} onChange={handleChange} placeholder='Town / City' required />
            </div>
            <div>
              <label className='block text-sm font-medium'>Phone number</label>
              <input className='capitalize border p-2 w-full rounded-md' type='tel' name='phone' value={shippingAddress.phone} onChange={handleChange} placeholder='Phone number' required />
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium'>Email</label>
            <input className='capitalize border p-2 w-full rounded-md' type='email' name='email' value={shippingAddress.email} onChange={handleChange} placeholder='Enter email' required />
          </div>
          <div>
            <label className='block text-sm font-medium'>Shipping method</label>
            <div className='space-y-2 mt-2'>
              <label className='flex items-center gap-2'>
                <input type='radio' name='shipping' value='standard' checked={shippingMethod === 'standard'} onChange={() => handleShippingChange('standard')} />
                Standard Shipping ($5.99)
              </label>
              <label className='flex items-center gap-2'>
                <input type='radio' name='shipping' value='express' checked={shippingMethod === 'express'} onChange={() => handleShippingChange('express')} />
                Express Shipping ($12.99)
              </label>
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium'>Payment details</label>
            <div className='border p-3 rounded-md'>
              <CardElement />
            </div>
          </div>
          <button type='submit' disabled={!stripe || processing} className='w-full bg-red-600 text-white py-3 rounded-2xl font-semibold hover:bg-red-700'>
            {processing ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>

      <div className='border rounded-3xl shadow-sm w-full md:w-3/5 p-6'>
        <h2 className='text-lg md:text-xl font-semibold mb-4'>Order Summary</h2>
        {cart.items.length === 0 ? (
          <p className='text-gray-600'>No items in cart.</p>
        ) : (
          cart.items.map((item) => {
            const product = item.productId && item.productId.title ? item.productId : item
            const productTitle = product.title || 'Item'
            return (
              <div key={item.productId?._id || item.productId} className='flex justify-between mb-3'>
                <span>{productTitle} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            )
          })
        )}
        <div className='border-t pt-4 mt-4'>
          <div className='flex justify-between mb-2'>
            <span>Subtotal:</span>
            <span>${cart.total.toFixed(2)}</span>
          </div>
          <div className='flex justify-between mb-2'>
            <span>Shipping:</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className='flex justify-between font-semibold text-lg'>
            <span>Total:</span>
            <span>${totalWithShipping.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}

export default Checkout