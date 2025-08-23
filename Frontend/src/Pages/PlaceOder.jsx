import React, { useContext, useState } from "react";
import Titel from "../Components/Titel";

import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const {
    navigate,
    backend,
    token,
    cartItem,
    setCartItem,
    getTotalAmount,
    delivery_fee,
    products,
    darkmode
  } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderItems = [];

      for (const itemId in cartItem) {
        const sizes = cartItem[itemId];

        for (const size in sizes) {
          const quantity = sizes[size];
          if (quantity > 0) {
            const itemsInfo = products.products.find((p) => p._id === itemId);
            if (itemsInfo) {
              const clonedItemInfo = structuredClone(itemsInfo);
              clonedItemInfo.size = size;
              clonedItemInfo.quantity = quantity;
              orderItems.push(clonedItemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getTotalAmount() + delivery_fee,
      };
      // console.log(orderData);
      // Ensure token is logged for debugging
      // console.log("Token being sent:", token);

      switch (method) {
        case "cod":
          const response = await axios.post(
            backend + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          console.log(response.data);
          if (response.data.success) {
            setCartItem({});
            navigate("/oders");
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
          break;
          case "stripe":
            const responseStrict = await axios.post(
              backend + "/api/order/stripe",
              orderData,
              { headers: { token } }
            );
            console.log(responseStrict.data);
            if (responseStrict.data.success) {
              const { session_url } = responseStrict.data;
              window.location.replace(session_url);
            } else {
              toast.error(responseStrict.data.message);
            }
      
          break;
            

        default:
          break;
      }
    } catch (error) {
      console.error("An error occurred during order submission:", error);
      toast.error("Order submission failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto sm:p-6 pt-10">
      <div className="text-center sm:pb-0 pb-6">
        <Titel text1={"DELIVERY"} text2={" INFORMATION"}></Titel>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto  p-6 rounded-lg shadow"
      >
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={`w-full border border-gray-300 rounded-md p-1 ${darkmode ? "text-gray-700" : "text-black"}`}
              />
            </div>
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={`w-full border border-gray-300 rounded-md p-1 ${darkmode ? "text-gray-700" : "text-black"}`}
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full border border-gray-300 rounded-md p-1 ${darkmode ? "text-gray-700" : "text-black"}`}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="street">
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
              className={`w-full border border-gray-300 rounded-md p-1 ${darkmode ? "text-gray-700" : "text-black"}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-1 text-sm font-medium" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className={`w-full border border-gray-300 rounded-md p-1 ${darkmode ? "text-gray-700" : "text-black"}`}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium" htmlFor="state">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className={`w-full border border-gray-300 rounded-md p-1 ${darkmode ? "text-gray-700" : "text-black"}`}
              />
            </div>
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="zipCode"
              >
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className={`w-full border border-gray-300 rounded-md p-1 ${darkmode ? "text-gray-700" : "text-black"}`}
              />
            </div>
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="country"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className={`w-full border border-gray-300 rounded-md p-1 ${darkmode ? "text-gray-700" : "text-black"}`}
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
                className={`w-full border border-gray-300 rounded-md p-1 ${darkmode ? "text-gray-700" : "text-black"}`}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-0 gap-5">
            {/* <div className="flex items-center gap-2 ">
              <p
                onClick={() => setMethod("stripe")}
                className={` cursor-pointer min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" && "bg-black"
                }`}
              ></p>
              <img className="h-5 mx-5" src={assets.stripe_logo} alt="" />
            </div> */}
            {/* <div className="flex items-center gap-2">
              <p
                onClick={() => setMethod("razorpay")}
                className={` cursor-pointer min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" && "bg-black"
                }`}
              ></p>
              <img className="h-5 mx-5" src={assets.razorpay_logo} alt="" />
            </div> */}
            <div className="flex items-center  w-56  gap-2">
              <p
                onClick={() => setMethod("cod")}
                className={` cursor-pointer min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" && "bg-black"
                }`}
              ></p>
              <p className="text-sm  h-5 mx-5 text-gray-600">CASH ON DELIVERY</p>
            </div>
          </div>
          <button
            // onClick={() => navigate("/oders")}
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md mt-4 hover:bg-gray-700 transition duration-200"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
