import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../REDUX/Cartslice'
import axios from 'axios'

const Checkout = () => {
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

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user.isAuthenticated) {
      alert('Please login to place an order')
      return
    }
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:5000/api/orders', {
        items: cart.items,
        totalPrice: cart.total,
        shippingAddress
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch(clearCart())
      alert('Order placed successfully')
    } catch (error) {
      alert('Error placing order: ' + (error.response?.data?.message || 'Error'))
    }
  }
  
  return (
    <>
     <div className='py-20 px-5 flex gap-5  '>

       {/* left content */}
           <div className='px-20 py-10 w-[40vw] border  '>
            <h1 className='text-2xl font-semibold capitalize '>billing details</h1>
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
              <button type="submit" className='ml-[40%] mt-5 bg-red-600 py-2 px-3 rounded-2xl '>Place Order</button>
            </form>
           </div>

           {/* right content */}
           <div className='border w-[50vw] p-4'>
            <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
            {cart.items.map(item => (
              <div key={item.productId} className='flex justify-between mb-2'>
                <span>{item.title} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
            <div className='border-t pt-2 mt-4'>
              <strong>Total: ${cart.total}</strong>
            </div>
           </div>
     </div>
    </>
  )
}

export default Checkout