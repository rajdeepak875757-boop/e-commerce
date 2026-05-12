import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../REDUX/Cartslice'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_your_stripe_publishable_key_here') // Replace with actual key

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.user)
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

  const totalWithShipping = cart.total + shippingCost

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user.isAuthenticated) {
      alert('Please login to place an order')
      return
    }
    if (!stripe || !elements) return

    setProcessing(true)

    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.post('http://localhost:5000/api/payments/create-payment-intent', {
        amount: Math.round(totalWithShipping * 100)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      const { error } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: shippingAddress.fullName,
            email: shippingAddress.email
          }
        }
      })

      if (error) {
        alert('Payment failed: ' + error.message)
      } else {
        await axios.post('http://localhost:5000/api/orders', {
          items: cart.items,
          totalPrice: totalWithShipping,
          shippingAddress,
          shippingMethod,
          shippingCost,
          paymentIntentId: data.clientSecret.split('_secret_')[0]
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        dispatch(clearCart())
        alert('Order placed successfully')
      }
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'Error'))
    }
    setProcessing(false)
  }
  
  return (
    <div className='py-10 md:py-20 px-5 flex flex-col md:flex-row gap-5'>
      <div className='px-5 md:px-20 py-10 w-full md:w-2/5 border'>
        <h1 className='text-xl md:text-2xl font-semibold capitalize'>billing details</h1>
        <form onSubmit={handleSubmit}>
          <h1 className='capitalize pt-2'>full name</h1>
          <input className='capitalize border p-2 w-full' type="text" name="fullName" value={shippingAddress.fullName} onChange={handleChange} placeholder='enter your name' required />
          <h1 className='capitalize pt-2'>address</h1>
          <input className='capitalize border p-2 w-full' type="text" name="address" value={shippingAddress.address} onChange={handleChange} placeholder='enter your address' required />
          <h1 className='capitalize pt-2'>town / city</h1>
          <input className='capitalize border p-2 w-full' type="text" name="city" value={shippingAddress.city} onChange={handleChange} placeholder='enter town / city' required />
          <h1 className='capitalize pt-2'>phone number</h1>
          <input className='capitalize border p-2 w-full' type="tel" name="phone" value={shippingAddress.phone} onChange={handleChange} placeholder='enter phone number' required />
          <h1 className='capitalize pt-2'>email</h1>
          <input className='capitalize border p-2 w-full' type="email" name="email" value={shippingAddress.email} onChange={handleChange} placeholder='enter email' required />

          <h1 className='capitalize pt-2'>shipping method</h1>
          <div className='flex flex-col gap-2'>
            <label className='flex items-center gap-2'>
              <input type="radio" name="shipping" value="standard" checked={shippingMethod === 'standard'} onChange={() => handleShippingChange('standard')} />
              Standard Shipping ($5.99)
            </label>
            <label className='flex items-center gap-2'>
              <input type="radio" name="shipping" value="express" checked={shippingMethod === 'express'} onChange={() => handleShippingChange('express')} />
              Express Shipping ($12.99)
            </label>
          </div>

          <h1 className='capitalize pt-2'>payment details</h1>
          <CardElement className='border p-2 w-full' />

          <button type="submit" disabled={!stripe || processing} className='w-full md:ml-[40%] md:w-auto mt-5 bg-red-600 py-2 px-3 rounded-2xl'>
            {processing ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>

      <div className='border w-full md:w-3/5 p-4'>
        <h2 className='text-lg md:text-xl font-semibold mb-4'>Order Summary</h2>
        {cart.items.map(item => (
          <div key={item.productId} className='flex justify-between mb-2'>
            <span>{item.title} x {item.quantity}</span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}
        <div className='border-t pt-2 mt-4'>
          <div className='flex justify-between'>
            <span>Subtotal:</span>
            <span>${cart.total}</span>
          </div>
          <div className='flex justify-between'>
            <span>Shipping:</span>
            <span>${shippingCost}</span>
          </div>
          <strong className='block text-right'>Total: ${totalWithShipping}</strong>
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