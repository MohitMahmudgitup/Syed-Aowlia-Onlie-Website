import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';

function NewsLetterBox() {
  const { darkmode } = useContext(ShopContext); // Get dark mode state

  const onClickSubmit = (event) => {
    event.preventDefault();
    console.log("Submit button clicked");
  };

  return (
    <div className={`py-8 px-4  `}>
      <div className="max-w-xl mx-auto text-center">
        <h1 className={`font-bold text-3xl mb-3 ${darkmode ? "text-gray-200" : "text-gray-800"}`}>
          Subscribe Now & Get 25% Off
        </h1>
        <p className={`mb-6 ${darkmode ? "text-gray-400" : "text-gray-600"}`}>
          Join our newsletter and stay updated on the latest offers and products.
        </p>
        <form onSubmit={onClickSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            className={`w-full sm:w-2/3 p-3 border rounded-lg focus:outline-none transition duration-200 
            ${darkmode ? "bg-gray-800 border-gray-600 text-white focus:ring-gray-500" : "border-gray-300 focus:ring-black"}`}
            placeholder="Enter your email"
            required
          />
          <button className={`px-6 py-3 rounded-lg text-sm transition duration-200 focus:outline-none
            ${darkmode ? "bg-violet-500 text-white font-semibold hover:bg-violet-400" : "bg-black text-white hover:bg-gray-800"}`}>
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewsLetterBox;
