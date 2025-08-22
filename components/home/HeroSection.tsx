"use client";
type HeroProps = {
  title: string;
  highlight?: string;
  description: string;
  image: string;
};

function HeroSection({ title, highlight, description, image,  }:HeroProps) {
  return (
    <section className=" px-2 md:px-[6%] py-2 md:py-16 m-0">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-2 md:gap-10">
        
        {/* Left Text Content */}
       <div className=" text-center md:text-left w-full lg:w-1/2">
         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-snug sm:leading-tight mb-2 md:mb-3 ">
    {title}{" "}
    <span className="text-blue-600">
      {highlight}
    </span>
  </h1>

  <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl mb-2 md:mb-4">
    {description}
  </p>

  <p className="text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2 md:mb-6">
    Get upto <span className="text-blue-600 font-semibold">30% Off</span> today only
  </p>

  <div className="mt-2 sm:mt-4">
    <button className="bg-blue-800 text-white px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm md:text-base hover:bg-blue-700 transition duration-300">
      Shop Now
    </button>
  </div>
     </div>



        {/* Right Image */}
        <div className="w-full lg:w-1/2 pb-8">
          <img
            src={image}
            alt="Hero"
            className="w-32 h-32 md:w-full md:h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
