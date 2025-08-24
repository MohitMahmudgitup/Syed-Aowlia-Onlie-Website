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
        <div className="grid grid-cols-6 gap-10 ">
            {categories.map((item) => (
                <Link to = {`${item._id}`}
                    key={item._id}
                    className="bg-white cursor-pointer w-10 sm:w-36 h-10 sm:h-24 p-3 flex justify-center items-center rounded-xl shadow-md 
                     hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out 
                     border border-gray-200 hover:border-orange-400"
                >
                    <div className="flex justify-center flex-col items-center ">
                    <img
                        src={`${backend}/uploads/category/${item.image}`} // Use backend path
                        alt={item.name}
                        className="w-6 sm:w-12 h-6 sm:h-12 object-cover rounded-lg"
                    />
                    <p className="sm:block hidden text-sm">{item.name}</p>

                    </div>

                </Link>
            ))}
        </div>
    );
};

export default CategoryItem;
