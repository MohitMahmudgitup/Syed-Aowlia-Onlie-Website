import React from 'react';
import { assets } from '../assets/assets';

function OuerPolicy() {
  return (
    <div className="my-16 mx-auto max-w-screen-xl px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Our Policies</h2>
      <div className="flex flex-col sm:flex-row justify-between gap-8">
        {/* Easy Exchange Policy */}
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 transition-transform duration-300 hover:shadow-lg hover:scale-105">
          <img className="w-16 mb-4" src={assets.exchange_icon} alt="Easy Exchange" />
          <p className="font-semibold text-xl">Easy Exchange Policy</p>
          <p className="text-gray-500 text-center text-sm">We offer hassle-free exchange policy.</p>
        </div>

        {/* 7 Days Return Policy */}
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 transition-transform duration-300 hover:shadow-lg hover:scale-105">
          <img className="w-16 mb-4" src={assets.quality_icon} alt="7 Days Return" />
          <p className="font-semibold text-xl">7 Days Return Policy</p>
          <p className="text-gray-500 text-center text-sm">We provide a 7 days free return policy.</p>
        </div>

        {/* Best Customer Support */}
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 transition-transform duration-300 hover:shadow-lg hover:scale-105">
          <img className="w-16 mb-4" src={assets.support_img} alt="Best Customer Support" />
          <p className="font-semibold text-xl">Best Customer Support</p>
          <p className="text-gray-500 text-center text-sm">We provide 24/7 customer support.</p>
        </div>
      </div>
    </div>
  );
}

export default OuerPolicy;
