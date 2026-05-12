import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addtocart , increaseqty,decreaseqty } from '../REDUX/Cartslice'





const Cartcomponet = ({cartdata}) => {

const dispatch = useDispatch()
  
  
  return (
    <>
    
     <div className='bg-red-500 mt-4  '>
      <div className='flex gap-10 border-r justify-between '>
        <div className='border  flex justify-center w-[20vw]'>
          <h1><img src={cartdata.image} alt="img" className='h-10' /></h1>
        </div>
        <div className='border-r text-center w-[20vw]'>
          <h1>{cartdata.title.slice(0,30)}...</h1>
        </div>
        <div className='border-r text-center w-[20vw] '>
           <h1 ><span className='p-2 bg-black/10 cursor-pointer' onClick={()=>dispatch(increaseqty(cartdata.id))}>+</span> {cartdata.quntity} <span className='p-2 bg-black/10 cursor-pointer' onClick={()=>dispatch(decreaseqty(cartdata.id))}>-</span></h1>
        </div>
        <div className='border-r text-center w-[20vw]'>
          <h1>{cartdata.price}</h1>
        </div>
        <div className='border-r text-center pr-2'>
           <h1  >{ cartdata.quntity * cartdata.price} </h1>
        </div>
      </div>
     </div>
    </>
  )
}

export default Cartcomponet