"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Hero from "@/components/Hero";
import FeaturedCatagories from "@/components/home/FeaturedCatagories";
import FeaturedItems from "@/components/home/FeaturedItems";
import TopSellingProducts from "@/components/home/TopSellingProducts";
import TopDell from "@/components/home/TopDell";

export default function Home() {
  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-6 bg-fixed">
      
      {/* Left Column */}
      <div className="md:col-span-4 bg-gray-100">
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          <div>
            <Hero
              title="BEST DEAL !"
              description="BEST WATCH"
              image="image/hero/watch.png"
            />
          </div>

          <div>
            <Hero
              title="BEST DEAL !"
              description=" TOP PHONE"
              image="image/products/iphone13.png"
            />
          </div>

          <div>
            <Hero
              title="BEST DEAL !"
              description="TOP HEADPHONE"
              image="image/hero/headphone.png"
            />
          </div>
        </Carousel>
      </div>


      <div className=" md:col-span-2 p-4 bg-cover flex bg-center text-white  items-center   bg-black"
      style={{ backgroundImage: "url('image/hero-image.png')" }}>
        <div>
           <h4 className='text-2xl text-white font-bold'>TOP DEAL</h4>

            <div className=' w-40  bg-blue-800 text-center p-4 my-2'>
              <p className='text-xl'>50% OFF</p>
            </div>
        <p className="text-xl text-blue-600 font-bold">Limited Time Offer</p>
        <p>Get Your Favourite products at a lower price</p>
        </div>
        </div>

    </div>

     <FeaturedCatagories/>
     <FeaturedItems/>
     <TopDell/>
      <TopSellingProducts/> 

    </div>
  );
}
