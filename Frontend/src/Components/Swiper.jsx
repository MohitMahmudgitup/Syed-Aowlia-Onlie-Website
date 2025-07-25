import { GoArrowRight } from "react-icons/go";

import React, { useContext } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

// Import required modules
import { Autoplay } from 'swiper/modules';
import { ShopContext } from '../Context/ShopContext';
import { Link } from "react-router-dom";

const SwiperComponent = () => {
    
      const { darkmode } = useContext(ShopContext);
  return (
    <div className="w-full h-[80vh] p-4">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
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
          
        <div className={`w-full px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] h-[100vh] flex flex-col sm:flex-row items-center p-6 sm:p-10 rounded-lg  
      ${darkmode ? ' text-white' : 'bg-white text-black'}`}>
      
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-start py-10">
  <div className={`mb-4 transition-all duration-300 ${darkmode ? 'text-gray-200' : 'text-gray-800'}`}>
    {/* Decorative Line & Bestseller Label */}
    <div className="flex items-center gap-2 mb-2">
      <p className={`w-10 sm:w-12 h-[2px] transition-all duration-300 ${darkmode ? 'bg-gray-500' : 'bg-gray-800'}`}></p>
      <p className="text-sm font-semibold tracking-wide uppercase md:text-base">
        Our Bestsellers
      </p>
    </div>

    {/* Title with a Modern Highlight */}
    <div className="text-4xl sm:text-5xl font-bold leading-tight mb-3 prata-regular">
      Latest <span className="prata-regular text-violet-500 drop-shadow-lg">Arrivals</span>
    </div>

    {/* Description with Subtle Fade Effect */}
    <p className={`transition-all duration-300 ${darkmode ? 'text-gray-400' : 'text-gray-600'} text-lg leading-relaxed`}>
      Discover our latest collection and find your new favorites. From stylish tops to trendy bottoms, we have it all.
    </p>
  </div>
</div>


      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 flex justify-center">
        <img
          className="w-full h-auto object-cover rounded-lg"
          src="https://cms-cdn.kittl.com/t_shirt_designer_2_94d5fd3c51.png"
          alt="Latest Arrivals"
        />
      </div>
    </div>









        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn-useast1.kapwing.com/static/templates/fashion-facebook-cover-photo-template-full-a4d12da3.webp"
            alt="Ad 2"
            className="rounded-lg shadow-md w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
        <div className="relative w-full h-screen">
  <img
    src="https://hbr.org/resources/images/article_assets/2021/02/Feb21_19_1218814245.jpg"
    alt="Ad 3"
    className="rounded-lg shadow-md w-full h-full object-cover"
  />
  <div className="absolute   pt-[500px] px-[50px] sm:pt-96 sm:px-20  inset-0 bottom-10">
    <Link to={"/collection"}>
    <p className="px-6 w-36  py-3 hbgbtn text-white font-semibold rounded-full shadow-lg ">
      Shop Now  —
    </p>
    </Link>
    
  </div>
</div>


        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.ignitingbusiness.com/images/marketing/online-advertising/online-advertising.jpg"
            alt="Ad 4"
            className="rounded-lg shadow-md w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
