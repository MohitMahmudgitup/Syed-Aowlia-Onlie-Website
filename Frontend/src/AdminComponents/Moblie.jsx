import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";

const Moblie = ({ admintoken }) => {
  const { backend } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    price: "",
    discount_price: "",
    stock: "",
    category: "",
    subcategory: "",
    bestseller: "false",
    description: "",
    ram: "",
    rom: "",
    storage: "",
    processor: "",
    display: "",
    battery: "",
    os: "",
  });

  const [images, setImages] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [query, setQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const colors = [
    "red", "blue", "black", "green", "white", "yellow", "orange", "pink",
    "purple", "brown", "gray", "violet", "indigo", "turquoise", "teal"
  ];

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(backend + "/api/category/getCategory");
      setCategories(res.data.categories || []);
    } catch (err) {
      toast.error(err);
    }
  };

  // Fetch subcategories based on selected category
  const fetchSubCategories = async () => {
    try {
      const res = await axios.get(backend + "/api/subcategory/getSubCategory");
      const subCatData = res.data.categories;
      const result = subCatData.filter((p) => p.category._id === formData.category);
      setSubCategories(result);
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => { fetchCategories(); }, []);
  useEffect(() => { fetchSubCategories(); setFormData(prev => ({ ...prev, subcategory: "" })); }, [formData.category]);

  const filteredColors =
    query === "" ? colors.slice(0, 10) : colors.filter(c => c.toLowerCase().includes(query.toLowerCase())).slice(0, 10);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({ file, preview: URL.createObjectURL(file) }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleColorSelect = (color) => {
    if (!selectedColors.includes(color)) setSelectedColors([...selectedColors, color]);
    setQuery(""); setShowOptions(false);
  };

  const removeColor = (color) => setSelectedColors(selectedColors.filter(c => c !== color));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.brand || !formData.price || !formData.category) {
      alert("Please fill all required fields.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    selectedColors.forEach(color => data.append("color", color));
    images.forEach(img => data.append("images", img.file));

    try {
      const res = await axios.post(backend + "/api/product/add", data, { headers: { admintoken } });
      alert("Mobile product added successfully!");
      setFormData({
        name: "", brand: "", model: "", price: "", discount_price: "", stock: "",
        category: "", subcategory: "", bestseller: "false", description: "",
        ram: "", rom: "", storage: "", processor: "", display: "", battery: "", os: ""
      });
      setSelectedColors([]);
      setImages([]);
    } catch (err) {
      alert("Failed to add mobile product.");
    }
  };

  return (
    <div className="max-w-2xl bg-white shadow-lg rounded-2xl p-6">
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name + Brand */}
        <div className="flex gap-4">
          <div className="w-full">
            <label className="block mb-1 font-medium">Mobile Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" required />
          </div>
          <div className="w-full">
            <label className="block mb-1 font-medium">Brand *</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" required />
          </div>
        </div>

        {/* Model + Price + Discount */}
        <div className="flex gap-4">
          <div className="w-full">
            <label className="block mb-1 font-medium">Model</label>
            <input type="text" name="model" value={formData.model} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div className="w-full">
            <label className="block mb-1 font-medium">Price (৳) *</label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" required />
          </div>
          <div className="w-full">
            <label className="block mb-1 font-medium text-red-600">Discount Price (৳)</label>
            <input type="number" name="discount_price" value={formData.discount_price} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>

        {/* Category + Subcategory */}
        <div className="flex gap-4">
          <div className="w-full">
            <label className="block mb-1 font-medium">Category *</label>
            <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" required>
              <option value="">Select category</option>
              {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
            </select>
          </div>
          {subCategories.length > 0 &&
            <div className="w-full">
              <label className="block mb-1 font-medium">Subcategory</label>
              <select name="subcategory" value={formData.subcategory} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2">
                <option value="">Select subcategory</option>
                {subCategories.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
              </select>
            </div>
          }
        </div>

        {/* Colors */}
        <div>
          <label className="block mb-1 font-medium">Colors</label>
          <div className="relative">
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedColors.map(color => (
                <span key={color} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm capitalize">
                  <div className="w-3 h-3 rounded-full mr-2 border" style={{ backgroundColor: color }}></div>
                  {color} <button type="button" onClick={() => removeColor(color)} className="ml-2 text-red-500">×</button>
                </span>
              ))}
            </div>
            <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="Type to search colors..." value={query} onChange={(e) => { setQuery(e.target.value); setShowOptions(true); }} onFocus={() => setShowOptions(true)} onBlur={() => setTimeout(() => setShowOptions(false), 200)} />
            {showOptions && filteredColors.length > 0 && (
              <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredColors.map(color => (
                  <div key={color} className="px-3 py-2 cursor-pointer hover:bg-blue-50 flex items-center capitalize" onMouseDown={(e) => e.preventDefault()} onClick={() => handleColorSelect(color)}>
                    <div className="w-4 h-4 rounded-full mr-3 border" style={{ backgroundColor: color }}></div>
                    {color} {selectedColors.includes(color) && <span className="ml-auto text-blue-600">✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bestseller + Stock */}
        <div className="flex gap-4">
          <div className="w-full">
            <label className="block mb-1 font-medium">Bestseller</label>
            <select name="bestseller" value={formData.bestseller} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2">
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block mb-1 font-medium">Stock *</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" required />
          </div>
        </div>

        {/* Additional Mobile Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["ram", "rom", "storage", "processor", "display", "battery", "os"].map(field => (
            <div className="w-full " key={field}>
              <label className="block mb-1 font-medium">{field.toUpperCase()}</label>
              <input type={["ram", "rom", "storage", "battery"].includes(field) ? "number" : "text"} name={field} value={formData[field]} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
            </div>
          ))}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" rows="4"></textarea>
        </div>

        {/* Images */}
        <div>
          <label className="block mb-1 font-medium">Upload Images</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full border rounded-lg px-3 py-2" />
          {images.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img.preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
                  <button type="button" onClick={() => setImages(images.filter((_, index) => index !== i))} className="absolute top-1 right-1 text-red-600 bg-white rounded-full px-2">×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Add Mobile</button>
      </form>
    </div>
  );
};

export default Moblie;
