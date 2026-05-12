import React from 'react'
import { ImGrin } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const Ctagorycard = ({item}) => {

 const navigate = useNavigate()
  return (
    <>
    <div className='text-center px-10  py-5 bg-black/15 ' onClick={()=>navigate(`/catagory/${encodeURIComponent(item)}`)} >
     <h1 className='text-8xl'><ImGrin/></h1>
     <h1 >{item }</h1>
    </div>
    </>
  )
}

export default Ctagorycard