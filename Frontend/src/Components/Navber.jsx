import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";

function Navbar({ admintoken }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { getCartItem, setToken, setCartItem, token, darkmode, backend,     searchQuery, setSearchQuery } = useContext(ShopContext);
  const [userdata, setUserData] = useState(null); // Initialize as null for better conditional checking
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

  const getUserId = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        backend + "/api/user",  // POST route
        {},                      // empty body
        { headers: { token } }   // token header
      );

      setUserData(res.data.user); // should show user data now
  };

  useEffect(() => {
    getUserId()
  }, [])


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setLinkProfile("/");
    } else {
      setLinkProfile("/login");
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={`  px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex sticky top-0  z-50 items-center justify-between py-1 font-medium   ${darkmode ? 'bg-zinc-900 text-white  ' : 'bg-[#FF8311] text-white '}`}>
      {/* Logo */}
      <NavLink to={"/"} className={"-ml-4 sm:ml-0"} >
        <img width={180} src={assets.syedAowlia} alt="" />
      </NavLink>

      {/* Links for larger screens */}
      <div className="flex justify-center gap-5 items-center ">
        <ul className="hidden sm:flex gap-5 text-sm">
          {/* <NavLink to="/" className="flex flex-col items-center gap-1">HOME</NavLink>
          <NavLink to="/collection" className="flex flex-col items-center gap-1">COLLECTION</NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">ABOUT</NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">CONTACT</NavLink> */}
        </ul>

        {admintoken && (
          <NavLink
            to="/adminPages"
            target="_blank"
            className={`hidden lg:flex  px-5 py-2 ${darkmode ? "bordersdark" : "borderslight"}`}
          >
            ADMIN PANEL
          </NavLink>
        )}
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <div onClick={handleSearch} className="hover:bg-[#ffffff] items-center bg-[#ffffffec] cursor-pointer px-4 py-2 w-60 flex gap-4 rounded-2xl">
          <input className="w-40 border-none outline-none bg-[#0000] text-black"
          value={searchQuery}
          onChange={handleSearchChange}
          type="text" 
          placeholder="Search..." />
          <div className=" w-12  flex justify-center items-center">
                      <img
            src={assets.search_icon}
            className={`w-6 cursor-pointer hidden sm:block transition-all duration-300 `}
            alt="Search Icon"
          />

          </div>

        </div>

        {/* Profile Dropdown */}
        <Link to={linkProfile}>
          <div className="relative group">
            {token ? (
              <div className="bg-[#ffffff] hover:bg-[#ffffffec] cursor-pointer px-4 py-2 w-40 flex gap-2 items-center rounded-2xl">
                <img
                  src={assets.profile_icon}
                  className="w-5 cursor-pointer transition-all duration-300"
                  alt="Profile Icon"
                />
                <p className="text-zinc-600 text-sm">
                  {userdata?.username || "Loading..."}
                </p>
              </div>
            ) : (
              <div className="relative w-9 h-9 flex justify-center items-center rounded-full overflow-hidden">
                <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
                <img
                  src={assets.profile_icon}
                  className={`relative w-5 cursor-pointer transition-all duration-300 ${darkmode ? 'invert' : 'brightness-0 invert'}`}
                  alt="Profile Icon"
                />
              </div>


            )}

            {token && (
              <div className="hidden group-hover:block absolute z-50 right-0 pt-4">
                <div className={`flex flex-col gap-4 ${darkmode ? "bg-gray-800 text-gray-200 hover:text-white " : "bg-white text-gray-700"}  w-36 px-5 py-4 rounded-md shadow-md `}>
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
          <img src={assets.cart_icon} className={`w-5 cursor-pointer transition-all duration-300 ${darkmode ? 'invert' : 'brightness-0 invert'}`} alt="Cart Icon" />
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
          className={`w-5  cursor-pointer sm:hidden block transition-all duration-300 ${darkmode ? 'invert' : 'brightness-0 invert'}`}
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
          <NavLink onClick={() => setVisible(false)} to="/" className="py-3 pl-6 border-b  text-black">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} to="/about" className="py-3 pl-6 border-b text-black">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} to="/collection" className="py-3 pl-6 border-b text-black">COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} to="/contact" className="py-3 pl-6 border-b text-black">CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;