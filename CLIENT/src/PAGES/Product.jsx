import React from 'react'
import Card from '../COMPONENT/Card'
import { useSelector } from 'react-redux'

const Product = () => {
    const {product} = useSelector((state)=>state.product)
  return (
    <>
     <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  py-18'>
      {product.map((data,index)=><Card key={index} item={data} />)}
     </div>
    </>
  )
}

export default Product