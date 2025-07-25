import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { MdOutlineFormatListBulleted } from "react-icons/md";

function Sidebar() {
  return (
    <aside className="w-full md:w-64 h-full">
      <div className="flex flex-row md:flex-col sm:justify-around justify-between">
        <NavLink
          to="/"
          className="flex flex-col md:flex-row items-center gap-2 md:gap-4 py-3 px-5 bg-gray-100 hover:bg-gray-300 transition-colors duration-300 my-1 rounded-lg"
        >
          <img src={assets.add_icon} alt="Add Icon" className="w-6 h-6" />
          <p className=" text-xs md:text-lg ">Add Item</p>
        </NavLink>
        <NavLink
          to="/list"
          className="flex flex-col md:flex-row items-center gap-2 md:gap-4 py-3 px-5 bg-gray-100 hover:bg-gray-300 transition-colors duration-300 my-1 rounded-lg"
        >
          <MdOutlineFormatListBulleted className="w-6 h-6"/>
          {/* <img src={assets.order_icon} alt="List Icon" className="w-6 h-6" /> */}
          <p className=" text-xs md:text-lg ">List Item</p>
        </NavLink>
        <NavLink
          to="/orders"
          className="flex flex-col md:flex-row items-center gap-2 md:gap-4 py-3 px-5 bg-gray-100 hover:bg-gray-300 transition-colors duration-300 my-1 rounded-lg"

        >
          <img src={assets.order_icon} alt="Order Icon" className="w-6 h-6" />
          <p className=" text-xs md:text-lg ">Orders</p>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
