import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { motion } from "framer-motion";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";

function Navbar({ admintoken }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { getCartItem, setToken, setCartItem, token, darkmode, backend, searchQuery, setSearchQuery } = useContext(ShopContext);
  const [userdata, setUserData] = useState(null); // Initialize as null for better conditional checking
  const [linkProfile, setLinkProfile] = useState("/login");
  const [isOpen, setIsOpen] = useState(false);


  const toggleSearch = () => setIsOpen((prev) => !prev);

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
      backend + "/api/user",
      {},
      { headers: { token } }
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
    <div className={`  px-4 sm:px-[5vw] md:px-[7vw] xl:px-[8vw] 2xl:px-[16vw] flex sticky top-0  z-50 items-center justify-between py-1 font-medium   ${darkmode ? 'bg-zinc-900 text-white  ' : 'bg-[#B8D9DC] text-white '}`}>
      {/* Logo */}
      <NavLink to={"/"} className={"-ml-4 sm:ml-0"} >
        <img width={180} src={assets.syedAowlia} alt="" />
      </NavLink>

      {/* Icons Section */}
      <div className="flex items-center  gap-2">
      {admintoken && (
  <NavLink
    to="/adminPages/dashboard"
    target="_blank"
  >
    <div className="hidden lg:flex items-center justify-center text-zinc-400 bg-white rounded-full py-2 w-40">
      ADMIN PANEL
    </div>
  </NavLink>
)}

        {/* Search Icon */}
        <div className="pr-3  py-2  bg-[#ffffffec] hidden sm:block  rounded-full">
          <div onClick={handleSearch} className="items-center  cursor-pointer  w-full flex justify-center rounded-full">
            <motion.input
              initial={{ width: "0rem", opacity: 0.8 }}
              animate={{ width: isOpen ? "10rem" : "0rem", opacity: isOpen ? 1 : 0.8 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="border-none outline-none pl-3 bg-[#0000] text-black "
              value={searchQuery}
              onChange={handleSearchChange}
              type="text"
              placeholder="Search..."
            />

            <motion.div
              whileHover={{ scale: 1.2, rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-6 flex justify-center items-center "
              onClick={toggleSearch} // click toggles search open
            >
              <img
                src={assets.search_icon}
                className="w-5  cursor-pointer hidden sm:block"
                alt="Search Icon"
              />
            </motion.div>
          </div>
        </div>

        <Link to={"collection"} className="relative gap-2 px-0 sm:px-4 w-9 xl:w-full text-black h-9 flex justify-center items-center rounded-full bg-[#ffffffec] overflow-hidden">
          
          <div className="hidden sm:block">
              <p>COLLECTIONS</p>
            </div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-6 flex justify-center items-center "
            onClick={toggleSearch} // click toggles search open
          >
            
            <img
              src={assets.allProduct}
              className="relative cursor-pointer transition-all duration-300"
              alt="Search Icon"
            />
          </motion.div>
        </Link>


        {/* Profile Dropdown */}
        <Link to={linkProfile}>
          <div className="relative group">
            {token ? (
              <div className="bg-[#ffffffec] cursor-pointer px-4 py-2 sm:w-40 flex gap-2 items-center rounded-full">
                <img
                  src={assets.profile_icon}
                  className="w-5 cursor-pointer transition-all duration-300"
                  alt="Profile Icon"
                />
                <p className="text-zinc-600 sm:block hidden text-sm">
                  {userdata?.username || "Loading..."}
                </p>
              </div>
            ) : (
              <div className="relative w-9 h-9 flex justify-center items-center rounded-full bg-[#ffffffec] overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-6 flex justify-center items-center "
                  onClick={toggleSearch} // click toggles search open
                >
                  <FiUser  size={26} color="black" />
                </motion.div>

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
       <div>
  <Link to="/cart" className="relative">
    <IoBagHandleOutline size={26} color="black" />

    <p className="absolute -right-1 -bottom-1 text-center w-4 h-4 rounded-full text-xs bg-[#ECFF8E] text-black leading-[14px]">
      {getCartItem() || 0}
    </p>
  </Link>
</div>


        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="Menu Icon"
          className={`w-5  cursor-pointer sm:hidden block transition-all duration-300 `}
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
          {/* <NavLink onClick={() => setVisible(false)} to="/" className="py-3 pl-6 border-b  text-black">HOME</NavLink> */}
          {/* <NavLink onClick={() => setVisible(false)} to="/about" className="py-3 pl-6 border-b text-black">ABOUT</NavLink> */}
          <NavLink onClick={() => setVisible(false)} to="/collection" className="py-3 pl-6 border-b text-black">COLLECTION</NavLink>
          {/* <NavLink onClick={() => setVisible(false)} to="/contact" className="py-3 pl-6 border-b text-black">CONTACT</NavLink> */}
          {
            
            admintoken &&
            <NavLink onClick={() => setVisible(false)} to="/adminPages" className="py-3 pl-6 border-b text-white bg-black">ADMIN PANAL</NavLink>

          }
        </div>
      </div>
    </div>
  );
}

export default Navbar;