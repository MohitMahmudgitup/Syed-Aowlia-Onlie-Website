import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Titel from "../Components/Titel";
import { Link, useNavigate } from "react-router-dom";

export const Cart = () => {
  const {
    currency,
    products,
    cartItem,
    getTotalAmount,
    removeFromCart,
    addtocart,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const { darkmode, backend, delivery_fee } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];

    for (const itemId in cartItem) {
      for (const size in cartItem[itemId]) {
        if (size === "color") continue;
        if (cartItem[itemId][size] > 0) {
          const uniqueColors = [...new Set(cartItem[itemId].color || [])];

          tempData.push({
            id: itemId,
            size: size,
            color: uniqueColors,
            quantity: cartItem[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  const totalAmount = getTotalAmount();

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkmode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-900"}`}>
      <div className="container mx-auto px-4 py-8">
        <Titel text1="Shopping" text2="Cart" />

        {cartData.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            {/* Items Section */}
            <div className="flex-1 space-y-4">
              {cartData.map((item) => {
                const product = products?.products?.find((p) => p._id === item.id);
                const price = product ? product.price : 0;
                const total = price * item.quantity;
                const productName = product?.name || "Unknown Product";

                return (
                  <div
                    key={`${item.id}-${item.size}`}
                    className={`flex flex-col sm:flex-row items-center sm:items-start p-4 rounded-xl shadow-md transition hover:shadow-lg ${
                      darkmode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <img
                      src={`${backend}/uploads/product/${product?.images?.[0]}`}
                      alt={productName}
                      className="w-24 h-24 object-cover rounded-lg mb-2 sm:mb-0 sm:mr-4"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/96?text=No+Image";
                      }}
                    />
                    <div className="flex-1 w-full">
                      <Link to={`/product/${product?._id || "#"}`} className="font-semibold text-sm hover:underline">
                        {productName}
                      </Link>
                      <p className={`text-xs ${darkmode ? "text-gray-400" : "text-gray-500"}`}>
                        ID: {item.id.slice(-4)}
                      </p>
                      {item.color.length > 0 && (
                        <p className={`text-xs ${darkmode ? "text-gray-400" : "text-gray-500"}`}>
                          Color: {item.color.join(", ")}
                        </p>
                      )}
                      {
                        item.size.length > 0 && (
                          <p className="mt-1 text-sm font-medium">Size: {item.size}</p>
                        )
                      }

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            darkmode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                          }`}
                          onClick={() => removeFromCart(item.id, item.size)}
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            darkmode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                          }`}
                          onClick={() => addtocart(item.id, item.size)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end mt-4 sm:mt-0 sm:ml-4">
                      <span className="font-medium">{currency}{price.toFixed(2)}</span>
                      <span className="font-bold text-lg">{currency}{total.toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary Section */}
            <div className="w-full lg:w-80 h-fit sticky top-20 self-start">
              <div className={`rounded-xl p-6 shadow-md ${darkmode ? "bg-gray-800" : "bg-white"}`}>
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Items ({cartData.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span className="text-sm">{currency}{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Delivery</span>
                  <span className="text-sm">{currency}{delivery_fee}</span>
                </div>
                <div className="border-t border-gray-300 dark:border-gray-600 my-3"></div>
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total</span>
                  <span>{currency}{(totalAmount + delivery_fee).toFixed(2)}</span>
                </div>
                <button
                  onClick={() => navigate("/place-order")}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-16">
            <img
              className="w-80 max-w-full"
              src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png"
              alt="Empty Cart"
            />
            <div className="text-center mt-6">
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className={`${darkmode ? "text-gray-400" : "text-gray-600"} mb-4`}>
                Start shopping to add items to your cart
              </p>
              <button
                onClick={() => navigate("/")}
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  darkmode ? "bg-violet-600 hover:bg-violet-500 text-white" : "bg-black hover:bg-gray-800 text-white"
                }`}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
