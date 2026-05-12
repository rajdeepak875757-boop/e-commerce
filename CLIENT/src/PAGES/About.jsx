import React from 'react'

const About = () => {
  return (
    <div className='py-20 px-5 md:px-20'>
      <div className='max-w-5xl mx-auto bg-white shadow-lg rounded-3xl p-8'>
        <h1 className='text-4xl font-bold mb-4'>About Our Store</h1>
        <p className='text-lg leading-8 mb-6'>
          Welcome to our e-commerce platform. We provide a secure shopping experience with fast delivery, modern payment options, and real product insights.
        </p>
        <div className='grid gap-6 md:grid-cols-2'>
          <div>
            <h2 className='text-2xl font-semibold mb-3'>What we do</h2>
            <p className='leading-7'>We offer a clean, responsive online store with product browsing, cart management, secure checkout, and optimized order processing for production-ready deployment.</p>
          </div>
          <div>
            <h2 className='text-2xl font-semibold mb-3'>Why choose us</h2>
            <ul className='list-disc ml-5 leading-7'>
              <li>Secure Stripe payment flow</li>
              <li>Reliable shipping options</li>
              <li>Mobile-responsive UI</li>
              <li>API-driven product catalog</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
