import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const Footer = () => {
  const { darkmode } = useContext(ShopContext);

  return (
    <div className={`py-10 transition-all duration-300 ${darkmode ? " text-gray-300" : "bg-white text-gray-800"}`}>
      <div className="flex flex-col sm:grid grid-cols-3 gap-8 mx-auto max-w-screen-xl px-6 text-sm">
        {/* Logo and Description */}
        <div className="flex flex-col">
          <NavLink to={"/"}>
            <p className="text-2xl font-semibold">LOGO</p>
          </NavLink>
          <p className="leading-relaxed mt-4 text-gray-400">
            Whether you need help expanding the team, ramping up marketing, or keeping surprise bestsellers in stock, Shopify Capital is here to lend a hand.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-lg font-semibold mb-4">Explore</p>
          <ul className="space-y-2">
            {["Home", "About", "Collection", "Contact"].map((item, index) => (
              <li key={index}>
                <button className={`transition duration-300 ${darkmode ? "text-gray-400 hover:text-violet-400" : "text-gray-600 hover:text-indigo-400"}`}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <p className="text-lg font-semibold mb-4">Contact Us</p>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2">
              <span>📞</span> +1-000-000-0000
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span> mohitmahmud25@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <span>📷</span> Instagram
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />
      <p className="text-center text-xs text-gray-500">
        Copyright © 2025 Mohit Mahmud - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
