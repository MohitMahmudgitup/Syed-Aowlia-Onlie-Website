import React, { useState } from "react";

const Computer = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ekhane data backend e pathate hobe
    alert("Gadget submitted!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Gadget</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Gadget Name */}
        <div>
          <label className="block mb-1 font-medium">Gadget Name</label>
          <input
            type="text"
            placeholder="Enter gadget name"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block mb-1 font-medium">Brand</label>
          <input
            type="text"
            placeholder="Enter brand"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Model */}
        <div>
          <label className="block mb-1 font-medium">Model</label>
          <input
            type="text"
            placeholder="Enter model"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price ($)</label>
          <input
            type="number"
            placeholder="Enter price"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Color */}
        <div>
          <label className="block mb-1 font-medium">Color</label>
          <input
            type="text"
            placeholder="Enter color"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Storage / RAM */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">RAM</label>
            <input
              type="text"
              placeholder="e.g. 8GB"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Storage</label>
            <input
              type="text"
              placeholder="e.g. 256GB"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            placeholder="Enter gadget description"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            rows="4"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Gadget
        </button>
      </form>
    </div>
  );
};

export default Computer;
