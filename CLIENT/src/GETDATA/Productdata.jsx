import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { productfalse, productstart, productsuccess } from '../REDUX/Productslice'

const Productdata = () => {
    const dispatch = useDispatch()
    const {product} = useSelector((state)=>state.product)
    
useEffect(()=>{
    if(product.length > 0) return 
    
    const productdata =async ()=>{
        dispatch(productstart())
      try {
        const res = await axios.get('http://localhost:5000/api/products')
        const allproduct = res.data
        dispatch(productsuccess(allproduct))
        console.log(allproduct)        
      } catch (error) {
        dispatch(productfalse(error.message))
      }
    }
    productdata()
},[dispatch,product.length])
return null
}

export default Productdata