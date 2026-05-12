import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Card from '../COMPONENT/Card'

const Ctagorypage = () => {
 
    const {product} = useSelector((state)=>state.product)
    const {item} = useParams()
    const decodedItem = decodeURIComponent(item)

    const filterproduct = product?.filter((p)=>(p.category === decodedItem)  )
    console.log("URL item:", decodedItem)
console.log("PRODUCT SAMPLE:", product[0])
console.log("ALL CATEGORIES:", product.map(p => p.category))
  return (
    <>
    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-between py-25'>
       {filterproduct.map((data)=><Card key={data.id} item={data}/>)}
    </div>
    </>
  )
}

export default Ctagorypage