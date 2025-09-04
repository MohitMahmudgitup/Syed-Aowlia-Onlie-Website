import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const Editcat = () => {
    const [categories, setCategories] = useState([]);
    const [editCategory, setEditCategory] = useState(null);
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [deleteId, setDeleteId] = useState(null); // store category to delete
    const { backend } = useContext(ShopContext);

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${backend}/api/category/getCategory`);
            setCategories(res.data.categories);
        } catch (err) {
            console.error("Error fetching categories", err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Update category
    const handleUpdate = async (id) => {
        const formData = new FormData();
        formData.append("name", name);
        if (image) formData.append("image", image);

        try {
            await axios.put(`${backend}/api/category/updateCategory/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Category updated successfully");
            setEditCategory(null);
            setName("");
            setImage(null);
            fetchCategories();
        } catch (err) {
            console.error("Error updating category", err);
        }
    };

    // Delete category
    const handleDelete = async () => {
        try {
            await axios.delete(`${backend}/api/category/DeleteCategory/${deleteId}`);
            alert("Category deleted successfully");
            setDeleteId(null); // close modal
            fetchCategories();
        } catch (err) {
            console.error("Error deleting category", err);
        }
    };

    return (
        <div className="p-4 sm:p-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8 ">
                <h1 className="sm:text-3xl text-xl  font-bold  text-gray-900 ">
                    Manage Categories
                </h1>
                <Link to={"/adminPages/category"} className="text-decoration-none">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-1 shadow-sm">
                        go back
                    </button>
                </Link>

            </div>


            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((cat) => (
                    <div
                        key={cat._id}
                        className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center sm:items-start justify-between hover:shadow-xl transition duration-300 border"
                    >
                        {/* Category Info */}
                        {editCategory === cat._id ? (
                            <div className="flex flex-col gap-4 w-full">
                                {/* Name Input */}
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border p-2 rounded-lg w-full"
                                    placeholder="Enter category name"
                                />

                                {/* Image Input */}
                                <input
                                    type="file"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="w-full"
                                />

                                {/* Actions */}
                                <div className="flex gap-3 mt-3">
                                    <button
                                        onClick={() => handleUpdate(cat._id)}
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 shadow-sm"
                                    >
                                        <FiSave /> Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditCategory(null);
                                            setName("");
                                            setImage(null);
                                        }}
                                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-1 shadow-sm"
                                    >
                                        <FiX /> Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                                    <img
                                        src={`${backend}/uploads/category/${cat.image}`}
                                        alt={cat.name}
                                        className="w-20 h-20 rounded-xl object-cover border"
                                    />
                                    <span className="font-semibold text-xl text-gray-700 text-center sm:text-left">
                                        {cat.name}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 mt-4 sm:mt-2 justify-center sm:justify-end w-full">
                                    <button
                                        onClick={() => {
                                            setEditCategory(cat._id);
                                            setName(cat.name);
                                        }}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 shadow-sm"
                                    >
                                        <FiEdit /> Edit
                                    </button>
                                    <button
                                        onClick={() => setDeleteId(cat._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 shadow-sm"
                                    >
                                        <FiTrash2 /> Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                ))}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Are you sure you want to delete this category?
                        </h2>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setDeleteId(null)}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg shadow-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Editcat;
