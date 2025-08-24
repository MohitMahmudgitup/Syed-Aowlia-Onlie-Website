import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineFormatListBulleted, MdDashboard, MdShoppingCart } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";

function Sidebar() {
  const navItems = [
    {
      to: "/adminPages",
      icon: <MdDashboard size={24} />,
      label: "Dashboard"
    },
    {
      to: "/adminPages/list",
      icon: <MdOutlineFormatListBulleted size={24} />,
      label: "List Items"
    },
    {
      to: "/adminPages/orders",
      icon: <MdShoppingCart size={24} />,
      label: "Orders"
    },
    {
      to: "/adminPages/category",
      icon: <BiSolidCategoryAlt size={24} />,
      label: "CatSubCategory"
    }
  ];

  return (
    <>
    <aside className="w-full  md:w-64 h-screen bg-gradient-to-b from-slate-50 to-white shadow-lg border-r border-gray-200">
      {/* Navigation */}
      <nav className="p-4">
        <div className="flex flex-row md:flex-col gap-2">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `group relative flex flex-col md:flex-row items-center gap-2 md:gap-3 py-3 px-4 rounded-xl transition-all duration-200 ${isActive
                  ? 'text-white shadow-md transform scale-105'
                  : 'text-gray-700 hover:bg-red-50 hover:text-red-600 hover:shadow-sm'
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                    background:
                      "linear-gradient(210deg, rgba(255, 0, 0, 1) 0%, rgba(145, 31, 63, 1) 50%, rgba(31, 31, 31, 1) 100%)",
                  }
                  : {}
              }
            >
              {/* Icon */}
              <div className="flex-shrink-0">{item.icon}</div>

              {/* Label */}
              <span className="text-xs md:text-base font-medium whitespace-nowrap">
                {item.label}
              </span>

              {/* Active indicator for desktop */}
              <div className="hidden md:block absolute left-0 w-1 h-8 bg-red-900 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </NavLink>

          ))}
        </div>
      </nav>
    </aside>
    </>
  );
}

export default Sidebar;