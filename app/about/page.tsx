"use client";
import ServiceSection from "@/components/home/ServiceSection";
import { FaBoxOpen, FaSmile, FaTrophy, FaGlobe } from "react-icons/fa";
import image from '../../public/image/about/about2.jpg'
import Image from "next/image";

export default function AboutPage() {
 
  

  return (
    <div className="">
      {/* Hero Section */}
      <div className="bg-gray-50 px-5 md:px-20">
  <div className="grid grid-cols-1 md:grid-cols-2 py-2 md:py-20 gap-2  md:gap-8 items-stretch">
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
      <div className="py-10 md:space-y-8  ">
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
      <section className="bg-white py-4  md:py-8">
        <div className="max-w-6xl mx-auto px-0 md:px-6 text-center">
          <h2 className="text-xl md:text-3xl font-bold  uppercase">
          Why Choose Us
          </h2>
              <ServiceSection/>
        </div>
      </section>

     

      {/* Call-to-Action Section */}

  <section className="relative flex items-center justify-center ">
  {/* Card Container */}
  <div
    className="relative w-full overflow-hidden shadow-2xl p-4 md:p-10 lg:p-20 "
    data-aos="zoom-in"
  >
    {/* Background Image */}
    <Image
      src={image}
      alt="Business Team"
      fill
      className="absolute inset-0 object-cover"
    />

    {/* Overlay with gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/70 to-blue-900/80"></div>

    {/* Card Content */}
    <div className="relative flex flex-col items-center justify-center h-full px-6 text-center text-white">
      {/* Small Badge */}
      
      {/* Heading */}
      <h1 className="mt-2 font-extrabold text-2xl md:text-3xl leading-snug mb-4">
             Ready to Shop With Us?

      </h1>

      {/* Description */}
     <p className=" text-sm md:text-lg  text-gray-200 leading-relaxed">
      Discover high-quality products curated just for you. Start your journey with us today and 
      enjoy shopping like never before.
    </p>
      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 justify-center pt-6">
        <button className="bg-blue-600 hover:bg-blue-500 transition-all px-6 py-3 text-white font-semibold flex items-center gap-2  shadow-md">
          Learn More 
        </button>
        <button className="border-2 border-blue-400 text-red-100 hover:bg-white hover:text-blue-800 transition-all px-6 py-3 font-semibold  shadow-md">
          Shop Now
        </button>
      </div>
    </div>
  </div>
</section>


    </div>
  );
}
