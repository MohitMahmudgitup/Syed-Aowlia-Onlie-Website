import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';

function Hero() {
  const { darkmode } = useContext(ShopContext);

  return (
    <div className={`w-full h-[100vh] flex flex-col sm:flex-row items-center p-6 sm:p-10 rounded-lg  
      ${darkmode ? ' text-white' : 'bg-white text-black'}`}>
      
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-start py-10">
  <div className={`mb-4 transition-all duration-300 ${darkmode ? 'text-gray-200' : 'text-gray-800'}`}>
    {/* Decorative Line & Bestseller Label */}
    <div className="flex items-center gap-2 mb-2">
      <p className={`w-10 sm:w-12 h-[2px] transition-all duration-300 ${darkmode ? 'bg-gray-500' : 'bg-gray-800'}`}></p>
      <p className="text-sm font-semibold tracking-wide uppercase md:text-base">
        Our Bestsellers
      </p>
    </div>

    {/* Title with a Modern Highlight */}
    <div className="text-4xl sm:text-5xl font-bold leading-tight mb-3 prata-regular">
      Latest <span className="prata-regular text-violet-500 drop-shadow-lg">Arrivals</span>
    </div>

    {/* Description with Subtle Fade Effect */}
    <p className={`transition-all duration-300 ${darkmode ? 'text-gray-400' : 'text-gray-600'} text-lg leading-relaxed`}>
      Discover our latest collection and find your new favorites. From stylish tops to trendy bottoms, we have it all.
    </p>
  </div>
</div>


      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 flex justify-center">
        <img
          className="w-full h-auto object-cover rounded-lg"
          src="https://cms-cdn.kittl.com/t_shirt_designer_2_94d5fd3c51.png"
          alt="Latest Arrivals"
        />
      </div>
    </div>
  );
}

export default Hero;
