import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Titel from "../Components/Titel";
import axios from "axios";

function Orders() {
  const { backend, token, products, currency } = useContext(ShopContext);
  const [ordersData, setOrdersData] = useState([]);

  const loadOrder = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backend}/api/order`,
        {},
        {
          headers: { token },
        }
      );

      // console.log("API response:", response.data);

      if (response.data.success && response.data.data) {
        let allOrders = [];
        response.data.data.forEach((order) => {
          order.items.forEach((item) => {
            allOrders.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date, // Check if `order.orderDate` exists in API data
              amount: order.amount,
            });
          });
        });
        setOrdersData(allOrders.reverse());
      } else {
        console.error("No orders found in the response.");
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [token]);

  const formatDate = (dateString) => {
    if (!dateString) return "Invalid date"; // Return a fallback if dateString is missing
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Invalid date"; // Ensure the date is valid

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} T:${hours}:${minutes}:${seconds}`; // Return date in format "YYYY-MM-DD HH:MM:SS"
  };

  return (
    <div className="border-t pt-6 min-h-screen">
      <div className="text-3xl mb-8 text-gray-800">
        <Titel text1="MY" text2="ORDERS" />
      </div>
      <div className="space-y-2 ">
        {ordersData.length > 0 ? (
          ordersData.map((item, index) => (
            <div
              key={index}
              className="py-6 px-4 bg-white shadow border rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Product Details */}
              <div className="flex items-start gap-6 text-sm md:w-2/3">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-lg">
                    <p className="text-indigo-600 font-bold">
                      {currency} {item.price}
                    </p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-gray-600">Size: {item.size}</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Date: <span>{formatDate(item.date)}</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Payment: <span>{item.paymentMethod} </span>
                  </p>
                </div>
              </div>

              {/* Order Status */}
              <div className="flex flex-col md:w-1/3 text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-green-500"></span>
                  <p className="text-green-600 text-lg font-medium">
                    {item.status}
                  </p>
                </div>
                <button
                  onClick={loadOrder()}
                  className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow hover:bg-indigo-700 transition-colors duration-300"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/man-finding-nothing-in-order-illustration-download-svg-png-gif-file-formats--empty-states-no-yet-person-pack-network-communication-illustrations-3309936.png"
              alt="No Orders"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
