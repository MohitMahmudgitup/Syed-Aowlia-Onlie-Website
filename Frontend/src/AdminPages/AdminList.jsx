import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { MdEdit, MdDelete, MdLocalSee } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FiShoppingCart } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";

export const AdminList = () => {
  const { backend } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReversed, setIsReversed] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // Track deleting product
  const token = localStorage.getItem("adminToken");

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


  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      setDeletingId(productId);
      await axios.delete(`${backend}/api/product/${productId}`, {
        headers: { token },
      });
      setProducts(products.filter(product => product._id !== productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setDeletingId(null);
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
    <div className="min-h-screen   relative">
      <div className="flex items-center gap-4">
        <div
          className="w-52 gap-2 px-3 flex items-center justify-between py-3 rounded-xl"
          style={{
            background: "linear-gradient(20deg, rgba(0, 157, 189, 1) 0%, rgba(17, 144, 255, 1) 50%, rgba(237, 221, 83, 1) 100%)"
          }}
        >
          <div>
          <p className="text-lg text-white">Total Products</p>
          <div className="text-4xl text-white   font-semibold ">
            {isLoading ? "..." : products.length}
          </div>
          </div>
          <FiShoppingCart size={33} color="white"/>
        </div>
      </div>

      <div className=" bg-white p-2 rounded-lg mt-2">
              <div className="flex justify-between  items-center mb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Admin Product List
          </h2>
        </div>

        {/* Sort button - moved to header area */}
        <button
          onClick={toggleSortOrder}
          className=" text-white px-4 py-1 rounded-md transition duration-300 hover:bg-gray-800"
          style={{
            background: "linear-gradient(210deg, rgba(255, 0, 0, 1) 0%, rgba(145, 31, 63, 1) 50%, rgba(31, 31, 31, 1) 100%)"
          }}
        >
          {isReversed ? "Show Oldest First" : "Show Newest First"}
        </button>
      </div>

      {/* Loading skeleton */}
      {isLoading ? (
        <div className="flex flex-col overflow-y-scroll md:h-[72vh]">
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
          <p className="text-lg">No products found.</p>
          <p className="text-sm mt-2">Try adding some products to get started.</p>
        </div>
      ) : (
        <div className="flex flex-col overflow-y-scroll  md:h-[72vh] ">
          {sortedProducts.map((product) => (
            <div
              key={product._id}
              className="flex bg-zinc-100 mt-1 rounded-xl p-2 items-center hover:bg-gray-200 transition-colors"
            >
              <img
                src={`${backend}/uploads/product/${product.images[0]}`}
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
                <button
                  onClick={() => handleDelete(product._id)}
                  style={{
                    background: "linear-gradient(210deg, rgba(255, 0, 0, 1) 0%, rgba(145, 31, 63, 1) 50%, rgba(31, 31, 31, 1) 100%)"
                  }}
                  className="flex gap-2 items-center px-2 py-1 rounded  text-white hover:bg-red-600 transition-colors">
                  <MdDelete size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Details Modal with Image Gallery */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-w-[90vw] shadow-lg relative max-h-[90vh] overflow-y-auto">
            {/* Close button in top-right corner */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
              aria-label="Close modal"
            >
              ×
            </button>

            {/* Product Name */}
            <h3 className="text-lg font-bold mb-4 pr-8">{selectedProduct.name}</h3>

            {/* Product Images Gallery */}
            <div className="mb-4">
              {selectedProduct.images && selectedProduct.images.length > 0 ? (
                <div className="space-y-3">
                  {/* Main Image Display */}
                  <img
                    src={`${backend}/uploads/product/${selectedProduct.images[0]}`}
                    alt={`${selectedProduct.name} - main`}
                    className="w-full h-40 object-cover rounded-lg main-product-image"
                  />

                  {/* Thumbnail Images */}
                  {selectedProduct.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {selectedProduct.images.map((image, index) => (
                        <img
                          key={index}
                          src={`${backend}/uploads/product/${image}`}
                          alt={`${selectedProduct.name} - ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-md flex-shrink-0 border-2 border-gray-200 hover:border-purple-400 cursor-pointer transition-colors"
                          onClick={(e) => {
                            // Swap main image with clicked thumbnail
                            const mainImg = document.querySelector('.main-product-image');
                            if (mainImg) {
                              mainImg.src = e.target.src;
                            }
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Image Counter */}
                  <p className="text-xs text-gray-500 text-center">
                    {selectedProduct.images.length} image{selectedProduct.images.length !== 1 ? 's' : ''} available
                  </p>
                </div>
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">No images available</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-3">
              {/* Description */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Description:</p>
                <div className="bg-gray-100 overflow-auto h-32 p-3 rounded-md">
                  <p className="text-sm break-words text-gray-800">
                    {selectedProduct.description || "No description available"}
                  </p>
                </div>
              </div>

              {/* Price and Discount */}
              <div className="flex gap-4">
                <div>
                  <span className="text-sm font-semibold text-gray-700">Price: </span>
                  <span className="text-sm">৳{selectedProduct.price}</span>
                </div>
                {selectedProduct.discount_price && (
                  <div>
                    <span className="text-sm font-semibold text-gray-700">Discount Price: </span>
                    <span className="text-sm text-green-600">৳{selectedProduct.discount_price}</span>
                  </div>
                )}
              </div>

              {/* Brand and Category */}
              <div className="flex gap-4">
                <div>
                  <span className="text-sm font-semibold text-gray-700">Brand: </span>
                  <span className="text-sm">{selectedProduct.brand || "N/A"}</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-700">Type: </span>
                  <span className="text-sm">{selectedProduct.product_type || "N/A"}</span>
                </div>
              </div>

              {/* Stock and Bestseller Status */}
              <div className="flex gap-4">
                <div>
                  <span className="text-sm font-semibold text-gray-700">Stock: </span>
                  <span className="text-sm">{selectedProduct.stock || 0}</span>
                </div>
                {selectedProduct.bestseller && (
                  <div className="bg-yellow-100 px-2 py-1 rounded text-xs font-semibold text-yellow-800">
                    Bestseller
                  </div>
                )}
              </div>

              {/* Sizes */}
              {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                <div>
                  <span className="text-sm font-semibold text-gray-700">Available Sizes: </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedProduct.sizes.map((size, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 px-2 py-1 rounded text-xs"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {selectedProduct.color && selectedProduct.color.length > 0 && (
                <div>
                  <span className="text-sm font-semibold text-gray-700">Available Colors: </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedProduct.color.map((color, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 px-2 py-1 rounded text-xs"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Date Added */}
              <div>
                <span className="text-sm font-semibold text-gray-700">Date Added: </span>
                <span className="text-sm text-gray-500">
                  {selectedProduct.date
                    ? new Date(selectedProduct.date).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-6 w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}




      </div>

    </div>
  );
};