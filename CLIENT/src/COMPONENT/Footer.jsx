import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='border-t bg-slate-50 py-10'>
      <div className='max-w-6xl mx-auto px-5 grid gap-8 md:grid-cols-3'>
        <div>
          <h2 className='font-bold text-xl mb-3'>E-Commerce</h2>
          <p className='text-sm text-gray-600'>Secure shopping built for fast deployment, responsive browsing, and modern checkout.</p>
        </div>
        <div>
          <h3 className='font-semibold mb-3'>Links</h3>
          <ul className='space-y-2 text-sm'>
            <li><Link to='/' className='hover:text-red-600'>Home</Link></li>
            <li><Link to='/about' className='hover:text-red-600'>About</Link></li>
            <li><Link to='/cart' className='hover:text-red-600'>Cart</Link></li>
          </ul>
        </div>
        <div>
          <h3 className='font-semibold mb-3'>Contact</h3>
          <p className='text-sm text-gray-600'>support@e-commerce.local</p>
          <p className='text-sm text-gray-600'>+91 12345 67890</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer