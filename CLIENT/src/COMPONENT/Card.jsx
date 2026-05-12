import React, { useState } from 'react'
import banner from '../assets/banner.jpg'
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { Link, useBlocker, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addtocart } from '../REDUX/Cartslice';
const Card = ({item}) => {
  console.log(item)
  const [readmore, setreadmore] = useState(false)
 const [rating, setrating] = useState(0)
 const dispatch = useDispatch()
 const navigate = useNavigate()
  return (
    
    <>
     <div className='w-[20vw] h-[60vh]  shrink-0 pb-10' >
       <div className='bg-black/15 w-full relative'>
         <img src={item.image} alt="img" className='object-contain p-2 h-50 pl-20 ' onClick={()=>navigate(`/singleproduct/${item.id}`)} />
         <Link to={`/cart`} onClick={()=>dispatch(addtocart(item))} className='cartcard '><h1 className='absolute flex justify-center bottom-0  bg-black text-white w-full p-3'>add to cart</h1></Link>
       </div>
       <div className='p-2' >
          <h1 className='text-[20px] font-semibold capitalize'>{item.title.slice(0,40)}..<span className='text-[15px] cursor-pointer'>readmore</span></h1>
          <h1 className='text-[15px]' onClick={useBlocker}>{item.description.slice(0,50)}..<Link><span className='text-[12px] cursor-pointer'>readmore</span></Link></h1>
          <h1 >₹ <span>{item.price}</span> <span className='line-through text-red-600'>₹{item.price + 500}</span></h1>
          <h1 className='flex gap-3'>{[1,2,3,4,5].map((star)=><span className='text-2xl cursor-pointer flex gap-4' onClick={()=>setrating(star)} key={star}>{star <= rating? <FaStar className='text-yellow-300'/>:<FaRegStar/>}</span>)} {item.rating.count}</h1>
       </div>
     </div>
    </>
  )
}

export default Card