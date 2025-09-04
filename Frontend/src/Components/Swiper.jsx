import { GoArrowRight } from "react-icons/go";
import React, { useContext } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// Import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const SwiperComponent = () => {
  const { darkmode } = useContext(ShopContext);
  
  return (
    <div className="relative sm:w-[85vw] w-full p-4 mx-auto sm:h-[60vh] h-[25vh] group">
      {/* Custom CSS for pagination bullets */}
<style dangerouslySetInnerHTML={{
  __html: `
    .custom-swiper .swiper-pagination-bullet {
      background: #B8D9DC !important;
      width: 12px !important;
      height: 12px !important;
      margin: 10px 4px !important;
      opacity: 1 !important;
      transition: all 0.3s ease !important;
      border-radius: 50% !important; /* ensures circular bullets */
    }
    .custom-swiper .swiper-pagination-bullet-active {
      background: #B8D9DC !important;
      transform: scale(1.25) !important;
      border-radius: 50% !important; 
    }
    .custom-swiper .swiper-pagination {
      bottom: 5px !important;
    }
  `
}} />

      
      {/* Gradient overlay for better visual depth */}
      {/* <div className=" absolute top-4 left-4 right-4 bottom-4 bg-gradient-to-b from-transparent via-transparent to-black/50 rounded-2xl pointer-events-none z-10" /> */}
      
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        className="custom-swiper h-full rounded-2xl overflow-hidden shadow-2xl"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        loop={true}
      >
        <SwiperSlide className="relative overflow-hidden">
          <div className="relative w-full h-full">
            <img
              src="https://img.lazcdn.com/us/domino/a63e3b50-41a3-46b9-a07e-d7d3b9e4ed5b_BD-1976-688.jpg_2200x2200q80.jpg_.webp"
              alt="Special Offer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative overflow-hidden">
          <div className="relative w-full h-full">
            <img
              src="https://img.lazcdn.com/us/domino/75f23fa5-e4d4-4f0e-b889-ce1aa49ea824_BD-1976-688.jpg_2200x2200q80.jpg_.webp"
              alt="Shop Collection"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative overflow-hidden">
          <div className="relative w-full h-full">
            <img
              src="https://img.lazcdn.com/us/domino/8dad4f81-bd40-4442-bf6d-da537dfc2177_BD-1976-688.jpg_2200x2200q80.jpg_.webp"
              alt="Featured Products"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative overflow-hidden">
          <div className="relative w-full h-full">
            <img
              src="https://img.lazcdn.com/us/domino/1fc78564-7bde-4325-8dbb-9a3bc14fe5c2_BD-1976-688.jpg_2200x2200q80.jpg_.webp"
              alt="Best Sellers"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Progress indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
        </div>
      </div>
    </div>
  );
};

export default SwiperComponent;