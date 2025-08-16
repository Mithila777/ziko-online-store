import React from 'react'
import { FaStar } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'

function FeaturedCard() {
  return (
    <div>
        <div className='bg-white p-4'>
             <img
            src='image/hero/watch.png'
            alt="Hero"
            className="w-full h-auto object-cover"
          />
          <div className='space-y-2'>
            <div className='flex justify-between'><p>iphone14 </p> <p>$200</p></div>
            <div className='flex justify-between'><p className='text-amber-300 flex'><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/> </p>
             <button className='text-gray-400'><FaCartShopping/></button></div>

          </div>
        </div>
    </div>
  )
}

export default FeaturedCard