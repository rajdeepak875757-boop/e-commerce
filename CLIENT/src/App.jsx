import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setuser } from './REDUX/UserSlice'
import { fetchCart } from './REDUX/Cartslice'
import Productdata from './GETDATA/Productdata'
import Home from './PAGES/Home'
import Navbar from './COMPONENT/Navbar'
import Product from './PAGES/Product'
import Cartpage from './PAGES/Cartpage'
import Singleproduct from './PAGES/Singleproduct'
import Checkout from './PAGES/Checkout'
import Register from './PAGES/Register'
import Login from './PAGES/Login'
import About from './PAGES/About'
import Footer from './COMPONENT/Footer'
import Ctagorypage from './PAGES/Ctagorypage'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        dispatch(setuser({ user: payload, token }))
        dispatch(fetchCart())
      } catch (error) {
        localStorage.removeItem('token')
      }
    }
  }, [dispatch])

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/catagory/:item' element={<Ctagorypage/>}/>
        <Route path='/cart' element={<Cartpage/>}/>
        <Route path='/singleproduct/:id' element={<Singleproduct/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App