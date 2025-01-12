import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { backend } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProduct({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    images: [],
    category: "",
    subCategory: "",
    bestseller: false,
    sizes: [], // Add sizes array
    date: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  // Fetch product details
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${backend}/api/product/${id}`, {
        headers: { token },
      });
      setProduct(response.data.product); // Adjust based on your actual API response
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to fetch product details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id, token]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Toggle size selection
  const toggleSize = (size) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size) // Remove size if already selected
        : [...prev.sizes, size], // Add size if not selected
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${backend}/api/product/${id}`, product, {
        headers: { token },
      });
      toast.success("Product updated successfully!");
      navigate("/list");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen w-full p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Edit Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name || ""} // Ensure it's not undefined
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description || ""} // Ensure it's not undefined
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md h-40"
            required
          />
        </div>

        {/* Product Category and Subcategory */}
        <div className="flex justify-between items-center flex-col sm:flex-row md:gap-0 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Category
            </label>
            <select
              name="category"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              value={product.category || ""} // Ensure it's not undefined
              onChange={handleChange}
              required
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory
            </label>
            <select
              name="subCategory"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              value={product.subCategory || ""} // Ensure it's not undefined
              onChange={handleChange}
              required
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          {/* Product Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price || ""} // Ensure it's not undefined
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Product Sizes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Sizes
          </label>
          <div className="flex gap-4">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={`px-3 py-1 cursor-pointer rounded-md ${
                  product.sizes.includes(size)
                    ? "bg-slate-600 text-white"
                    : "bg-slate-200"
                }`}
                onClick={() => toggleSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="bestseller"
            checked={product.bestseller || false} // Ensure it's not undefined
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">Bestseller</label>
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Update Product
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default EditProduct;
