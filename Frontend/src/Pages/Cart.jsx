import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Titel from "../Components/titel";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const {
    currency,
    products,
    cartItem,
    getTotalAmount,
    removeFromCart,
    addtocart,
    deleteFromCart
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

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

  // Calculate the total amount
  const totalAmount = getTotalAmount();
  const navigate = useNavigate();

  // Function to clear the cart
  const clearCart = () => {
    // Clear all items from the cart
    Object.keys(cartItem).forEach((itemId) => {
      Object.keys(cartItem[itemId]).forEach((size) => {
        removeFromCart(itemId, size);
      });
    });
  };

  // Function to handle checkout navigation
  const handleCheckout = () => {
    navigate("/place-order"); // Correctly navigate to the checkout page
  };

  return (
    <div className="container mx-auto p-6 text-center">
      <Titel text1="Shopping" text2=" Cart"></Titel>
      {cartData.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border-b-2 border-gray-300 p-3 text-left">
                    Product
                  </th>
                  <th className="border-b-2 border-gray-300 p-3 text-left">
                    Size
                  </th>
                  <th className="border-b-2 border-gray-300 p-3 text-left">
                    Quantity
                  </th>
                  <th className="border-b-2 border-gray-300 p-3 text-left">
                    Price
                  </th>
                  <th className="border-b-2 border-gray-300 p-3 text-left">
                    Total
                  </th>
                  <th className="border-b-2 border-gray-300 p-3 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item) => {
                  // Fetch the product based on item.id
                  const product = products?.products?.find(
                    (p) => p._id === item.id
                  );
                  // console.log(product); // Check if products is defined
                  const price = product ? product.price : 0; // Get product price
                  const total = price * item.quantity; // Calculate total for this item
                  const productName = product?.name || "Unknown Product"; // Fallback name

                  return (
                    <tr key={`${item.id}`}>
                      <td className="border-b border-gray-300 p-3 flex items-center">
                        <img
                          src={
                            product?.images[0] ||
                            "https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
                          } // Display product image
                          alt={productName}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />

                        <span className="hidden sm:flex font-semibold">
                          {productName}
                        </span>
                      </td>
                      <td className="border-b border-gray-300 p-3">
                        {item.size}
                      </td>
                      <td className="border-b border-gray-300 p-3 flex items-center">
                        <button
                          className="bg-gray-300 hover:bg-gray-400 text-white font-medium text-sm py-1 px-2 rounded-l"
                          onClick={() => removeFromCart(item.id, item.size)} // Decrease quantity
                        >
                          -
                        </button>
                        <span className="border border-gray-300 px-4">
                          {item.quantity}
                        </span>
                        <button
                          className="bg-gray-300 hover:bg-gray-400 text-white font-medium text-sm py-1 px-2 rounded-r"
                          onClick={() => addtocart(item.id, item.size)} // Increase quantity
                        >
                          +
                        </button>
                      </td>
                      <td className="border-b border-gray-300 p-3">
                        {currency} {price.toFixed(2)}
                      </td>
                      <td className="border-b border-gray-300 p-3">
                        {currency} {total.toFixed(2)}
                      </td>
                      <td className="border-b border-gray-300 p-3">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-medium text-sm py-1 px-3 rounded-full"
                          onClick={() => removeFromCart(item.id, item.size)} // Remove item
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
            <p className="text-xl font-bold">
              Total Amount: {currency} {totalAmount.toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="text-white bg-black py-2 px-5 mt-4"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <img
            className="w-80"
            src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0="
            alt=""
          />
        </div>
        // <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>
      )}
    </div>
  );
};
