import React, { useEffect } from 'react'
import api from '../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { productfalse, productstart, productsuccess } from '../REDUX/Productslice'

const Productdata = () => {
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state.product)

  useEffect(() => {
    if (product.length > 0) return

    const productdata = async () => {
      dispatch(productstart())
      try {
        const res = await api.get('/api/products')
        const allproduct = res.data
        dispatch(productsuccess(allproduct))
      } catch (error) {
        dispatch(productfalse(error.message))
      }
    }
    productdata()
  }, [dispatch, product.length])

  return null
}

export default Productdata