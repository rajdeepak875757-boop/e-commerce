import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa6'
import { FaRegStar } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartAsync } from '../REDUX/Cartslice'

const Card = ({ item }) => {
  const [rating, setRating] = useState(0)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const product = item.productId && typeof item.productId === 'object' ? item.productId : item
  const productId = product._id || product.id

  const handleAddToCart = (event) => {
    event.preventDefault()
    if (!user.isAuthenticated) {
      alert('Please login to add items to cart')
      return
    }
    dispatch(addToCartAsync(productId, 1))
    navigate('/cart')
  }

  const productTitle = product.title || 'Product'
  const productDescription = product.description || ''
  const productImage = product.image || 'https://via.placeholder.com/300x300?text=No+Image'
  const productPrice = product.price || 0

  return (
    <div className='w-[20vw] h-[60vh] shrink-0 pb-10'>
      <div className='bg-black/15 w-full relative'>
        <img src={productImage} alt='product' className='object-contain p-2 h-50 pl-20 cursor-pointer' onClick={() => navigate(`/singleproduct/${productId}`)} />
        <button onClick={handleAddToCart} className='cartcard absolute bottom-0 left-0 w-full bg-black text-white p-3'>add to cart</button>
      </div>
      <div className='p-2'>
        <h1 className='text-[20px] font-semibold capitalize'>{productTitle.slice(0,40)}..</h1>
        <p className='text-[15px] leading-6'>{productDescription.slice(0,50)}..</p>
        <div className='mt-2'>
          <span className='text-lg font-semibold'>₹{productPrice}</span>
          <span className='line-through text-red-600 ml-2'>₹{productPrice + 500}</span>
        </div>
        <div className='flex gap-3 mt-2'>
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type='button' className='text-2xl' onClick={() => setRating(star)}>
              {star <= rating ? <FaStar className='text-yellow-300' /> : <FaRegStar />}
            </button>
          ))}
          <span className='text-sm self-center'>{item.rating?.count || 0}</span>
        </div>
      </div>
    </div>
  )
}

export default Card