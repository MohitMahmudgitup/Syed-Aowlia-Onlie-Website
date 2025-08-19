import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdLocalSee } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const AdminList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReversed, setIsReversed] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fake loader
    setTimeout(() => {
      setProducts([
        {
          _id: "1",
          name: "Casual Shirt",
          price: 1200,
          date: "2025-01-10",
          images: ["/placeholder.png"],
        },
        {
          _id: "2",
          name: "Winter Jacket",
          price: 3500,
          date: "2025-01-05",
          images: ["/placeholder.png"],
        },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  const toggleSortOrder = () => setIsReversed(!isReversed);

  const sortedProducts = [...products].sort((a, b) =>
    isReversed ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="min-h-screen py-4 md:p-4 relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Admin Product List</h2>

      <button
        onClick={toggleSortOrder}
        className="mb-4 bg-black text-white px-4 py-2 rounded-md transition duration-300 absolute right-0"
      >
        {isReversed ? "Show Oldest First" : "Show Newest First"}
      </button>

      {isLoading ? (
        <div className="flex flex-col mt-20 overflow-y-scroll md:h-[72vh]">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex bg-gray-100 mt-1 rounded-xl p-3">
              <Skeleton circle={true} height={64} width={64} className="mr-4" />
              <div className="flex-grow px-4">
                <Skeleton height={20} className="mb-2" />
                <Skeleton height={14} className="mb-1" />
                <Skeleton height={12} />
              </div>
            </div>
          ))}
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">No products found.</div>
      ) : (
        <div className="flex flex-col mt-20 overflow-y-scroll md:h-[72vh]">
          {sortedProducts.map((product) => (
            <div
              key={product._id}
              className="flex bg-gray-100 mt-1 rounded-xl p-3 items-center"
            >
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-xl"
              />
              <div className="flex-grow px-4">
                <h3 className="text-sm font-bold">{product.name}</h3>
                <p className="text-gray-800 font-semibold">৳{product.price}</p>
                <p className="text-sm text-gray-500">
                  Date Added:{" "}
                  {product.date
                    ? new Date(product.date).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="text-blue-500 hover:underline"
                  title="View product details"
                >
                  <MdLocalSee size={20} />
                </button>
                <button title="Edit product">
                  <MdEdit size={20} />
                </button>
                <button className="flex gap-2 items-center px-2 py-1 rounded bg-red-500 text-white">
                  <MdDelete size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h3 className="text-lg font-bold mb-4">{selectedProduct.name}</h3>
            <img
              src={selectedProduct.images?.[0] || "/placeholder.png"}
              alt={selectedProduct.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 font-semibold mb-2">
              Price: ৳{selectedProduct.price}
            </p>
            <p className="text-sm text-gray-500">
              Date:{" "}
              {selectedProduct.date
                ? new Date(selectedProduct.date).toLocaleDateString()
                : "N/A"}
            </p>
            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
