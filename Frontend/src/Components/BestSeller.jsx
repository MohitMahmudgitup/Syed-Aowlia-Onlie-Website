import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Titel from "./Titel";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

// ✅ Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
      className="relative sm:my-4 rounded-2xl sm:py-8 py-4 shadow-2xl"
      style={{
        background: darkmode
          ? "linear-gradient(135deg, rgba(30, 30, 46, 0.95) 0%, rgba(45, 45, 65, 0.95) 50%, rgba(60, 60, 85, 0.95) 100%)"
          : "linear-gradient(210deg,rgba(255, 255, 253, 1) 0%, rgba(236, 255, 142, 1) 50%, rgba(200, 230, 231, 1) 100%)",
      }}
    >
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-8 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-4 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-md animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Title */}
        <div className="px-4">
          <Titel text1={"BEST"} text2={"SELLERS"} />
        </div>

        {/* ✅ Swiper Section */}
        <div className="relative px-4 mt-4 group">
          {/* Custom Navigation Buttons */}
          <button
            className="swiper-button-prev-custom absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white text-gray-800 font-bold rounded-full px-5 py-3 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            ❮
          </button>
          <button
            className="swiper-button-next-custom absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white text-gray-800 font-bold rounded-full px-5 py-3 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            ❯
          </button>

          {bestSeller.length > 0 ? (
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={10}
              slidesPerView={2}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true, 
              }}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
              className="bestSellerSwiper"
            >
              {bestSeller.map((item) => {
                const safeDescription = item.description || "";
                return (
                  <SwiperSlide key={item._id}>
                    <div className="relative group w-full h-full">
                      {/* Badge */}
                      <div className="absolute sm:-top-2 -top-1 sm:-right-2 right-7 z-20 transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
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
                        to={`/product/${item._id}`}
                        className="block w-full rounded-2xl h-full transition-transform duration-500"
                      >
                        <div
                          className={`relative rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-300 ${
                            darkmode
                              ? "bg-white/10 border-white/20 hover:bg-white/15"
                              : "bg-white/20 border-white/30 hover:bg-white/30"
                          }`}
                        >
                          {/* Image */}
                          <div className="relative overflow-hidden rounded-t-2xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                            <img
                              src={`${backend}/uploads/product/${item.images[0]}`}
                              alt={item.name}
                              className="w-full h-40 object-cover transform transition-transform duration-700 group-hover:scale-110"
                            />
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
                              <p className="text-lg sm:text-xl font-bold drop-shadow-md">
                                {currency}
                                {item.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            // Skeleton loader
            <div className="flex space-x-2">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="w-44 sm:w-52 md:w-60">
                  <Skeleton height={180} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BestSeller;
