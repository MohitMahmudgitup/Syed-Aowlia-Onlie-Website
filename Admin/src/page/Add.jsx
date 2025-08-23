import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Combobox component implementation (basic)
const Combobox = ({ value, onChange, multiple, children }) => {
  return <div className="relative">{children}</div>;
};

Combobox.Input = ({ className, placeholder, onChange, displayValue }) => (
  <input
    type="text"
    className={className}
    placeholder={placeholder}
    onChange={onChange}
  />
);

Combobox.Options = ({ className, children }) => (
  <div className={className}>{children}</div>
);

Combobox.Option = ({ value, className, children }) => (
  <div className={className} data-value={value}>
    {typeof children === "function" ? children({ selected: false, active: false }) : children}
  </div>
);

const colors = [
  "red","blue","black","green","white","yellow","orange","pink","purple","brown",
  "gray","violet","indigo","turquoise","teal","magenta","cyan","lime","maroon","navy",
  "olive","silver","gold","beige","coral","lavender","mint","peach","salmon","khaki",
  "crimson","amber","apricot","plum","orchid","sienna","tan","chocolate","mustard","rose",
  "emerald","aquamarine","fuchsia","cerulean","jade","scarlet","periwinkle","charcoal","azure","ivory",
  "bronze","burgundy","cobalt","cream","denim","eggplant","flax","garnet","honey","ice",
  "mahogany","mauve","navyblue","ochre","onyx","pearl","quartz","ruby","sand","sepia",
  "smoke","snow","tangerine","taupe","topaz","umber","vermilion","wheat","wine","zinc"
];

const Gadget = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    price: "",
    description: ""
  });
  const [images, setImages] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [query, setQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const mockCategories = [
        { id: 1, name: "Electronics" },
        { id: 2, name: "Mobile Phones" },
        { id: 3, name: "Laptops" },
        { id: 4, name: "Gaming" },
        { id: 5, name: "Audio" }
      ];
      setCategories(mockCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredColors =
    query === ""
      ? colors.slice(0, 10)
      : colors.filter((color) => color.toLowerCase().includes(query.toLowerCase())).slice(0, 10);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleColorSelect = (color) => {
    if (!selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color]);
      toast.success(`${color} added to colors`);
    }
    setQuery("");
    setShowOptions(false);
  };

  const removeColor = (colorToRemove) => {
    setSelectedColors(selectedColors.filter((c) => c !== colorToRemove));
    toast.info(`${colorToRemove} removed from colors`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.brand || !formData.price) {
      toast.error("Please fill in all required fields (Name, Brand, Price)");
      return;
    }

    const gadgetData = {
      ...formData,
      colors: selectedColors,
      images: images.map((img) => img.file),
      timestamp: new Date().toISOString()
    };

    console.log("Gadget Data:", gadgetData);
    toast.success(`Gadget "${formData.name}" submitted successfully!`);

    setFormData({ name: "", brand: "", model: "", price: "", description: "" });
    setSelectedColors([]);
    setImages([]);
    setQuery("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Add New Gadget</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label className="block mb-1 font-medium text-gray-700">Gadget Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter gadget name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
              required
            />
          </div>
          <div className="w-full">
            <label className="block mb-1 font-medium text-gray-700">Brand *</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              placeholder="Enter brand"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
              required
            />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <label className="block mb-1 font-medium text-gray-700">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              placeholder="Enter model"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
            />
          </div>
          <div className="w-full">
            <label className="block mb-1 font-medium text-gray-700">Price (৳) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
              required
            />
          </div>
        </div>

        {/* Color Selection */}
        <div className="w-full">
          <label className="block mb-1 font-medium text-gray-700">Colors</label>
          <div className="relative">
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedColors.map((color) => (
                <span
                  key={color}
                  className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm capitalize"
                >
                  <div
                    className="w-3 h-3 rounded-full mr-2 border border-gray-300"
                    style={{ backgroundColor: color === "white" ? "#f9fafb" : color }}
                  ></div>
                  {color}
                  <button
                    type="button"
                    className="ml-2 text-blue-600 hover:text-blue-900 font-bold text-lg leading-none"
                    onClick={() => removeColor(color)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
              placeholder="Type to search colors..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowOptions(true);
              }}
              onFocus={() => setShowOptions(true)}
              onBlur={() => setTimeout(() => setShowOptions(false), 200)}
            />
            {showOptions && filteredColors.length > 0 && (
              <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {filteredColors.map((color) => (
                  <div
                    key={color}
                    className="cursor-pointer px-3 py-2 hover:bg-blue-50 flex items-center capitalize"
                    onClick={() => handleColorSelect(color)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <div
                      className="w-4 h-4 rounded-full mr-3 border border-gray-300"
                      style={{ backgroundColor: color === "white" ? "#f9fafb" : color }}
                    ></div>
                    {color}
                    {selectedColors.includes(color) && (
                      <span className="ml-auto text-blue-600 font-semibold">✓</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter gadget description"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition resize-vertical"
            rows="4"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {images.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img.preview}
                    alt={`Preview ${index}`}
                    className="w-32 h-32 object-cover rounded-lg border border-gray-300 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 text-red-600 hover:text-red-800 font-bold bg-white rounded-full p-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium text-lg shadow-md hover:shadow-lg"
        >
          Add Gadget
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default Gadget;
