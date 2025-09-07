"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ServiceSection from "@/components/home/ServiceSection";
import TopDellSection from "@/components/home/TopDellSection";
import TopSellSection from "@/components/home/TopSellSection";
import BlogSection from "@/components/home/BlogSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import HeroSection from "@/components/home/HeroSection";
import {Suspense} from "react";

export default function Home() {
  return (
    <div className="">
   <div className="grid grid-cols-2 md:grid-cols-6 bg-gray-900 h-[42vh] md:h-auto max-h-screen ">
  {/* Left Column - Carousel */}
  <div className="md:col-span-4 h-full">
<Carousel
  autoPlay
  infiniteLoop
  interval={3000}   // ⏳ 3s per slide
  showThumbs={false}
  showStatus={false}
  showArrows={false}
  showIndicators={false}
>
  <div>
    <HeroSection
      title="BEST DEAL !"
      description="BEST WATCH"
      image="/image/hero/watch.png"
    />
  </div>
  <div>
    <HeroSection
      title="BEST DEAL !"
      description="TOP PHONE"
      image="/image/hero/phone.png"
    />
  </div>
  <div>
    <HeroSection
      title="BEST DEAL !"
      description="TOP HEADPHONE"
      image="/image/hero/headphone.png"
    />
  </div>
</Carousel>

  </div>

  {/* Right Column */}
<div
  className="relative md:col-span-2 p-4 flex items-center justify-center text-center md:text-left bg-black bg-cover bg-center h-full md:h-full"
  style={{ backgroundImage: "url('image/hero-image.png')" }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-800/40 to-blue-900/50"></div>

  {/* Content */}
  <div className="relative space-y-2 md:space-y-6">
    <h4 className="text-lg sm:text-2xl font-bold text-white">TOP DEAL</h4>

    <div className="w-28 sm:w-40 bg-blue-800 text-center text-gray-200 p-2 sm:p-4 my-2 mx-auto md:mx-0 rounded">
      <p className="text-base sm:text-xl font-semibold">50% OFF</p>
    </div>

    <p className="text-blue-300 font-bold text-sm sm:text-lg">
      Limited Time Offer
    </p>
    <p className="text-xs sm:text-base text-gray-100">
      Get Your Favourite products at a lower price
    </p>
  </div>
</div>

</div>

    <ServiceSection/>
    <Suspense fallback={<div>Loading...</div>}>
       <FeaturedSection/></Suspense>
     <TopDellSection/>
      <TopSellSection/> 
      <BlogSection/>

    </div>
  );
}
