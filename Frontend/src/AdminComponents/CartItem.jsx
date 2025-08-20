import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

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
      {cart.map((item, index) => (
        <Link to={item._id}
          key={index}
          className="bg-white gap-4 w-36 hover:shadow-md cursor-pointer rounded-md h-28 flex flex-col justify-center items-center p-5"
        >
          <img
            className="w-10 h-10 object-contain"
            src={`${backend}/uploads/category/${item.image}`}
            alt={item.name}
          />
          <p className="text-sm font-medium text-gray-700">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default CartItem;
