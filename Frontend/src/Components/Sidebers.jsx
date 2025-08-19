import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { MdOutlineFormatListBulleted } from "react-icons/md";

function Sidebar() {
  return (
    <aside className="w-full md:w-64 h-full ">
      <div className="flex flex-row md:flex-col sm:justify-around justify-between">
        
        <NavLink
          to="/adminPages"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center gap-2 md:gap-4 py-3 px-5 my-1 rounded-lg transition-colors duration-300 ${
              isActive ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-300'
            }`
          }
        >
          <img src={assets.add_icon} alt="Add Icon" className="w-6 h-6" />
          <p className=" text-xs md:text-lg ">Add Item</p>
        </NavLink>

        <NavLink
          to="/adminPages/list"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center gap-2 md:gap-4 py-3 px-5 my-1 rounded-lg transition-colors duration-300 ${
              isActive ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-300'
            }`
          }
        >
          <MdOutlineFormatListBulleted className="w-6 h-6"/>
          <p className=" text-xs md:text-lg ">List Item</p>
        </NavLink>

        <NavLink
          to="/adminPages/orders"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center gap-2 md:gap-4 py-3 px-5 my-1 rounded-lg transition-colors duration-300 ${
              isActive ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-300'
            }`
          }
        >
          <img src={assets.order_icon} alt="Order Icon" className="w-6 h-6" />
          <p className=" text-xs md:text-lg ">Orders</p>
        </NavLink>

      </div>
    </aside>
  );
}

export default Sidebar;
