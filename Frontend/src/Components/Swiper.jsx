import { GoArrowRight } from "react-icons/go";

import React, { useContext } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

// Import required modules
import { Autoplay } from "swiper/modules";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const SwiperComponent = () => {
  const { darkmode } = useContext(ShopContext);
  return (
    <div className="sm:w-[88vw] m-auto sm:h-[55vh] h-[21vh]  ">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="h-full"
        autoplay={{
          delay: 3000, // 3 seconds between slides
          disableOnInteraction: false, // keeps autoplay on after user swipes
        }}
        modules={[Autoplay]}
        loop={true} // Optional: loop through slides continuously
      >
        <SwiperSlide>
          <img
            src="https://img.lazcdn.com/us/domino/a63e3b50-41a3-46b9-a07e-d7d3b9e4ed5b_BD-1976-688.jpg_2200x2200q80.jpg_.webp"
            alt="Ad 2"
            className="sm:rounded-lg shadow-md w-full sm:h-full h-40  "
          />
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-screen">
            <img
              src="https://img.lazcdn.com/us/domino/75f23fa5-e4d4-4f0e-b889-ce1aa49ea824_BD-1976-688.jpg_2200x2200q80.jpg_.webp"
              alt="Ad 3"
              className="sm:rounded-lg shadow-md w-full sm:h-full h-40 "
            />
            <div className="absolute   pt-[500px] px-[50px] sm:pt-96 sm:px-20  inset-0 bottom-10">
              <Link to={"/collection"}>
                <p className="px-6 w-36  py-3  text-white font-semibold rounded-full shadow-lg ">
                  Shop Now —
                </p>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://img.lazcdn.com/us/domino/8dad4f81-bd40-4442-bf6d-da537dfc2177_BD-1976-688.jpg_2200x2200q80.jpg_.webp"
            alt="Ad 4"
            className="sm:rounded-lg shadow-md w-full sm:h-full h-40 "
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://img.lazcdn.com/us/domino/1fc78564-7bde-4325-8dbb-9a3bc14fe5c2_BD-1976-688.jpg_2200x2200q80.jpg_.webp"
            alt="Ad 4"
            className="sm:rounded-lg shadow-md w-full sm:h-full h-40 "
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
