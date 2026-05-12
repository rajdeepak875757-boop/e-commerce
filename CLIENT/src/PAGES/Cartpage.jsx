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
    <>
      <div className='py-5 px-5 leading-9'>
        <div className='flex justify-between bg-red-700 mt-20 px-5 py-5 font-semibold capitalize'>
          <h1>product</h1>
          <h1>title</h1>
          <h1>quantity</h1>
          <h1>price</h1>
          <h1>total</h1>
        </div>
        {cart.items.length > 0 ? (
          <div>
            {cart.items.map((item) => (
              <div key={item.productId} className='flex justify-between items-center border-b py-4'>
                <div className='flex items-center'>
                  <img src={item.image} alt={item.title} className='w-16 h-16 mr-4' />
                  <div>
                    <h2 className='text-lg font-semibold'>{item.title}</h2>
                    <p>${item.price}</p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <button onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)} className='px-2 py-1 bg-gray-200'>-</button>
                  <span className='px-4'>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)} className='px-2 py-1 bg-gray-200'>+</button>
                  <button onClick={() => handleRemoveItem(item.productId)} className='ml-4 px-4 py-2 bg-red-500 text-white'>Remove</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='h-screen w-screen justify-center items-center text-2xl font-semibold capitalize'>no cart available</div>
        )}
      </div>
      {cart.items.length > 0 && (
        <div className='w-[20vw] absolute z-90 top-10 rounded-2xl right-0 backdrop-blur-lg py-5 px-5 flex-col text-center leading-10'>
          <h1 className='text-2xl font-semibold flex justify-items-start mb-3'>cart total</h1><hr />
          <h1>subtotal : ${cart.total}</h1><hr />
          <h1>shipping : free</h1>
          <Link to={'/checkout'}>
            <button className='py-2 px-3 bg-red-600 hover:bg-red-950 cursor-pointer text-white mt-2 rounded-2xl capitalize'>process to checkout</button>
          </Link>
        </div>
      )}
    </>
  )
}

export default Cartpage