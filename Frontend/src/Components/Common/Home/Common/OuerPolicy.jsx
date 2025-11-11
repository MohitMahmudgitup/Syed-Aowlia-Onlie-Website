import React, { useContext } from "react";
import { assets } from "../../../../assets/assets";
import { ShopContext } from "../../../../Context/ShopContext";
import Titel from "../../../Titel";
import { MdCurrencyExchange } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

const policyData = [
  {
    id: 1,
    icon: <MdCurrencyExchange size={60} />,
    title: "Easy Exchange Policy",
    description: "We offer hassle-free exchange policy.",
  },
  {
    id: 2,
    icon: <img className="w-16 mb-4" src={assets.quality_icon} alt="7 Days Return" />,
    title: "7 Days Return Policy",
    description: "We provide a 7 days free return policy.",
  },
  {
    id: 3,
    icon: <BiSupport size={60} />,
    title: "Best Customer Support",
    description: "We provide 24/7 customer support.",
  },
];

function OurPolicy() {
  const { darkmode } = useContext(ShopContext);

  const cardStyle = `flex flex-col w-full items-center shadow-md rounded-lg p-6 transition-transform duration-300 hover:shadow-lg hover:scale-105`;

  return (
    <div>
      <Titel text1="OUR " text2="POLICIES" />

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
        {policyData.map((policy) => (
          <div
            key={policy.id}
            className={`${cardStyle} bg-[#ECFF8E] text-gray-900`}
          >
            {policy.icon}
            <p className="font-semibold text-xl pt-5">{policy.title}</p>
            <p className={`text-center text-sm ${darkmode ? "text-gray-300" : "text-gray-500"}`}>
              {policy.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurPolicy;
