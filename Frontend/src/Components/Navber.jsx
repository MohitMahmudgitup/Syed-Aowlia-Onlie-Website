import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

function Navber() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { getCartItem, setToken, setCartItem, token , getUserCart } = useContext(ShopContext);
  
  const [linkProfile, setLinkProfile] = useState("/login");

  const handleLogout = () => {
    // Clear the token and navigate to login page
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItem({});
  };

  const handleSearch = () => {
    navigate("/collection");
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the token from local storage

    if (token) {
        // getUserCart(token); // Fetch the user's cart
        // setLinkProfile("/"); // Set the profile link if the token exists
    } else {
        setLinkProfile("/login"); // Redirect to login if no token
    }

    // Optional: log the token for debugging purposes
    // console.log("Token from local storage:", token);
}, []); // Empty dependency array to run this effect only once on component mount


  return (
    <div className="flex items-center justify-between py-5 font-medium px-2 sm:px-8">
      {/* Logo */}
      <NavLink to={"/"}>
        <img src={assets.logo2} className="w-44 md:w-52" alt="Logo" />
      </NavLink>

      {/* Links for larger screens */}
      <div className="flex justify-center gap-5 items-center">
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
          </NavLink>
          <NavLink to="/collection" className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
          </NavLink>
        </ul>
        <NavLink
          to="http://localhost:5174/" // Consider updating this in production
          target="_blank"
          className="flex-col items-center hidden lg:flex border rounded-full px-5 py-2"
        >
          <p className="text-xs">ADMIN PANEL</p>
        </NavLink>
      </div>

      {/* Icons section */}
      <div className="flex items-center gap-6 ">
        {/* Search Icon */}
        <img
          onClick={handleSearch}
          src={assets.search_icon}
          className="w-5 cursor-pointer sm:flex hidden"
          alt="Search Icon"
        />

        {/* Profile Dropdown */}
        <Link to={linkProfile}>
          <div className="group relative">
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt="Profile Icon"
            />
            { token && (
              <div className="group-hover:block hidden absolute z-50 dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-4 bg-white w-36 px-5 py-4 rounded-md shadow-md">
                  <p className="text-lg text-gray-500 hover:text-black cursor-pointer">
                    Profile
                  </p>
                  <Link to="/oders">
                    <p className="text-lg text-gray-500 hover:text-black cursor-pointer">
                      Orders
                    </p>
                  </Link>
                  <p
                    className="text-lg text-gray-500 hover:text-black cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        </Link>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 cursor-pointer"
            alt="Cart Icon"
          />
          <p className="absolute -right-[5px] w-4 -bottom-[5px] text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">
            {getCartItem() || 0} {/* Ensure cart count is always shown */}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="Menu Icon"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Sidebar for small screens */}
      <div
        className={`fixed z-40 top-0 right-0 bottom-0 bg-white transition-all duration-300 ${
          visible ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col text-gray-700">
          <div
            onClick={() => setVisible(false)}
            className="flex gap-4 items-center p-3"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt="Back Icon"
            />
            <p className="text-xl">Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to="/"
            className="py-3 pl-6 border"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/about"
            className="py-3 pl-6 border"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/collection"
            className="py-3 pl-6 border"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/contact"
            className="py-3 pl-6 border"
          >
            CONTACT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="http://localhost:5174/"
            className="py-3 pl-6 border bg-black text-white"
          >
            ADMIN PANEL
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navber;
