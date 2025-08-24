import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";
import { ShopContext } from "../Context/ShopContext";

const AdminCategory = ({ admintoken }) => {
    const { backend } = useContext(ShopContext);
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // SubCategory States
    const [subName, setSubName] = useState("");
    const [godata, setGodata] = useState();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [subMessage, setSubMessage] = useState("");
    const [subLoading, setSubLoading] = useState(false);

    // ✅ New state for subcategories
    const [subCategories, setSubCategories] = useState([]);

    // ✅ Fetch categories
    const fetchCategories = async () => {
        try {
            const res = await axios.get(
                backend + "/api/category/getCategory",
                { headers: { admintoken } }
            );
            setCategories(res.data.categories || []);
        } catch (err) {
            console.error("Error fetching categories", err);
        }
    };

    // ✅ Fetch subcategories
    const fetchSubCategories = async () => {
        try {
            const res = await axios.get(
                backend + "/api/subcategory/getSubCategory",
                { headers: { admintoken } }
            );
            setSubCategories(res.data.categories || []);
        } catch (err) {
            console.error("Error fetching subcategories", err);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchSubCategories();
    }, [admintoken]);

    // ✅ Create Category
    const handleSubmitCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("image", image);

            const res = await axios.post(
                backend + "/api/category/createCategory",
                formData,
                { headers: { admintoken } }
            );

            if (res.data) {
                setGodata(res.data.category);
                setMessage("✅ Category created successfully!");
                setName("");
                setImage(null);
                fetchCategories();
            } else {
                setMessage("⚠️ Something went wrong!");
            }
        } catch (err) {
            console.error(err);
            setMessage("❌ Error creating category!");
        } finally {
            setLoading(false);
        }
    };
    console.log(selectedCategory)

    // ✅ Create SubCategory
    const handleSubmitSubCategory = async (e) => {
        e.preventDefault();
        setSubLoading(true);
        setSubMessage("");
        try {
            const res = await axios.post(
                backend + "/api/subcategory/createSubCategory",
                {
                    name: subName,
                    category: godata._id,
                },
                { headers: { admintoken } }
            );

            if (res.data) {
                setSubMessage("✅ SubCategory created successfully!");
                setSubName("");
                setSelectedCategory("");
                fetchSubCategories(); // refresh subcategory list
            } else {
                setSubMessage("⚠️ Something went wrong!");
            }
        } catch (err) {
            console.error(err);
            setSubMessage("❌ Error creating subcategory!");
        } finally {
            setSubLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br p-4">
            {/* Stats Cards */}
            <div className="flex flex-wrap gap-4 mb-6">
                {/* Total Categories */}
                <div
                    className="w-52 gap-2 px-3 shadow-md flex  items-center justify-between py-3 rounded-xl"
                    style={{
                        background:
                            "linear-gradient(20deg, rgba(0, 157, 189, 1) 0%, rgba(17, 144, 255, 1) 50%, rgba(237, 221, 83, 1) 100%)",
                    }}
                >
                    <div>
                        <p className="text-lg text-white">Categories</p>
                        <div className="text-4xl text-white font-semibold">
                            {categories.length}
                        </div>

                    </div>
                    <BiSolidCategoryAlt size={34} color="white" />
                </div>

                {/* ✅ Total SubCategories */}

                <div
                    className="w-52 gap-2 px-3 shadow-md flex  items-center justify-between py-3 rounded-xl"
                    style={{
                        background:
                            "linear-gradient(20deg, rgba(255, 99, 71, 1) 0%, rgba(255, 159, 64, 1) 50%, rgba(255, 205, 86, 1) 100%)",
                    }}
                >
                    <div>
                        <p className="text-lg text-white">SubCategories</p>
                        <div className="text-4xl text-white font-semibold">
                            {subCategories.length}
                        </div>

                    </div>
                    <MdOutlineCategory size={34} color="white" />
                </div>


            </div>

            {/* Forms */}
            <div className="flex flex-col md:flex-row mt-2 gap-6">
                {/* Category Form */}
                {!godata && (
                    <div className="bg-white shadow-lg rounded-2xl p-6 w-96 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 ">
                            Create Category
                        </h2>
                        <form onSubmit={handleSubmitCategory} className="space-y-5">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                                    placeholder="Enter category name"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Category Image</label>

                                <label className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-black transition-colors duration-300 bg-gray-50">
                                    {image ? (
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="Preview"
                                            className="h-full object-contain"
                                        />
                                    ) : (
                                        <span className="text-gray-400">Click to upload image</span>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        className="hidden"
                                        required
                                    />
                                </label>
                            </div>


                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
                            >
                                {loading ? "Creating..." : "Create Category"}
                            </button>
                        </form>
                        {message && (
                            <p className="mt-4 text-center text-sm font-medium text-gray-700">
                                {message}
                            </p>
                        )}
                    </div>
                )}

                {/* SubCategory Form */}
                {godata && (
                    <div className="bg-white shadow-lg rounded-2xl p-6 w-96 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                            Create SubCategory
                        </h2>
                        <form onSubmit={handleSubmitSubCategory} className="space-y-5">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    SubCategory Name
                                </label>
                                <input
                                    type="text"
                                    value={subName}
                                    onChange={(e) => setSubName(e.target.value)}
                                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                                    placeholder="Enter subcategory name"
                                    required
                                />
                            </div>

                            <div>
                                <h1 className="text-sm">Category name : <span className="text-sm text-gray-500">{godata.name}</span></h1>
                            </div>

                            <button
                                type="submit"
                                disabled={subLoading}
                                className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
                            >
                                {subLoading ? "Creating..." : "Create SubCategory"}
                            </button>
                        </form>
                        {subMessage && (
                            <p className="mt-4 text-center text-sm font-medium text-gray-700">
                                {subMessage}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCategory;
