import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToCartAsync } from '../REDUX/Cartslice'
import axios from 'axios'

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
                const response = await axios.get(`http://localhost:5000/api/products/${id}`)
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

  return (
     <>
      <div className='py-25 px-5 flex'>
          <div className=' w-[50%] '>
             <div>
                 <img src={product.image} alt="img" className='center h-[40vw]' />
             </div>
             <div className='flex justify-between'>
                <img src={product.image}  alt="img" className='h-15' />
                <img src={product.image} alt="img" className='h-15'  />
                <img src={product.image} alt="img" className='h-15'  />
                <img src={product.image} alt="img" className='h-15'  />
             </div>
          </div>
          <div className='w-[50vw] '>
             <h1 className='text-2xl font-semibold pb-5'>{product.title}</h1>
             <h1 className='text-[20px]'>${product.price}</h1>
             <h1 className='text-[18px]'>{product.description}</h1>
             <h1 className='text-2xl bg-black/10'><span className='p-2' onClick={()=>setQuantity((prev)=>prev > 0 ? prev - 1 : 0)}>-</span>{quantity} <span className='p-2 bg-black/10' onClick={()=>setQuantity((prev)=>  prev+1)}>+</span></h1>
             <button onClick={handleAddToCart} className='mt-4 bg-blue-500 text-white px-4 py-2'>Add to Cart</button>
          </div>
      </div>
     </>
  )
}

export default Singleproduct