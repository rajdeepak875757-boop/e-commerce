import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import banner from '../assets/banner.jpg'
import Card from '../COMPONENT/Card';
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useSelector } from 'react-redux';
import Productdata from '../GETDATA/Productdata'
import Ctagorycard from '../COMPONENT/Ctagorycard';


const Home = () => {
 
  const scrollref = useRef()
  
  
 const scrollleft = ()=>{
  scrollref.current.scrollBy({
    left:-200,
    behavior:'smooth'
  });

 }
 const scrollright = ()=>{
  scrollref.current.scrollBy({
  left:200,
  behavior:'smooth'
  })
 }
 const {product} = useSelector((state)=>state.product)
 console.log(product)
  const uniqueprosuct = product.map(item=>item.category).filter((name,index,arr)=>arr.indexOf(name) === index)
  return (

    <>
    <Productdata/>
    {/* section first */}
     <div className='h-auto md:h-[80vh] mt-12 flex flex-col md:flex-row'>
       <div className='w-full md:w-1/4 h-auto md:h-[79vh] bg-white pt-7 px-5 md:px-10 leading-7 md:leading-13 lg:leading-13 lg:text-[22px] md:text-[22px] font-semibold'>
          <ul>
            <Link to={'/women'} ><li className='flex items-center justify-between capitalize' >woman's fashion <span className='text-2xl flex'><IoIosArrowForward/></span></li></Link>
            <Link to={'/men'}><li className='flex items-center justify-between ' >men's fashion<span className='text-2xl flex'><IoIosArrowForward/></span> </li></Link>
            <Link to={'/electronic'}><li>Electronic</li></Link>
            <Link to={'/lifestyle'}><li>Home & lifestyle</li></Link>
            <Link to={'/medicine'}><li>Medicine</li></Link>
            <Link to={'/sport'}><li>Sport & outdoor</li></Link>
            <Link to={'/baby'}><li>Baby & toy</li></Link>
            <Link to={'/beauty'}><li>Groceries & pet</li></Link>
            <Link to={'/health'}><li>Health  & beauty</li></Link>
          </ul>
       </div>
       <div className='flex justify-center items-center'>
         <img src={banner} alt="img" className='h-[40vh] md:h-[79vh] pt-2 w-full md:w-3/4' />
       </div>
     </div>

     {/* section second */}
     <div className='py-10 px-5'>
        <div>
           <h1 className='capitalize flex px-5 gap-5 font-semibold text-[20px]'><span className='px-5 py-2 bg-red-600'></span>today's</h1>
           <h1 className='text-3xl capitalize font-semibold flex justify-between px-5 py-2'>flash sales <span className='flex items-center gap-4'><IoMdArrowRoundBack onClick={scrollleft} className='hover:bg-black/20 hover:rounded-full' /> <IoMdArrowRoundForward onClick={scrollright} className='hover:bg-black/20 hover:rounded-full'  /></span></h1>
        </div>
        <div className='overflow-x-auto   gap-4 flash h-[80vh] border-b ' ref={scrollref}>
          {product? <div className='flex gap-4'>{product.map((item)=> <div key={item.id}><Card item={item} /></div>)}</div>:<div className='text-2xl flex justify-center items-center capitalize'> no product</div>}
           <div className='flex justify-center py-5'>
            <Link to={'/product'} className='px-10 py-3 rounded-2xl text-[20px] text-center  bg-red-600 '>view all product</Link>
           </div>
        </div>
     </div>

     {/* //sction third */}
     <div className='py-5 px-5 md:px-10'>
        <div>
           <h1 className='capitalize flex px-5 gap-5 font-semibold text-[20px]'><span className='px-5 py-2 bg-red-600'></span>today's</h1>
           <h1 className='text-2xl md:text-3xl capitalize font-semibold flex justify-between px-5 py-2'>flash sales <span className='flex items-center gap-4'><IoMdArrowRoundBack onClick={scrollleft} className='hover:bg-black/20 hover:rounded-full' /> <IoMdArrowRoundForward onClick={scrollright} className='hover:bg-black/20 hover:rounded-full'  /></span></h1>
        </div>
           <div className='text-center px-5 flex flex-wrap justify-center md:justify-between gap-4'>
          {uniqueprosuct.map((item,index)=><Ctagorycard key={index}  item={item}/>)}
           </div>
     </div>
    </>
  )
}

export default Home