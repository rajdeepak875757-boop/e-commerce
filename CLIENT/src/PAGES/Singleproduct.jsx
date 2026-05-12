import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToCartAsync } from '../REDUX/Cartslice'
import api from '../utils/api'

const Singleproduct = () => {
    const {id} = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
     
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/api/products/${id}`)
                setProduct(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching product:', error)
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const handleAddToCart = () => {
        if (!user.isAuthenticated) {
            alert('Please login to add to cart')
            return
        }
        dispatch(addToCartAsync(product._id, quantity))
        alert('Added to cart')
    }

    if (loading) return <div>Loading...</div>
    if (!product) return <div>Product not found</div>

  const productImage = product.image || 'https://via.placeholder.com/600x400?text=No+Image'
  const productTitle = product.title || 'Product'

  return (
     <>
      <div className='py-25 px-5 flex flex-col lg:flex-row gap-10'>
          <div className='w-full lg:w-1/2'>
             <div>
                 <img src={productImage} alt={productTitle} className='w-full h-auto object-contain' />
             </div>
             <div className='flex flex-wrap gap-4 mt-4'>
                <img src={productImage} alt={productTitle} className='h-20 w-20 object-cover rounded-lg' />
                <img src={productImage} alt={productTitle} className='h-20 w-20 object-cover rounded-lg' />
                <img src={productImage} alt={productTitle} className='h-20 w-20 object-cover rounded-lg' />
                <img src={productImage} alt={productTitle} className='h-20 w-20 object-cover rounded-lg' />
             </div>
          </div>
          <div className='w-full lg:w-1/2'>
             <h1 className='text-2xl font-semibold pb-5'>{product.title}</h1>
             <h1 className='text-[20px]'>${product.price}</h1>
             <p className='text-[18px] mb-4'>{product.description}</p>
             <div className='inline-flex items-center gap-3 text-2xl bg-black/10 p-2 rounded-lg'>
               <span className='cursor-pointer px-3' onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}>-</span>
               <span>{quantity}</span>
               <span className='cursor-pointer px-3' onClick={() => setQuantity((prev) => prev + 1)}>+</span>
             </div>
             <button onClick={handleAddToCart} className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg'>Add to Cart</button>
          </div>
      </div>
     </>
  )
}

export default Singleproduct