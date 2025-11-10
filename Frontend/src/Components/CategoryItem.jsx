import axios from "axios";
import { ShopContext } from "../Context/ShopContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategoryItem = () => {
  const { backend } = useContext(ShopContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(backend + "/api/category/getCategory");
      setCategories(response.data.categories); 
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [backend]);

  const skeletonCount = 6; 

  return (
    <div className="flex overflow-x-auto space-x-2 sm:p-2 pb-2 scrollbar-hide">
      {loading
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 bg-[#FFFFFF] sm:w-32 md:w-36 sm:h-32 md:h-36 sm:p-2 px-5 py-2 flex flex-col justify-center items-center 2xl:rounded-lg xl:rounded-lg rounded-full border border-blue-700 animate-pulse"
            >
              <Skeleton
                circle={true}
                width={64}
                height={64}
                className="hidden sm:block sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-lg"
              />
              <Skeleton
                width={60}
                height={16}
                className="sm:mt-2 text-center"
              />
            </div>
          ))
        : categories.map((item) => (
            <Link
              to={`${item._id}`}
              key={item._id}
              className="flex-shrink-0 bg-[#FFFFFF] sm:w-32 md:w-36 sm:h-32 md:h-36 sm:p-2 px-5 py-2 flex flex-col justify-center items-center 2xl:rounded-lg xl:rounded-lg rounded-full 
                     transition-transform duration-300 ease-in-out 
                     border border-blue-700 "
            >
              <img
                src={`${item.image}`}
                alt={item.name}
                className="w-12 hidden sm:block h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-lg"
              />
              <p className="text-sm sm:text-sm md:text-base sm:mt-2 text-center">{item.name}</p>
            </Link>
          ))}
    </div>
  );
};

export default CategoryItem;
