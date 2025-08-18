"use client";
type HeroProps = {
  title: string;
  highlight?: string;
  description: string;
  image: string;
};

function HeroSection({ title, highlight, description, image,  }:HeroProps) {
  return (
    <section className=" px-[6%] py-16 m-0">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        
        {/* Left Text Content */}
        <div className="text-center lg:text-left w-full lg:w-1/2">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight mb-6">
            {title}{" "}
            <span className="text-blue-600">
              {highlight}
            </span>
          </h1>

          <p className="text-gray-600 text-lg ">
            {description}
          </p>
          <p>Get upto 30% Off today only</p>

          <div className=" mt-4">
              <button className="bg-blue-800 text-white px-6 py-3 hover:bg-blue-700 transition duration-300">
                Shop Now
              </button>
          
              
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={image}
            alt="Hero"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
