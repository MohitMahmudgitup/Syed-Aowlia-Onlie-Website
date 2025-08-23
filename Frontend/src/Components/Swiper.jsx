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
      background: #FF8311 !important;
      width: 12px !important;
      height: 12px !important;
      margin: 0 4px !important;
      opacity: 1 !important;
      transition: all 0.3s ease !important;
      border-radius: 50% !important; /* ensures circular bullets */
    }
    .custom-swiper .swiper-pagination-bullet-active {
      background: #FF8311 !important;
      transform: scale(1.25) !important;
      border-radius: 50% !important; 
    }
    .custom-swiper .swiper-pagination {
      bottom: 20px !important;
    }
  `
}} />

      
      {/* Gradient overlay for better visual depth */}
      {/* <div className="absolute top-4 left-4 right-4 bottom-4 bg-gradient-to-b from-transparent via-transparent to-black/50 rounded-2xl pointer-events-none z-10" /> */}
      
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative overflow-hidden">
          <div className="relative w-full h-full">
            <img
              src="https://img.lazcdn.com/us/domino/75f23fa5-e4d4-4f0e-b889-ce1aa49ea824_BD-1976-688.jpg_2200x2200q80.jpg_.webp"
              alt="Shop Collection"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Enhanced Call-to-Action */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <Link to="/collection">
                <button className="group/btn relative  px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full shadow-xl hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  <span className="flex items-center  gap-2">
                    Shop Now 
                    <GoArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative overflow-hidden">
          <div className="relative w-full h-full">
            <img
              src="https://img.lazcdn.com/us/domino/8dad4f81-bd40-4442-bf6d-da537dfc2177_BD-1976-688.jpg_2200x2200q80.jpg_.webp"
              alt="Featured Products"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-transparent" />
            <div className="absolute top-6 right-6 text-white text-right">
           
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative overflow-hidden">
          <div className="relative w-full h-full">
            <img
              src="https://img.lazcdn.com/us/domino/1fc78564-7bde-4325-8dbb-9a3bc14fe5c2_BD-1976-688.jpg_2200x2200q80.jpg_.webp"
              alt="Best Sellers"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-black/30" />
            <div className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white">
            
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Progress indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
        </div>
      </div>
    </div>
  );
};

export default SwiperComponent;