import React from 'react'
import { FaAndroid, FaPhone, FaStopwatch20 } from 'react-icons/fa'
import { MdHearing } from 'react-icons/md'

function FeaturedCatagories() {
  return (
    <div className='px-[8%] py-8'>
        <div>
            <h3 className='font-bold text-4xl text-center'>Featured Categories</h3>
            <div className="grid grid-cols-4 grid-rows-2 py-8 gap-y-8 justify-items-center ">
             <div>
                <p className='text-4xl'><i className="fa-solid fa-mobile-screen text-yellow-300"></i> </p> 
                 <p>Phone</p>

             </div>
               <div>
                <img src='image/icon/wristWatch.png' alt="icon" className="w-10 h-auto object-cover"/>
                <p>watch</p>
             </div>
               <div>
                <img src='image/icon/airpods.png' alt="icon" className="w-10 h-auto object-cover"/>
                <p>Airpods</p>
               
             </div>
               <div>
                <img src='image/icon/headphones.png' alt="icon" className="w-10 h-auto object-cover"/>
                <p>Headphone</p>
             </div>

              <div>
                <img src='image/icon/laptop.png' alt="icon" className="w-10 h-auto object-cover"/>
                <p>Laptob</p>
             </div>

                <div>
                <img src='image/icon/mouse-wire.png' alt="icon" className="w-10 h-auto object-cover"/>
                <p>Mouse</p>
             </div>
              <div>
                <img src='image/icon/power.png' alt="icon" className="w-10 h-auto object-cover"/>
                <p>Adopter</p>
             </div>
             <div>
                <img src='image/icon/speaker.png' alt="icon" className="w-10 h-auto object-cover"/>
                <p>Speaker</p>
             </div>

            </div>

        </div>
    </div>
  )
}

export default FeaturedCatagories