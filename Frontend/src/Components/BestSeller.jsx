import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Titel from "./Titel";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function BestSeller() {
  const { currency, products, darkmode, backend } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      const bestProducts = products.filter((item) => item.bestseller);
      setBestSeller(bestProducts.reverse().slice(0, 50));
    } else if (products?.products && Array.isArray(products.products)) {
      const bestProducts = products.products.filter((item) => item.bestseller);
      setBestSeller(bestProducts.reverse().slice(0, 50));
    } else {
      console.error("Products is not an array:", products);
    }
  }, [products]);

  return (
    <div
      className="sm:my-12 my-8 rounded-2xl sm:py-8 py-6 relative overflow-hidden shadow-2xl"
      style={{
        background: darkmode
          ? "linear-gradient(135deg, rgba(30, 30, 46, 0.95) 0%, rgba(45, 45, 65, 0.95) 50%, rgba(60, 60, 85, 0.95) 100%)"
          : "linear-gradient(210deg,rgba(255, 255, 253, 1) 0%, rgba(236, 255, 142, 1) 50%, rgba(200, 230, 231, 1) 100%)",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-8 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-4 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-md animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Title Section */}
        <div className="px-4">
          <div className="inline-block relative">
            <Titel text1={"BEST"} text2={"SELLERS"} />
          </div>
        </div>

        {/* Products Row Scroll */}
        <div className="flex overflow-x-auto space-x-4 px-4 sm:space-x-6 scrollbar-hide">
          {bestSeller.length > 0
            ? bestSeller.map((item, index) => {
                const safeDescription = item.description || "";
                return (
                  <div
                    key={item._id}
                    className="relative group flex-shrink-0 w-44 sm:w-52 md:w-60"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Best Seller Badge */}
                    <div className="absolute -top-2 -right-2 z-20 transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      <div className="relative">
                        <img
                          width={60}
                          src={assets.bestSeller}
                          alt="Best Seller"
                          className="drop-shadow-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-sm animate-ping"></div>
                      </div>
                    </div>

                    <Link
                      className="block cursor-pointer rounded-2xl h-full transform transition-all duration-500"
                      to={`/product/${item._id}`}
                    >
                      {/* Card Container */}
                      <div
                        className={`relative rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-300  ${
                          darkmode
                            ? "bg-white/10 border-white/20 hover:bg-white/15"
                            : "bg-white/20 border-white/30 hover:bg-white/30"
                        }`}
                      >
                        {/* Image Container */}
                        <div className="relative overflow-hidden rounded-t-2xl">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                          <img
                            src={`${backend}/uploads/product/${item.images[0]}`}
                            alt={item.name}
                            className="w-full h-36 sm:h-40 object-cover transform transition-transform duration-700 group-hover:scale-110"
                          />
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>

                        {/* Content */}
                        <div className="p-2 space-y-1">
                          <p
                            className={`text-sm sm:text-base font-medium leading-tight ${
                              darkmode ? "text-white" : "text-gray-800"
                            }`}
                          >
                            {safeDescription.length > 15
                              ? safeDescription.slice(0, 15) + "..."
                              : safeDescription}
                          </p>

                          <div className="flex items-center justify-between">
                            <p className="text-lg sm:text-xl font-bold  drop-shadow-md">
                              {currency}
                              {item.price}
                            </p>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center space-x-1">
                            <img
                              width={70}
                              src={assets.yellowFiveSter}
                              alt="Rating"
                              className="drop-shadow-sm"
                            />
                            <span className="text-xs text-white/80 ml-1">
                              (4.8)
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
            : [...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-44 sm:w-52 md:w-60"
                >
                  <div
                    className={`rounded-2xl overflow-hidden shadow-xl ${
                      darkmode ? "bg-white/10" : "bg-white/20"
                    }`}
                  >
                    <Skeleton
                      height={180}
                      baseColor={darkmode ? "#374151" : "#ffffff40"}
                      highlightColor={darkmode ? "#4b5563" : "#ffffff60"}
                      borderRadius="0.5rem"
                    />
                    <div className="p-4 space-y-3">
                      <Skeleton
                        count={2}
                        baseColor={darkmode ? "#374151" : "#ffffff40"}
                        highlightColor={darkmode ? "#4b5563" : "#ffffff60"}
                      />
                      <div className="flex justify-between items-center">
                        <Skeleton
                          width={80}
                          baseColor={darkmode ? "#374151" : "#ffffff40"}
                          highlightColor={darkmode ? "#4b5563" : "#ffffff60"}
                        />
                        <Skeleton
                          width={32}
                          height={32}
                          circle
                          baseColor={darkmode ? "#374151" : "#ffffff40"}
                          highlightColor={darkmode ? "#4b5563" : "#ffffff60"}
                        />
                      </div>
                      <Skeleton
                        width={70}
                        height={20}
                        baseColor={darkmode ? "#374151" : "#ffffff40"}
                        highlightColor={darkmode ? "#4b5563" : "#ffffff60"}
                      />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default BestSeller;
