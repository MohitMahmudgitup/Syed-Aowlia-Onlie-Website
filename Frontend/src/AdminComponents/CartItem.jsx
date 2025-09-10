import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";

const CartItem = () => {
  const { backend } = useContext(ShopContext);
  const [cart, setCart] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(backend + "/api/category/getCategory");
      setCart(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [backend]);

  return (
    <div className="flex flex-wrap gap-4">
     <Link to={"createproduct"}
     style={{
            background: "linear-gradient(210deg, rgba(255, 0, 0, 1) 0%, rgba(145, 31, 63, 1) 50%, rgba(31, 31, 31, 1) 100%)"
          }}
      className=" px-5 py-2 bg-white border rounded-full shadow flex items-center gap-2 hover:scale-105 transition-transform">
     <IoCreateOutline size={25} color="white" />
      <p className="text-white">Create a new product</p>
     </Link>
    </div>
  );
};

export default CartItem;
