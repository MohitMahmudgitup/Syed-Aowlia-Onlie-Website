import  { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";

const FooterInput = ({ admintoken }) => {
      const { backend } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        companyName: "",
        description: "",
        address: "",
        email: "",
        phone: "",
        facebook: "",
        instagram: "",
        twitter: "",
        youtube: "",
        quickLinks: "",
        logo: null,
        paymentMethods: [],
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            if (name === "paymentMethods") {
                setFormData((prev) => ({
                    ...prev,
                    paymentMethods: [...prev.paymentMethods, ...Array.from(files)],
                }));
            } else {
                setFormData({ ...formData, [name]: files[0] });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const removePaymentImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            paymentMethods: prev.paymentMethods.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value) {
                if (key === "quickLinks") {
                    data.append(
                        key,
                        JSON.stringify(value.split(",").map((link) => link.trim()))
                    );
                } else if (key === "paymentMethods") {
                    value.forEach((file) => data.append("paymentMethods", file));
                } else {
                    data.append(key, value);
                }
            }
        });
        try {
            await axios.post(backend + "/api/footer", data, {    headers: { admintoken },    });
            toast.error("✅ Footer created successfully!");
        } catch (error) {
            toast.error("Error creating footer:", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 sm:p-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-xl border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 text-center">
                Add Footer Info
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        rows="4"
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    />
                </div>

                {/* Social Links */}
                <div className="space-y-3">
                    <h3 className="font-semibold text-gray-700">Social Links</h3>
                    {["facebook", "instagram", "twitter", "youtube"].map((platform) => (
                        <input
                            key={platform}
                            type="url"
                            name={platform}
                            placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                            value={formData[platform]}
                            onChange={handleChange}
                            className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                        />
                    ))}
                </div>

                {/* Uploads */}
                <div className="space-y-3">
                    <h3 className="font-semibold text-gray-700">Uploads</h3>

                    {/* Logo Upload */}
                    <label className="block text-gray-600">Logo:</label>
                    <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl"
                    />
                    {formData.logo && (
                        <div className="mt-2">
                            <img src={URL.createObjectURL(formData.logo)} alt="Logo Preview" className="h-20 sm:h-24 w-20 sm:w-24 object-contain border rounded-md shadow-sm" />
                        </div>
                    )}

                    {/* Payment Methods Upload */}
                    <label className="block text-gray-600 mt-4">
                        Payment Method Images (Multiple):
                    </label>
                    <input
                        type="file"
                        name="paymentMethods"
                        accept="image/*"
                        multiple
                        onChange={handleChange}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl"
                    />
                    {formData.paymentMethods.length > 0 && (
                        <div className="mt-2 flex gap-2 sm:gap-3 flex-wrap">
                            {formData.paymentMethods.map((file, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Payment Preview ${index + 1}`}
                                        className="h-16 sm:h-20 w-16 sm:w-20 object-contain border rounded-md shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removePaymentImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm hover:bg-red-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Links */}
                <div className="space-y-2">
                    <label className="block text-gray-600">Quick Links (comma-separated):</label>
                    <input
                        type="text"
                        name="quickLinks"
                        placeholder="Home, About, Contact"
                        value={formData.quickLinks}
                        onChange={handleChange}
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 sm:py-3 rounded-2xl font-semibold text-base sm:text-lg hover:from-purple-500 hover:to-blue-500 transition"
                >
                    Save Footer
                </button>
            </form>
        </div>
    );
};

export default FooterInput;
