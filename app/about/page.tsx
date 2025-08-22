"use client";

import ServiceSection from "@/components/home/ServiceSection";
import { FaBoxOpen, FaSmile, FaTrophy, FaGlobe } from "react-icons/fa";
export default function AboutPage() {
 
  

  return (
    <div className="">
      {/* Hero Section */}
      <div className="bg-gray-50 px-5 md:px-20">
  <div className="grid grid-cols-1 md:grid-cols-2 py-20 gap-8 items-stretch">
    {/* Right Column (Image) */}
    <div className="order-1 md:order-2 p-4 h-full bg-black">
      <img
        src="image/about/about1.png"
        alt="about"
        className="w-full h-full object-cover "
      />
    </div>

    {/* Left Column (Text + Stats) */}
    <div className="order-2 md:order-1 space-y-8 h-full flex flex-col justify-between">
      <div className="py-10 space-y-8">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-3xl">Our Story</h1>
          <p className="text-gray-600 md:text-sm text-base leading-relaxed">
            At Ziko, our mission is to provide the best products with unmatched
            quality and service. We combine technology, design, and passion to
            create an exceptional shopping experience.
          </p>
          <p className="text-gray-600 text-base md:text-sm leading-relaxed">
            Our team continuously innovates to bring the latest trends and
            cutting-edge products to our customers. From selection to delivery,
            we ensure every step is seamless, reliable, and customer-focused.
          </p>
        </div>

        {/* Success / Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition">
            <FaBoxOpen className="w-12 h-12" />
            <div>
              <p className="text-2xl font-bold text-blue-800">25K+</p>
              <p className="text-gray-600">Products Sold</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition">
            <FaSmile className="w-12 h-12" />
            <div>
              <p className="text-2xl font-bold text-blue-800">15K+</p>
              <p className="text-gray-600">Happy Customers</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition">
            <FaTrophy className="w-12 h-12" />
            <div>
              <p className="text-2xl font-bold text-blue-800">12</p>
              <p className="text-gray-600">Awards Won</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition">
            <FaGlobe className="w-12 h-12" />
            <div>
              <p className="text-2xl font-bold text-blue-800">10+</p>
              <p className="text-gray-600">Countries Served</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



      {/* Features Section */}
      <section className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-0 md:px-6 text-center">
          <h2 className="text-xl md:text-3xl font-bold  uppercase">
          Why Choose Us
          </h2>
              <ServiceSection/>
        </div>
      </section>

     

      {/* Call-to-Action Section */}
<section
  className="relative bg-cover bg-center flex items-center justify-center min-h-[60vh]"
  style={{
    backgroundImage: "url('image/about/about2.jpg')",
  }}
>
  {/* Overlay for better text readability */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

  {/* Content */}
  <div className="relative max-w-4xl mx-auto px-6 text-center text-white space-y-6">
    <h2 className=" text-xl  md:text-3xl font-bold tracking-wide drop-shadow-lg">
      Ready to Shop With Us?
    </h2>
    <p className=" text-sm md:text-lg  text-gray-200 leading-relaxed">
      Discover high-quality products curated just for you. Start your journey with us today and 
      enjoy shopping like never before.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="bg-blue-700 hover:bg-blue-600 text-white font-semibold px-2 md:px-8 py-3  shadow-lg transition-transform transform hover:scale-105">
        Shop Now
      </button>
      <button className="bg-white/90 hover:bg-white text-gray-800 font-semibold px-2 md:px-8 py-3  shadow-lg transition-transform transform hover:scale-105">
        Learn More
      </button>
    </div>
  </div>
</section>


    </div>
  );
}
