import React from 'react';
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className=" py-10">
      <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-10 mx-auto max-w-screen-xl px-6 text-sm">
        {/* Logo and Description */}
        <div className="flex flex-col">
        <NavLink to={"/"}>
              <p className="text-2xl">LOGO</p>
     </NavLink>
          <p className="text-gray-600 leading-relaxed pt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate accusamus commodi pariatur eum dolore harum voluptatibus possimus obcaecati quos. Libero, dolorem facilis. Neque dignissimos amet ad placeat nesciunt vel architecto?
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-4">COMPANY</p>
          <ul className="flex flex-col text-gray-600">
            <li className="hover:text-indigo-600 transition duration-300">HOME</li>
            <li className="hover:text-indigo-600 transition duration-300">ABOUT</li>
            <li className="hover:text-indigo-600 transition duration-300">COLLECTION</li>
            <li className="hover:text-indigo-600 transition duration-300">CONTACT</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <p className="text-xl font-medium mb-4">GET IN TOUCH</p>
          <ul className="flex flex-col text-gray-600">
            <li className="hover:text-indigo-600 transition duration-300">+1-000-000-0000</li>
            <li className="hover:text-indigo-600 transition duration-300">mohitmahmud25@gmail.com</li>
            <li className="hover:text-indigo-600 transition duration-300">Instagram</li>
          </ul>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />
      <p className="text-center text-sm text-gray-600">Copyright © 2024 Mohit Mahmud - All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
