import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";

const Gadget = ({ admintoken }) => {
    const { backend } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    price: "",
    description: "",
    category: "",
    subcategory: "",
  });
  const [images, setImages] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [query, setQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  // console.log(subCategories)
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

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(backend + "/api/category/getCategory");
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch subcategories
  const fetchSubCategories = async () => {
    // console.log(categoryId)
    try {
      const res = await axios.get(backend + "/api/subcategory/getSubCategory");
      const subCatData = res.data.categories;
      setSubCategories(subCatData);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubCategories(formData.category);
    setFormData((prev) => ({ ...prev, subcategory: "" })); // reset subcategory
  }, [formData.category]);

  const filteredColors =
    query === ""
      ? colors.slice(0, 10)
      : colors.filter((c) => c.toLowerCase().includes(query.toLowerCase())).slice(0, 10);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleColorSelect = (color) => {
    if (!selectedColors.includes(color)) setSelectedColors([...selectedColors, color]);
    setQuery("");
    setShowOptions(false);
  };

  const removeColor = (colorToRemove) => {
    setSelectedColors(selectedColors.filter((c) => c !== colorToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.brand || !formData.price || !formData.category ) {
      alert("Please fill all required fields.");
      return;
    }

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => formDataObj.append(key, value));
    selectedColors.forEach((color) => formDataObj.append("color", color));
    images.forEach((img) => formDataObj.append("images", img.file));

    try {
      const res = await axios.post(
        backend + "/api/product/add",
        formDataObj,
        { headers: { admintoken } }
      );
      alert("Product added successfully!");
      console.log("Response:", res.data);

      setFormData({ name: "", brand: "", model: "", price: "", description: "", category: "", subcategory: "" });
      setSelectedColors([]);
      setImages([]);
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err);
      alert("Failed to add product. Make sure subcategory is valid.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Add New Gadget</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name + Brand */}
        <div className="flex gap-4">
          <div className="w-full">
            <label className="block mb-1 font-medium">Gadget Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" required />
          </div>
          <div className="w-full">
            <label className="block mb-1 font-medium">Brand *</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" required />
          </div>
        </div>

        {/* Model + Price */}
        <div className="flex gap-4">
          <div className="w-full">
            <label className="block mb-1 font-medium">Model</label>
            <input type="text" name="model" value={formData.model} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div className="w-full">
            <label className="block mb-1 font-medium">Price (৳) *</label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" required />
          </div>
        </div>

<div className="flex gap-4">

          {/* Category */}
        <div className="w-full">
          <label className="block mb-1 font-medium">Category *</label>
          <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" required>
            <option value="">Select category</option>
            {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
          </select>
        </div>

        {/* Subcategory */}
        <div className="w-full">
          <label className="block mb-1 font-medium">Subcategory *</label>
          <select name="subcategory" value={formData.subcategory} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" >
            <option value="">Select subcategory</option>
            {subCategories.map((sub) => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
          </select>
        </div>


</div>



        {/* Colors */}
        <div className="w-full">
          <label className="block mb-1 font-medium">Colors</label>
          <div className="relative">
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedColors.map((color) => (
                <span key={color} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm capitalize">
                  <div className="w-3 h-3 rounded-full mr-2 border" style={{ backgroundColor: color }}></div>
                  {color}
                  <button type="button" onClick={() => removeColor(color)} className="ml-2 text-red-500">×</button>
                </span>
              ))}
            </div>
            <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="Type to search colors..." value={query} onChange={(e) => { setQuery(e.target.value); setShowOptions(true); }} onFocus={() => setShowOptions(true)} onBlur={() => setTimeout(() => setShowOptions(false), 200)} />
            {showOptions && filteredColors.length > 0 && (
              <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredColors.map((color) => (
                  <div key={color} className="px-3 py-2 cursor-pointer hover:bg-blue-50 flex items-center capitalize" onClick={() => handleColorSelect(color)} onMouseDown={(e) => e.preventDefault()}>
                    <div className="w-4 h-4 rounded-full mr-3 border" style={{ backgroundColor: color }}></div>
                    {color}
                    {selectedColors.includes(color) && <span className="ml-auto text-blue-600">✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
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
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Add Gadget</button>
      </form>
    </div>
  );
};

export default Gadget;
