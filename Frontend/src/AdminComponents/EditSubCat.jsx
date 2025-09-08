import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";
import { ShopContext } from "../Context/ShopContext";

const EditSubCat = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const { backend } = useContext(ShopContext);

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get(`${backend}/api/subcategory/getSubCategory`);
      setSubCategories(res.data.categories);
    } catch (error) {
      console.log("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const handleEdit = (subCat) => {
    setEditId(subCat._id);
    setName(subCat.name);
  };

  const handleCancel = () => {
    setEditId(null);
    setName("");
    setImage(null);
  };

  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

      await axios.put(`${backend}/api/subcategory/updateSubCategory/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchSubCategories();
      handleCancel();
      alert("Subcategory updated successfully!");
    } catch (error) {
      console.log("Error updating subcategory:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await axios.delete(`${backend}/api/subcategory/deleteSubCategory/${id}`);
        fetchSubCategories();
        alert("Subcategory deleted successfully!");
      } catch (error) {
        console.log("Error deleting subcategory:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Subcategories</h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Category</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map((subCat) => (
              <tr key={subCat._id}>
                <td className="border px-4 py-2">
                  {editId === subCat._id ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border p-1 w-full"
                    />
                  ) : (
                    subCat.name
                  )}
                </td>
                <td className="border px-4 py-2">{subCat.category?.name}</td>
                <td className="border px-4 py-2 flex gap-2">
                  {editId === subCat._id ? (
                    <>
                      <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      <button
                        onClick={() => handleUpdate(subCat._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded flex items-center gap-1"
                      >
                        <FiSave /> Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-400 text-white px-2 py-1 rounded flex items-center gap-1"
                      >
                        <FiX /> Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(subCat)}
                        className="bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1"
                      >
                        <FiEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(subCat._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {subCategories.map((subCat) => (
          <div key={subCat._id} className="border p-4 rounded shadow bg-white">
            {editId === subCat._id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border p-1 w-full"
                />
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleUpdate(subCat._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded flex-1 flex items-center justify-center gap-1"
                  >
                    <FiSave /> Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-400 text-white px-2 py-1 rounded flex-1 flex items-center justify-center gap-1"
                  >
                    <FiX /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div>
                  <span className="font-semibold">Name: </span>
                  {subCat.name}
                </div>
                <div>
                  <span className="font-semibold">Category: </span>
                  {subCat.category?.name}
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(subCat)}
                    className="bg-blue-500 text-white px-2 py-1 rounded flex-1 flex items-center justify-center gap-1"
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(subCat._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded flex-1 flex items-center justify-center gap-1"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditSubCat;
