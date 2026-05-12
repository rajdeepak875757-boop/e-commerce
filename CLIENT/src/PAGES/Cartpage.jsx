import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCart, updateCartItemAsync, removeFromCartAsync } from '../REDUX/Cartslice'

const Cartpage = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartItemAsync(productId, quantity))
    }
  }

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCartAsync(productId))
  }

  return (
    <div className='py-20 px-5 md:px-20'>
      <h1 className='text-3xl font-semibold mb-8'>Your Cart</h1>
      {cart.items.length > 0 ? (
        <div className='space-y-4'>
          {cart.items.map((item) => {
            const product = item.productId && typeof item.productId === 'object' ? item.productId : item
            const productId = product._id || product.id || item.productId
            const productImage = product.image || 'https://via.placeholder.com/300x300?text=No+Image'
            const productTitle = product.title || 'Unknown product'
            const productPrice = product.price || 0
            return (
              <div key={productId} className='flex flex-col md:flex-row justify-between items-center border-b py-4 gap-4'>
                <div className='flex items-center gap-4'>
                  <img src={productImage} alt={productTitle} className='w-20 h-20 object-cover rounded-lg' />
                  <div>
                    <h2 className='text-lg font-semibold'>{productTitle}</h2>
                    <p className='text-sm text-gray-600'>${productPrice}</p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <button onClick={() => handleUpdateQuantity(productId, item.quantity - 1)} className='px-3 py-2 bg-gray-200 rounded'>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(productId, item.quantity + 1)} className='px-3 py-2 bg-gray-200 rounded'>+</button>
                </div>
                <div className='text-right'>
                  <p className='font-semibold'>${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => handleRemoveItem(productId)} className='mt-2 px-4 py-2 bg-red-500 text-white rounded'>Remove</button>
                </div>
              </div>
            )
          })}
          <div className='bg-white p-6 rounded-3xl shadow-lg max-w-md ml-auto'>
            <h2 className='text-xl font-semibold mb-3'>Order summary</h2>
            <div className='flex justify-between mb-2'>
              <span>Subtotal</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
            <div className='flex justify-between mb-4'>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <Link to='/checkout'>
              <button className='w-full py-3 bg-red-600 text-white rounded-2xl'>Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className='text-center py-20 text-2xl font-semibold text-gray-700'>Your cart is empty.</div>
      )}
    </div>
  )
}

export default Cartpage