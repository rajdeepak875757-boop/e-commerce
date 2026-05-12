import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setuser } from '../REDUX/UserSlice'
import api from '../utils/api'
import signup from '../assets/signup.png'

const Login = () => {
    const [dataa, setdataa] = useState({
        email:'',
        password:''
    })
    const dispatch = useDispatch()

    const onchage = (e)=>{
       const {name,value} = e.target
       setdataa((prev)=>({
        ...prev,
        [name]:value
       }))
    }

    const handledata = async (e)=>{
        e.preventDefault()
        try {
            const response = await api.post('/api/auth/login', dataa)
            dispatch(setuser({ user: response.data.user, token: response.data.token }))
            localStorage.setItem('token', response.data.token)
            alert('Login successful')
        } catch (error) {
            alert('Login failed: ' + (error.response?.data?.message || 'Error'))
        }
    }
  return (
    <>
    <div className='py-18 flex gap-3'>
        <div className='w-[50vw] h-[80vh] bg-blue-300 flex justify-center items-center '>
           <img src={signup} alt="img" className='object-contain w-full h-full ' />
        </div>
        <div className='py-10 px-30 w-[50vw]'>
         <h1 className='text-5xl  capitalize font-medium tracking-wide pb-4 '>Login account</h1>
         <h1 className='capitalize text-2xl font-light pb-8'>enter your details below</h1>
         <input type="email" placeholder='Email' name='email' value={dataa.email} onChange={onchage} className='w-full border-b-2 py-2 px-3 pb-5 mt-5' />
         <input type="password" placeholder='Password' name='password' value={dataa.password} onChange={onchage} className='w-full border-b-2 py-2 px-3 mt-5' />
         <button className='w-full border-b-2 py-2 px-3 mt-8 bg-red-500 rounded-2xl text-2xl hover:bg-red-800 cursor-pointer text-white' onClick={handledata}>Login account</button>
         <h1 className='text-[14px] mt-8 h-full w-full text-center capitalize'>create an account ? <Link to={'/register'} className='border-b hover:text-black/50'>Register</Link> </h1>
        </div>
     </div>
    </>
  )
}

export default Login