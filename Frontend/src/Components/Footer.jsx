import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import PaymentMethods from "./PaymentMethods";


const Footer = () => {
  const { darkmode } = useContext(ShopContext);

  return (
    <>

    <div className={`py-5 bg-[#FF8311] mt-10 text-white `}>
      <div className="flex  flex-col sm:grid grid-cols-3 gap-8 mx-auto sm:w-[80vw] text-sm px-3 ">
        {/* Logo and Description */}
        <div className="flex flex-col">
          <NavLink to={"/"} className={" -ml-3 "}>
            <img width={180} src={assets.syedAowlia} alt="Online Shop BD" />
          </NavLink>
          <p className="leading-relaxed mt-4 ">
            Whether you need help expanding the team, ramping up marketing, or
            keeping surprise bestsellers in stock, Shopify Capital is here to
            lend a hand.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-lg font-semibold mb-4 text-white">Explore</p>
          <ul className="space-y-2">
            {["Home", "About", "Collection", "Contact"].map((item, index) => (
              <li key={index}>
                <button
                  className={`transition duration-300 ${
                    darkmode
                      ? " hover:text-violet-400"
                      : " hover:text-indigo-400"
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <p className="text-lg font-semibold mb-4 text-white">Contact Us</p>
          <ul className="space-y-2 text-gray-200">
            <li className="flex items-center gap-2">
              <span>📞</span> +88-0183-597-2300
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span> syedaowliaonlineshop@gmail.com
            </li>
            <li>
                  <PaymentMethods/>
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-6 border-gray-700 mx-6" />
      <p className="text-center text-xs  px-6">
        Copyright © 2025 Mohit Mahmud - All Rights Reserved.
      </p>
    </div>
    </>
  );
};

export default Footer;
