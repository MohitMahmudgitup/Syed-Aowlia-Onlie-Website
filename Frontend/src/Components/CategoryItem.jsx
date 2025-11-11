import axios from "axios";
import { ShopContext } from "../Context/ShopContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { toast } from "react-toastify";

const CategoryItem = () => {
  const { backend } = useContext(ShopContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(backend + "/api/category/getCategory");
      setCategories(response.data.categories);
    } catch (error) {
      toast.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [backend]);

  const skeletonCount = 6;

  return (
    <div className="w-full">

      <Swiper
        spaceBetween={16}
        slidesPerView={3.5}
        breakpoints={{
          480: { slidesPerView: 4.5 },
          640: { slidesPerView: 5 },
          768: { slidesPerView: 6 },
          1024: { slidesPerView: 7 },
        }}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Autoplay, Navigation]}
        className="px-.5 pb-2"
      >
        {loading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <SwiperSlide key={i}>
                <div className="w-24 sm:w-32 h-28 sm:h-32 bg-white border border-gray-200 rounded-xl flex flex-col justify-center items-center animate-pulse">
                  <Skeleton circle={true} width={60} height={60} />
                  <Skeleton width={50} height={14} className="mt-2" />
                </div>
              </SwiperSlide>
            ))
          : categories.map((item) => (
              <SwiperSlide key={item._id}>
                <Link
                  to={`${item._id}`}
                  className="w-24 sm:w-32 h-28 sm:h-32 bg-white border border-gray-200 hover:border-blue-600 rounded-xl 
                            flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
                  />
                  <p className="text-lg f1 sm:text-sm font-medium mt-2 text-gray-700 text-center">
                    {item.name}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default CategoryItem;
