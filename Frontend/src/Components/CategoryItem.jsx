import axios from "axios";
import { ShopContext } from "../Context/ShopContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoryItem = () => {
    const { backend } = useContext(ShopContext);
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(backend + "/api/category/getCategory");
            setCategories(response.data.categories); 
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [backend]);

    return (
        <div className="flex overflow-x-auto space-x-4 p-2 sm:space-x-2 scrollbar-hide">
            {categories.map((item) => (
                <Link
                    to={`${item._id}`}
                    key={item._id}
                    className="flex-shrink-0 bg-[#FAFCFC] w-24 sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 p-2 flex flex-col justify-center items-center rounded-xl shadow-md 
                        hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out 
                        border border-gray-200 hover:border-[#B8D9DC]"
                >
                    <img
                        src={`${backend}/uploads/category/${item.image}`}
                        alt={item.name}
                        className="w-12 h-12  sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-lg"
                    />
                    <p className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2 text-center">{item.name}</p>
                </Link>
            ))}
        </div>
    );
};

export default CategoryItem;

