import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className=" text-white py-10">
      <div className="flex flex-col sm:grid grid-cols-3 gap-8 mx-auto max-w-screen-xl px-6 text-sm">
        {/* Logo and Description */}
        <div className="flex flex-col">
          <img className="mb-4 w-32" src={assets.logo} alt="Company Logo" />
          <p className="text-gray-400 leading-relaxed">
            Whether you need help expanding the team, ramping up marketing, or keeping surprise bestsellers in stock, Shopify Capital is here to lend a hand.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-lg font-semibold mb-4">Explore</p>
          <ul className="space-y-2">
            <li>
              <button className="text-gray-400 hover:text-indigo-400 transition duration-300">
                Home
              </button>
            </li>
            <li>
              <button className="text-gray-400 hover:text-indigo-400 transition duration-300">
                About
              </button>
            </li>
            <li>
              <button className="text-gray-400 hover:text-indigo-400 transition duration-300">
                Collection
              </button>
            </li>
            <li>
              <button className="text-gray-400 hover:text-indigo-400 transition duration-300">
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <p className="text-lg font-semibold mb-4">Contact Us</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-gray-400">
              <span>📞</span> +1-000-000-0000
            </li>
            <li className="flex items-center gap-2 text-gray-400">
              <span>✉️</span> mohitmahmud25@gmail.com
            </li>
            <li className="flex items-center gap-2 text-gray-400">
              <span>📷</span> Instagram
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />
      <p className="text-center text-xs text-gray-500">
        Copyright © 2024 Mohit Mahmud - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
