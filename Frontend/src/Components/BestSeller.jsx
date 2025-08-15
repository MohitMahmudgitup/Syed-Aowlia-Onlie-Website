import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Titel from "./Titel";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function BestSeller() {
  const { currency, products, darkmode } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products.products) {
      const bestProducts = products.products.filter((item) => item.bestseller);
      setBestSeller(bestProducts.reverse().slice(0, 50));
    } else {
      console.error("Products is not an array:", products);
    }
  }, [products]);

  return (
    <div className="sm:my-10  rounded-md sm:py-5" style={{
  background: "linear-gradient(20deg, rgba(248, 86, 6, 1) 0%, rgba(255, 131, 17, 1) 50%, rgba(237, 221, 83, 1) 100%)"
}}
>
      <div className="text-3xl pl-2 border-b">
        <Titel text1={"BEST"} text2={"SELLERS"} />
      </div>

      <div className="flex gap-2 sm:gap-0 overflow-x-auto scrollbar-hide py-1 sm:py-0 px-2 sm:px-0">
        {bestSeller.length > 0
          ? bestSeller.map((item) => {
              const safeDescription = item.description || "";
              return (
                <div
                  key={item._id}
                  className="flex w-full relative sm:px-2 sm:py-4 justify-between"
                >
                  <div className="absolute  -right-5 sm:-right-2 top-10 sm:top-32">
                    <img width={80} src={assets.bestSeller} alt="Best Seller" />
                  </div>

                  <Link
                    className={`cursor-pointer h-full  w-28 sm:w-full rounded-xl  ${
                      darkmode ? "text-gray-300" : "text-gray-700"
                    }`}
                    to={`/product/${item._id}`}
                  >
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-28 h-28 sm:h-52 object-cover"
                      />
                    </div>

                    <p
                      className={` pt-2 text-sm sm:text-xl ${
                        darkmode ? "text-white" : "text-gray-100"
                      }`}
                    >
                      {safeDescription.length > 10
                        ? safeDescription.slice(0, 10) + "..."
                        : safeDescription}
                    </p>

                    <p className=" text-lg sm:text-2xl font-medium text-[#ffffff]">
                      {currency}
                      {item.price}
                    </p>

                    <img
                      className=" pb-2"
                      width={80}
                      src={assets.yellowFiveSter}
                      alt="Rating"
                    />
                  </Link>
                </div>
              );
            })
          : [...Array(5)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-48">
                <Skeleton
                  height={200}
                  baseColor={darkmode ? "#374151" : "#e0e0e0"}
                  highlightColor={darkmode ? "#4b5563" : "#f5f5f5"}
                />
                <Skeleton
                  count={2}
                  baseColor={darkmode ? "#374151" : "#e0e0e0"}
                  highlightColor={darkmode ? "#4b5563" : "#f5f5f5"}
                />
                <Skeleton
                  width={100}
                  baseColor={darkmode ? "#374151" : "#e0e0e0"}
                  highlightColor={darkmode ? "#4b5563" : "#f5f5f5"}
                />
              </div>
            ))}
      </div>
    </div>
  );
}

export default BestSeller;
