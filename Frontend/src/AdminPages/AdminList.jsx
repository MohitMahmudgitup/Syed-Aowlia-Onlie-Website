import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { MdEdit, MdDelete, MdLocalSee } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ShopContext } from "../Context/ShopContext";

export const AdminList = () => {
  const { backend } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReversed, setIsReversed] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ Fetch all products
  const fetchAllProduct = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(backend + "/api/product");
      const data = res.data.products || [];
      setProducts(data); // ✅ update products state so UI works
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, [backend]);

  const toggleSortOrder = () => setIsReversed(!isReversed);

  // ✅ Sorting products
  const sortedProducts = [...products].sort((a, b) =>
    isReversed
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="min-h-screen py-4 md:p-4 relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Admin Product List
      </h2>

      {/* Sort button */}
      <button
        onClick={toggleSortOrder}
        className="mb-4 bg-black text-white px-4 py-2 rounded-md transition duration-300 absolute right-0"
      >
        {isReversed ? "Show Oldest First" : "Show Newest First"}
      </button>

      {/* Loading skeleton */}
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
        <div className="text-center mt-20 text-gray-500">
          No products found.
        </div>
      ) : (
        <div className="flex flex-col mt-20 overflow-y-scroll md:h-[72vh]">
          {sortedProducts.map((product) => (
            <div
              key={product._id}
              className="flex bg-gray-100 mt-1 rounded-xl p-3 items-center"
            >
              <img
                src={`http://localhost:4000/uploads/product/${product.images[0]}`}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-xl"
              />
              <div className="flex-grow px-4">
                <h3 className="text-sm font-bold">{product.name}</h3>
                <p className="text-gray-800 font-semibold">
                  ৳{product.price}
                </p>
                <p className="text-sm text-gray-500">
                  Date Added:{" "}
                  {product.date
                    ? new Date(product.date).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {/* View Button */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="text-blue-500 hover:underline"
                  title="View product details"
                >
                  <MdLocalSee size={20} />
                </button>

                {/* Edit Button */}
                <button title="Edit product">
                  <MdEdit size={20} />
                </button>

                {/* Delete Button */}
                <button className="flex gap-2 items-center px-2 py-1 rounded bg-red-500 text-white">
                  <MdDelete size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-4 rounded-lg w-96 shadow-lg relative">
            <h3 className="text-lg font-bold mb-4">User Name</h3>
            <img
              src={`http://localhost:4000/uploads/product/${selectedProduct.images[0]}`}
              alt={selectedProduct.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <p className="text-sm mb-4">Description :</p>
            <div className="bg-zinc-300 overflow-scroll h-40 p-2 rounded-md">
            <p className="text-sm mb-4 break-words ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione similique dolore autem aliquid corporis adipisci? Cum, nobis non optio itaque assumenda ratione commodi? Quaerat earum quibusdam fuga maxime laborum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione similique dolore autem aliquid corporis adipisci? Cum, nobis non optio itaque assumenda ratione commodi? Quaerat earum quibusdam fuga maxime laborum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione similique dolore autem aliquid corporis adipisci? Cum, nobis non optio itaque assumenda ratione commodi? Quaerat earum quibusdam fuga maxime laborum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione similique dolore autem aliquid corporis adipisci? Cum, nobis non optio itaque assumenda ratione commodi? Quaerat earum quibusdam fuga maxime laborum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione similique dolore autem aliquid corporis adipisci? Cum, nobis non optio itaque assumenda ratione commodi? Quaerat earum quibusdam fuga maxime laborum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione similique dolore autem aliquid corporis adipisci? Cum, nobis non optio itaque assumenda ratione commodi? Quaerat earum quibusdam fuga maxime laborum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione similique dolore autem aliquid corporis adipisci? Cum, nobis non optio itaque assumenda ratione commodi? Quaerat earum quibusdam fuga maxime laborum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione similique dolore autem aliquid corporis adipisci? Cum, nobis non optio itaque assumenda ratione commodi? Quaerat earum quibusdam fuga maxime laborum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione similique dolore autem aliquid corporis adipisci? Cum, nobis non optio itaque assumenda ratione commodi? Quaerat earum quibusdam fuga maxime laborum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione similique dolore autem aliquid corporis adipisci? Cum, nobis non optio itaque assumenda ratione commodi? Quaerat earum quibusdam fuga maxime laborum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione similique dolore autem aliquid corporis adipisci? Cum, nobis non optio itaque assumenda ratione commodi? Quaerat earum quibusdam fuga maxime laborum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione similique dolore autem aliquid corporis adipisci? Cum, nobis non optio itaque assumenda ratione commodi? Quaerat earum quibusdam fuga maxime laborum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione similique dolore autem aliquid corporis adipisci? Cum, nobis non optio itaque assumenda ratione commodi? Quaerat earum quibusdam fuga maxime laborum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione similique dolore autem aliquid corporis adipisci? Cum, nobis non optio itaque assumenda ratione commodi? Quaerat earum quibusdam fuga maxime laborum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione similique dolore autem aliquid corporis adipisci? Cum, nobis non optio itaque assumenda ratione commodi? Quaerat earum quibusdam fuga maxime laborum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione similique dolore autem aliquid corporis adipisci? Cum, nobis non optio itaque assumenda ratione commodi? Quaerat earum quibusdam fuga maxime laborum.</p>
            </div>
            <p className="text-sm mb-4">{selectedProduct.sizes}</p>
            <div className="flex gap-2">
            <p className="text-gray-700 text-sm font-semibold mb-2">Price: <span className="font-normal">৳ 5875</span>  </p>
            <p className="text-gray-700 text-sm font-semibold mb-2">Brand: <span className="font-normal">৳ 5875</span> </p>
            </div>
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
