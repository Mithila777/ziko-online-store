"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ServiceSection from "@/components/home/ServiceSection";
import TopDellSection from "@/components/home/TopDellSection";
import TopSellSection from "@/components/home/TopSellSection";
import BlogSection from "@/components/home/BlogSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <div className="">
    <div className="grid grid-cols-1 md:grid-cols-6 bg-fixed  bg-gray-50">
      
      {/* Left Column */}
      <div className="md:col-span-4 ">
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          <div>
            <HeroSection
              title="BEST DEAL !"
              description="BEST WATCH"
              image="image/hero/watch.png"
            />
          </div>

          <div>
            <HeroSection
              title="BEST DEAL !"
              description=" TOP PHONE"
              image="image/hero/phone.png"
            />
          </div>

          <div>
            <HeroSection
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
    <ServiceSection/>
     <FeaturedSection/>
     <TopDellSection/>
      <TopSellSection/> 
      <BlogSection/>

    </div>
  );
}
