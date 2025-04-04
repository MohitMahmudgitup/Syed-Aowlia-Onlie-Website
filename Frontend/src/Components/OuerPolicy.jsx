import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";
import Titel from "./Titel";
import { MdCurrencyExchange } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

function OuerPolicy() {
  const { darkmode } = useContext(ShopContext); // Access dark mode state

  return (
    <div className="my-16 mx-auto max-w-screen-xl px-4">
      <div className="text-center ">
        <Titel text1={"OUR "} text2={"POLICIES"} />
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-8 pt-8">
        {/* Easy Exchange Policy */}
        <div
          className={`flex flex-col items-center ${
            darkmode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } shadow-md rounded-lg p-6 transition-transform duration-300 hover:shadow-lg hover:scale-105`}
        >
          
          <MdCurrencyExchange size={60} />
          <p className="font-semibold text-xl pt-5">Easy Exchange Policy</p>
          <p
            className={`text-center text-sm ${
              darkmode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            We offer hassle-free exchange policy.
          </p>
        </div>

        {/* 7 Days Return Policy */}
        <div
          className={`flex flex-col items-center ${
            darkmode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } shadow-md rounded-lg p-6 transition-transform duration-300 hover:shadow-lg hover:scale-105`}
        >
          <img
            className="w-16 mb-4"
            src={assets.quality_icon}
            alt="7 Days Return"
          />
          <p className="font-semibold text-xl">7 Days Return Policy</p>
          <p
            className={`text-center text-sm ${
              darkmode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            We provide a 7 days free return policy.
          </p>
        </div>

        {/* Best Customer Support */}
        <div
          className={`flex flex-col items-center ${
            darkmode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } shadow-md rounded-lg p-6 transition-transform duration-300 hover:shadow-lg hover:scale-105`}
        >
          <BiSupport  size={60}/>
          <p className="font-semibold text-xl pt-5">Best Customer Support</p>
          <p
            className={`text-center text-sm ${
              darkmode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            We provide 24/7 customer support.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OuerPolicy;
