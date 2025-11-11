import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
// Import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";

const SwiperComponent = () => {
  const { backend  } = useContext(ShopContext);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch hero images from backend
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const res = await axios.get( backend  + "/api/hero");
        if (res.data.success && res.data.data?.length > 0) {
          setSlides(res.data.data[0].image);
        }
      } catch (error) {
        toast.error("Error fetching hero images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, []);

  return (
    <div className="relative w-full sm:py-4 py-2 sm:h-[60vh] h-[25vh] group">
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-swiper .swiper-pagination-bullet {
            background: #B8D9DC !important;
            width: 12px !important;
            height: 12px !important;
            margin: 10px 4px !important;
            opacity: 1 !important;
            transition: all 0.3s ease !important;
            border-radius: 50% !important;
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

      {loading ? (
        // Skeleton while loading
        <div className="w-full h-full">
          <Skeleton height="100%" width="100%" />
        </div>
      ) : (
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          className="custom-swiper h-full rounded-lg overflow-hidden"
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          loop={true}
        >
          {slides.map((img, i) => (
            <SwiperSlide key={i} className="relative overflow-hidden">
              <img src={img} alt={`Slide ${i}`} className="w-full h-full" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default SwiperComponent;
