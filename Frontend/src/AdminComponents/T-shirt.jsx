import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";

export const TshirtInput = ({ admintoken }) => {
  const { backend } = useContext(ShopContext);

  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [stock, setStock] = useState("");

  // 🧩 Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${backend}/api/category/getCategory`);
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, [backend]);

  // 🧩 Fetch Subcategories based on category
  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!category) return;
      try {
        const res = await axios.get(`${backend}/api/subcategory/getSubCategory`);
        const subCatData = res.data.categories;
        const result = subCatData.filter((p) => p.category._id === category);
        setSubCategories(result);
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      }
    };
    fetchSubCategories();
  }, [category, backend]);

  // 🧩 Handle Image Change
  const handleImageChange = (index, e) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  // 🧩 Toggle Sizes
  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  // 🧩 Submit Handler (with backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category || !subCategory || !price || !description) {
      alert("Please fill all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subcategory", subCategory);
    formData.append("price", price);
    formData.append("discount_price", discountPrice || price);
    formData.append("bestseller", bestseller);
    formData.append("stock", stock || 0);
    sizes.forEach((size) => formData.append("sizes", size));
    images.forEach((image) => {
      if (image) formData.append("images", image);
    });

    try {
      const res = await axios.post(`${backend}/api/product/add`, formData, {
        headers: { admintoken },
      });
      alert("T-shirt product added successfully!");
      console.log("✅ Response:", res.data);

      // Reset form
      setImages([null, null, null, null]);
      setName("");
      setDescription("");
      setCategory("");
      setSubCategory("");
      setPrice("");
      setDiscountPrice("");
      setSizes([]);
      setBestseller(false);
      setStock("");
    } catch (err) {
      console.error("❌ Error adding product:", err);
      alert("Failed to add T-shirt. Please check console.");
    }
  };

  return (
    <div className="flex items-center">
      <div className="bg-white md:p-8 rounded-lg w-full max-w-2xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <label key={index} htmlFor={`image${index + 1}`} className="relative cursor-pointer group">
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt={`Image ${index + 1}`}
                  className="w-24 h-24 object-cover border-2 border-gray-300 rounded-lg group-hover:opacity-80 transition duration-200 group-hover:scale-105"
                />
                <input
                  type="file"
                  id={`image${index + 1}`}
                  onChange={(e) => handleImageChange(index, e)}
                  hidden
                />
                {!image && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-semibold text-white bg-gray-800 px-2 py-1 rounded">
                      Upload
                    </span>
                  </div>
                )}
              </label>
            ))}
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Category, Subcategory, Price */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory *</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select Subcategory</option>
                {subCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (৳) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          {/* Discount & Stock */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount Price (৳)</label>
              <input
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
            <div className="flex gap-4 flex-wrap">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  className={`px-4 py-2 cursor-pointer rounded-lg text-sm font-semibold ${
                    sizes.includes(size)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 hover:bg-purple-200"
                  } transition duration-300`}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Bestseller */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={bestseller}
              onChange={() => setBestseller(!bestseller)}
              className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label className="ml-2 block text-sm font-medium text-gray-700">
              Add to Bestseller
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Add T-Shirt
          </button>
        </form>
      </div>
    </div>
  );
};
