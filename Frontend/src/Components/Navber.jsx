import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import {  NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Switch from "./Switch";

function Navbar() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { getCartItem, setToken, setCartItem, token, getUserCart, darkmode } = useContext(ShopContext);
  
  const [linkProfile, setLinkProfile] = useState("/login");

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItem({});
  };

  const handleSearch = () => {
    navigate("/collection");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token"); 
    if (storedToken) {
      // getUserCart(storedToken);
      setLinkProfile("/"); 
    } else {
      setLinkProfile("/login"); 
    }
  }, []); 

  return (
    <div className={`flex sticky top-0  z-50 items-center justify-between py-5 font-medium px-2 sm:px-8 ${darkmode ? 'bg-zinc-900 text-white' : 'bg-white text-black'}`}>
      {/* Logo */}
      <NavLink to={"/"}>
        <p className="text-2xl">LOGO</p>
      </NavLink>

      {/* Links for larger screens */}
      <div className="flex justify-center gap-5 items-center">
        <ul className="hidden sm:flex gap-5 text-sm">
          <NavLink to="/" className="flex flex-col items-center gap-1">HOME</NavLink>
          <NavLink to="/collection" className="flex flex-col items-center gap-1">COLLECTION</NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">ABOUT</NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">CONTACT</NavLink>
        </ul>
        <NavLink
          to="https://full-stack-e-commerce-admins.onrender.com"
          target="_blank"
          className={`hidden lg:flex border rounded-full px-5 py-2 ${darkmode ? "bg-gray-900 border-gray-700 shadow-lg shadow-gray-800" : " border-gray-400 shadow-md"}`}
          
        >
          ADMIN PANEL
        </NavLink>
        <div className="hidden sm:block">
          <Switch />
        </div>
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img
          onClick={handleSearch}
          src={assets.search_icon}
        
          className={`w-5 cursor-pointer hidden sm:block transition-all duration-300 ${darkmode ? 'invert' : ''}`}
          alt="Search Icon"
        />

        {/* Profile Dropdown */}
        <Link to={linkProfile}>
          <div className="relative group">
          <img src={assets.profile_icon} className={`w-5 cursor-pointer transition-all duration-300 ${darkmode ? 'invert' : ''}`} alt="Profile Icon" />

            {token && (
              <div className="hidden group-hover:block absolute z-50 right-0 pt-4">
                <div className={`flex flex-col gap-4 ${darkmode ? "bg-gray-800 text-gray-200 hover:text-white " : "bg-white text-gray-700"}  w-36 px-5 py-4 rounded-md shadow-md `}>
                  <p className={`${darkmode ? "bg-gray-800 text-gray-200 hover:text-white " : "bg-white text-gray-700 hover:text-black"}  cursor-pointer`}>Profile</p>
                  <Link to="/oders">
                    <p className={`${darkmode ? "bg-gray-800 text-gray-200 hover:text-white " : "bg-white text-gray-700 hover:text-black"}  cursor-pointer`}>Orders</p>
                  </Link>
                  <p className={`${darkmode ? "bg-gray-800 text-gray-200 hover:text-white " : "bg-white text-gray-700 hover:text-black"}  cursor-pointer`} onClick={handleLogout}>Logout</p>
                </div>
              </div>
            )}
          </div>
        </Link>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className={`w-5 cursor-pointer transition-all duration-300 ${darkmode ? 'invert' : ''}`} alt="Cart Icon" />
          <p className={`absolute -right-[5px] -bottom-[5px] text-center w-4 h-4 rounded-full text-xs 
  ${darkmode ? 'bg-white text-black' : 'bg-black text-white'}`}>
  {getCartItem() || 0}
</p>

        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="Menu Icon"
          className={`w-5 cursor-pointer sm:hidden block transition-all duration-300 ${darkmode ? 'invert' : ''}`}
          
        />
      </div>

      {/* Sidebar for small screens */}
      <div
        className={`fixed z-40 top-0 right-0 bottom-0 ${darkmode ? "bg-zinc-900 text-white" : "bg-white"} transition-all duration-300 ${visible ? "w-64" : "w-0"} overflow-hidden`}
      >
        <div className="flex flex-col">
          <div onClick={() => setVisible(false)} className="flex gap-4 items-center p-3">
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="Back Icon" />
            <p className="text-xl">Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} to="/" className="py-3 pl-6 border-b ">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} to="/about" className="py-3 pl-6 border-b">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} to="/collection" className="py-3 pl-6 border-b">COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} to="/contact" className="py-3 pl-6 border-b">CONTACT</NavLink>
          <NavLink onClick={() => setVisible(false)} to="https://full-stack-e-commerce-admins.onrender.com" className="py-3 pl-6  bg-black text-white">ADMIN PANEL</NavLink>
          <div className="mt-5 ml-5 sm:hidden block">
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
