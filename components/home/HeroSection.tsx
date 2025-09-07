"use client";

type HeroProps = {
  title: string;
  highlight?: string;
  description: string;
  image: string;
};

function HeroSection({ title, highlight, description, image }: HeroProps) {
  return (
    <section className="relative px-4 md:px-[6%] py-12 md:py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Left Text Content */}
        <div className="text-center lg:text-left w-full lg:w-1/2 space-y-4 md:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug sm:leading-tight text-white">
            {title}{" "}
            {highlight && (
              <span className="text-blue-500 drop-shadow-md">{highlight}</span>
            )}
          </h1>

          <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
            {description}
          </p>

          <p className="text-sm sm:text-base md:text-lg font-medium text-gray-400">
            Get up to{" "}
            <span className="text-blue-400 font-semibold">30% Off</span> today
            only
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 text-sm md:text-base font-semibold text-white rounded-full shadow-lg transition-all duration-300">
              Shop Now
            </button>
            <button className="border-2 border-gray-400 text-gray-200 hover:bg-white hover:text-gray-900 px-6 py-3 text-sm md:text-base font-semibold rounded-full shadow-md transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={image}
            alt="Hero"
            className="w-48 sm:w-72 md:w-full max-w-md object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
