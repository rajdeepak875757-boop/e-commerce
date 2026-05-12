import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdManageAccounts } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { FaStarHalfAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import { clearuser } from '../REDUX/UserSlice';

const Navbar = () => {
  const cart = useSelector((state)=>state.cart)
  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch()
    const [profile, setprofile] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
      dispatch(clearuser())
      setprofile(false)
    }

  return (
    <>
      <div className='h-[8vh] z-30 sticky top-0'>
        {/* top part */}
        <div className='hidden lg:block md:block px-20 text-center bg-black text-white py-2 text-[16px]'>
         <p className='capitalize '>summer sale for all swim suits and free express delivery - off 50% <button className='font-semibold cursor-pointer capitalize ml-3 border-b'>shopnow</button></p>
        </div>
        {/* 2 part  */}
        <div className='flex justify-between py-3 px-4 bg-white/45 backdrop-blur-lg border-b border-black/35 shadow-md shadow-black'>
           <div>
             <img src={logo} alt="img" className='h-[5vh]' />
           </div>
           <div className='hidden md:flex w-[30vw]'>
              <ul className='flex justify-between text-[19px] capitalize font-semibold w-full'>
               <Link to={'/'}><li>Home</li></Link> 
               <Link><li>contact</li></Link> 
                <Link><li>about</li></Link>
                {!user.isAuthenticated && <Link to={'/register'}><li>signup</li></Link>}
              </ul>
           </div>
           <div className='flex gap-5 items-center'>
            <input type="search" placeholder='what are you looking for ?' className='hidden md:block capitalize bg-black/20 px-3 py-2 rounded-sm' />
            <Link to={'/cart'}><FaShoppingCart className='text-3xl relative'/> <p className='bg-red-600 px-2 py-1 text-[12px] rounded-full text-white absolute top-2 right-13'>{cart.items.length}</p></Link>
            {user.isAuthenticated ? <div className='h-8 w-8 bg-red-500 rounded-full'></div>:<CgProfile onClick={()=>setprofile(!profile)} className='text-3xl hidden md:block'/>}
            <GiHamburgerMenu onClick={()=>setMenuOpen(!menuOpen)} className='text-3xl md:hidden' />
            {profile && !user.isAuthenticated ? <div className='absolute backdrop-blur-lg px-5 py-5 bg-black/60 right-5 top-10 rounded-md leading-12 font-semibold text-[18px] text-white' onClick={()=>setprofile(false)}> 
                <Link to='/login'><h1 className='cursor-pointer'>Login</h1></Link>
                <Link to='/register'><h1 className='cursor-pointer'>Register</h1></Link>
            </div> : null}
            {user.isAuthenticated && <CgProfile onClick={()=>setprofile(!profile)} className='text-3xl md:hidden' />}
            {profile && user.isAuthenticated ? <div className='absolute backdrop-blur-lg px-5 py-5 bg-black/60 right-5 top-10 rounded-md leading-12 font-semibold text-[18px] text-white' onClick={()=>setprofile(false)}> 
                <Link><h1 className='flex gap-5 items-center cursor-pointer'> <MdManageAccounts className='text-3xl'/> manage my account</h1></Link>
                <Link><h1 className='flex gap-5 items-center cursor-pointer'> <FiShoppingBag className='text-3xl'/> my order</h1></Link>
                <Link><h1 className='flex gap-5 items-center  cursor-pointer'> <MdCancel className='text-3xl'/> my cancellation</h1></Link>
               <Link> <h1 className='flex gap-5 items-center cursor-pointer'> <FaStarHalfAlt className='text-3xl'/> my reviews</h1></Link>
               <h1 onClick={handleLogout} className='flex gap-5 items-center cursor-pointer'> <BiLogOut className='text-3xl'/> logout</h1>
            </div> : null}
           </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className='md:hidden bg-white/95 backdrop-blur-lg border-b border-black/35 shadow-md'>
            <div className='flex justify-end p-4'>
              <AiOutlineClose onClick={()=>setMenuOpen(false)} className='text-3xl' />
            </div>
            <ul className='flex flex-col items-center text-[19px] capitalize font-semibold gap-4 pb-4'>
              <Link to={'/'} onClick={()=>setMenuOpen(false)}><li>Home</li></Link> 
              <Link onClick={()=>setMenuOpen(false)}><li>contact</li></Link> 
              <Link onClick={()=>setMenuOpen(false)}><li>about</li></Link>
              {!user.isAuthenticated && <Link to={'/register'} onClick={()=>setMenuOpen(false)}><li>signup</li></Link>}
              <input type="search" placeholder='what are you looking for ?' className='capitalize bg-black/20 px-3 py-2 rounded-sm w-3/4' />
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar