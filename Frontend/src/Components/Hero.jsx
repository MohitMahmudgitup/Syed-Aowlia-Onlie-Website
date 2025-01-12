import React from 'react';
import { assets } from '../assets/assets';

function Hero() {
  return (
    <div className="flex flex-col sm:flex-row items-center p-6 sm:p-10 rounded-lg shadow-lg">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-start py-10">
        <div className="text-[#414141] mb-4">
          <div className="flex items-center gap-2 mb-2">
            <p className="w-8 sm:w-11 h-[2px] bg-[#414141]"></p>
            <p className="text-sm font-medium md:text-base">OUR BESTSELLERS</p>
          </div>
          <div className="text-4xl sm:text-5xl font-bold leading-tight mb-3 prata-regular">
            Latest Arrivals
          </div>

          <p className="text-gray-600 mb-4">
            Discover our latest collection and find your new favorites. From stylish tops to trendy bottoms, we have it all.
          </p>
        </div>
        <div className="flex items-center mt-4">
          <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 hover:bg-indigo-500">
            SHOP NOW
          </button>
          <p className="ml-4 text-sm font-medium md:text-base text-indigo-600 cursor-pointer">
            See All Products
          </p>
        </div>
      </div>
      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 flex justify-center">
        <img
          className="w-full h-auto object-cover rounded-lg "
          src="https://m.media-amazon.com/images/I/61qLTbPxlkL.jpg"
          alt="Latest Arrivals"
        />
      </div>
    </div>
  );
}

export default Hero;
