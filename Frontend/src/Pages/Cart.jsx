import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Titel from "../Components/Titel";
import { useNavigate } from "react-router-dom";

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
  const { darkmode } = useContext(ShopContext);
  
  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItem) {
      for (const size in cartItem[itemId]) {
        tempData.push({
          id: itemId,
          size: size,
          quantity: cartItem[itemId][size],
        });
      }
    }
    setCartData(tempData);
  }, [cartItem, products]);

  // Calculate total amount
  const totalAmount = getTotalAmount();
  const navigate = useNavigate();

  return (
    <div className={`container mx-auto p-6 text-center transition-all duration-300 ${darkmode ? " text-gray-300" : "bg-white text-gray-800"}`}>
      <Titel text1="Shopping" text2=" Cart" />
      
      {cartData.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className={`min-w-full border border-gray-300 rounded-lg shadow-sm transition-all duration-300 ${darkmode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"}`}>
              <thead>
                <tr className={`${darkmode ? "bg-gray-700" : "bg-gray-200"}`}>
                  <th className="border-b-2 p-3 text-left">Product</th>
                  <th className="border-b-2 p-3 text-left">Size</th>
                  <th className="border-b-2 p-3 text-left">Quantity</th>
                  <th className="border-b-2 p-3 text-left">Price</th>
                  <th className="border-b-2 p-3 text-left">Total</th>
                  <th className="border-b-2 p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item) => {
                  const product = products?.products?.find((p) => p._id === item.id);
                  const price = product ? product.price : 0;
                  const total = price * item.quantity;
                  const productName = product?.name || "Unknown Product";

                  return (
                    <tr key={`${item.id}`}>
                      <td className="border-b p-3 flex items-center">
                        <img
                          src={product?.images[0] || "https://cdn-icons-png.flaticon.com/512/5087/5087579.png"}
                          alt={productName}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <span className="hidden sm:flex font-semibold">{productName}</span>
                      </td>
                      <td className="border-b p-3">{item.size}</td>
                      <td className="border-b p-3 flex items-center">
                        <button
                          className={`py-1 px-2 rounded-l transition-all duration-200 ${darkmode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-300 hover:bg-gray-400 text-black"}`}
                          onClick={() => removeFromCart(item.id, item.size)}
                        >
                          -
                        </button>
                        <span className={`border px-4 transition-all duration-200 ${darkmode ? "border-gray-600" : "border-gray-300"}`}>
                          {item.quantity}
                        </span>
                        <button
                          className={`py-1 px-2 rounded-r transition-all duration-200 ${darkmode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-300 hover:bg-gray-400 text-black"}`}
                          onClick={() => addtocart(item.id, item.size)}
                        >
                          +
                        </button>
                      </td>
                      <td className="border-b p-3">{currency} {price.toFixed(2)}</td>
                      <td className="border-b p-3">{currency} {total.toFixed(2)}</td>
                      <td className="border-b p-3">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-medium text-sm py-1 px-3 rounded-full"
                          onClick={() => removeFromCart(item.id, item.size)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total Amount: {currency} {totalAmount.toFixed(2)}</p>
            <button
              onClick={() => navigate("/place-order")}
              className={`py-2 px-5 mt-4 transition-all duration-200 ${darkmode ? "bg-violet-500 hover:bg-violet-400 text-white" : "bg-black hover:bg-gray-800 text-white"}`}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <img
            className="w-80"
            src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png"
            alt="Empty Cart"
          />
        </div>
      )}
    </div>
  );
};
