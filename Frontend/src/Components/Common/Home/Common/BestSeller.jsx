import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../../../Context/ShopContext";
import Titel from "../../../Titel";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { assets } from "../../../../assets/assets";
import { Link } from "react-router-dom";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

function BestSeller() {
  const { currency, products, darkmode } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    let productList = Array.isArray(products) ? products : products?.products;
    if (Array.isArray(productList)) {
      const bestProducts = productList.filter((item) => item.bestseller);
      setBestSeller(bestProducts.reverse().slice(0, 50));
    }
  }, [products]);

  const cardBgClass = darkmode
    ? "bg-white/10 border-white/20 hover:bg-white/15"
    : "bg-white/20 border-white/30 hover:bg-white/30";

  const skeletonBaseColor = darkmode ? "#374151" : "#e0e0e0";
  const skeletonHighlightColor = darkmode ? "#4b5563" : "#f5f5f5";

  return (
    <div
      className="relative sm:rounded-none 2xl:rounded-lg sm:py-8 py-2"
      style={{
        background: darkmode
          ? "linear-gradient(135deg, rgba(30,30,46,0.95), rgba(60,60,85,0.95))"
          : "linear-gradient(210deg, #ffffff, #ecff8e, #c8e6e7)",
      }}
    >
      <div className="relative z-10 px-2">
        <Titel text1="BEST" text2="SELLERS" />

        <div className="relative group">
          {/* Navigation Buttons */}
          <button className="swiper-button-prev-custom hidden lg:block absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-white/70 text-gray-800 font-bold rounded-full px-5 py-3 shadow-lg transition-all opacity-0 group-hover:opacity-100">
            ❮
          </button>
          <button className="swiper-button-next-custom hidden lg:block absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-white/70 text-gray-800 font-bold rounded-full px-5 py-3 shadow-lg transition-all opacity-0 group-hover:opacity-100">
            ❯
          </button>

          <Swiper
            modules={[Autoplay, Navigation, Grid]}
            spaceBetween={10}
            loop={false}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            grid={{ rows: 2, fill: "row" }}
           breakpoints={{
    0: {                    // Mobile
      slidesPerView: 3,
      grid: { rows: 2, fill: "row" },
      spaceBetween: 8,
    },
    640: {                  // Tablet
      slidesPerView: 3,
      grid: { rows: 2, fill: "row" },
      spaceBetween: 10,
    },
    1024: {                 // Laptop & Desktop
      slidesPerView: 4,
      grid: { rows: 1 },
      spaceBetween: 12,
    },
    1280: {                 // Big screen
      slidesPerView: 6,
      grid: { rows: 1 },
      spaceBetween: 14,
    },
  }}
            className="bestSellerSwiper"
          >
            {bestSeller.length > 0
              ? bestSeller.map((item) => {
                  const safeDescription = item.description || "";
                  return (
                    <SwiperSlide key={item._id}>
                      <Link
                        to={`/product/${item._id}`}
                        className={`block rounded-lg overflow-hidden backdrop-blur-sm border transition-all duration-300 ${cardBgClass}`}
                      >
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img
                            src={`${item.images[0]}`}
                            alt={item.name}
                            className="w-full h-24 2xl:h-40 object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>

                        <div className="p-2 hidden sm:block space-y-1">
                          <p
                            className={`text-sm font-medium ${
                              darkmode ? "text-white" : "text-gray-800"
                            }`}
                          >
                            {safeDescription.length > 15
                              ? safeDescription.slice(0, 15) + "..."
                              : safeDescription}
                          </p>
                          <p className="text-lg font-bold">
                            {currency}
                            {item.price}
                          </p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })
              : [...Array(6)].map((_, index) => (
                  <SwiperSlide key={index}>
                    <Skeleton
                      className="w-full h-40 rounded-lg"
                      baseColor={skeletonBaseColor}
                      highlightColor={skeletonHighlightColor}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default BestSeller;
