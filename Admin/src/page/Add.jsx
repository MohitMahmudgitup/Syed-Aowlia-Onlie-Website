import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backend } from '../App';
import { toast } from 'react-toastify';

export default function Add({ token }) {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle image change for product images
  const handleImageChange = (index, e) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  // Handle size toggle
  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size)); // Remove if already selected
    } else {
      setSizes([...sizes, size]); // Add if not selected
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    images.forEach((image, index) => {
      if (image) {
        formData.append(`image${index + 1}`, image);
      }
    });
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('subcategory', subCategory);
    formData.append('price', price);
    formData.append('sizes', JSON.stringify(sizes)); // Send sizes as a comma-separated string
    formData.append('bestseller', bestseller);

    try {
      const response = await axios.post(backend + "/api/product/add", formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Product added successfully!');
        // Reset form fields
        setImages([null, null, null, null]);
        setName('');
        setDescription('');
        setCategory('Men');
        setSubCategory('Topwear');
        setPrice('');
        setSizes([]);
        setBestseller(false);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding product';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  md:p-8">
      <div className="bg-white md:p-8 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl md:text-4xl font-bold md:text-center text-gray-800 mb-8">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image upload */}
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
                    <span className="text-xs font-semibold text-white bg-gray-800 px-2 py-1 rounded">Upload</span>
                  </div>
                )}
              </label>
            ))}
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Product Category and Subcategory */}
          <div className="flex justify-between flex-col sm:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Category</label>
              <select
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category</label>
              <select
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            {/* Product Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Price(৳)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          {/* Product Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Sizes</label>
            <div className="flex gap-4">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <div
                  key={size}
                  className={`px-4 py-2 cursor-pointer rounded-lg text-sm font-semibold ${
                    sizes.includes(size) ? 'bg-purple-600 text-white' : 'bg-gray-200'
                  } hover:bg-purple-500 transition duration-300`}
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
            <label className="ml-2 block text-sm font-medium text-gray-700">Add to Bestseller</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}
