import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import RelatedProduct from "../Components/relatedProduct";

function Product() {
    const { productID } = useParams();
    const { products, addtocart, token, navigate, darkmode } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState("details");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [size, setSize] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [productID]);

    const fetchProductData = () => {
        if (Array.isArray(products.products)) {
            const foundProduct = products.products.find((item) => item._id === productID);
            if (foundProduct) {
                setProductData(foundProduct);
            }
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [productID, products]);

    if (!productData) {
        return <div className="text-center text-gray-500">Loading product data...</div>;
    }

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? productData.images.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === productData.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={`container mx-auto my-10 p-5 rounded-lg  ${darkmode ? '' : 'bg-white shadow-lg'}`}>
                <div className="flex flex-col lg:flex-row">
                    {/* Image Gallery */}
                    <div className="lg:w-1/2">
                        <div className="relative">
                            <img
                                src={productData.images[currentImageIndex]}
                                alt={productData.name}
                                className="w-full h-80 object-cover rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 cursor-pointer"
                                onClick={openModal}
                            />
                            {/* Navigation buttons */}
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
                            >
                                &#8249;
                            </button>
                            <button
                                onClick={handleNextImage}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
                            >
                                &#8250;
                            </button>
                            <div className="flex justify-center mt-2">
                                {productData.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-3 h-3 mx-1 rounded-full ${currentImageIndex === index ? 'bg-gray-800' : 'bg-gray-300'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className={`lg:w-1/2 lg:pl-10 mt-4 lg:mt-0 ${darkmode ? 'text-white' : 'text-gray-800'}`}>
                        <h2 className="text-4xl font-bold mb-2">{productData.name}</h2>
                        <p className="text-2xl font-semibold my-2">${productData.price}</p>
                        <p>Select Size</p>
                        <div className="flex flex-wrap space-x-2 my-2">
                            {productData.sizes.map((item, index) => (
                                <span
                                    key={index}
                                    onClick={() => setSize(item)}
                                    className={`${
                                        item === size ? "bg-gray-200" : ""
                                    } border cursor-pointer border-gray-300 rounded-md px-3 py-1 text-gray-700 hover:bg-gray-200 transition ${darkmode ? 'text-white hover:text-black' : 'text-gray-800'}`}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>

                        {token ? (
                            <button onClick={() => addtocart(productData._id, size)} className={`mt-4 w-full font-semibold py-3 rounded-lg transition ${darkmode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-black text-white hover:bg-gray-500'}`}>
                                Add to Cart
                            </button>
                        ) : (
                            <button onClick={() => navigate("/login")} className={`mt-4 w-full font-semibold py-3 rounded-lg transition ${darkmode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-black text-white hover:bg-gray-500'}`}>
                                Please login...
                            </button>
                        )}

                        {productData.bestseller && (
                            <div className="mt-2 flex items-center bg-green-100 text-green-800 font-bold px-2 py-1 rounded-full">
                                <span className="mr-1">😲🌟</span>
                                <span>Bestseller</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tabs for product details */}
                <div className="mt-6">
                    <div className="flex space-x-4 border-b border-gray-300">
                        <button
                            className={`py-2 px-4 ${activeTab === "details" ? "font-bold border-b-2 border-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}
                            onClick={() => setActiveTab("details")}
                        >
                            Details
                        </button>
                        <button
                            className={`py-2 px-4 ${activeTab === "reviews" ? "font-bold border-b-2 border-indigo-600" : "text-gray-600 hover:text-indigo-600"}`}
                            onClick={() => setActiveTab("reviews")}
                        >
                            Reviews
                        </button>
                    </div>

                    {activeTab === "details" && (
                        <div className="mt-4">
                            <h3 className="text-2xl font-semibold">Product Description</h3>
                            <p>{productData.description}</p>
                        </div>
                    )}

                    {activeTab === "reviews" && (
                        <div className="mt-4">
                            <h3 className="text-2xl font-semibold">Customer Reviews</h3>
                            <p>No reviews available for this product yet.</p>
                        </div>
                    )}
                </div>

                {/* Modal for Full-Screen Image */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-white text-2xl">
                            &times;
                        </button>
                        <div className="relative">
                            <img
                                src={productData.images[currentImageIndex]}
                                alt={productData.name}
                                className="max-w-full max-h-screen object-contain"
                            />
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
                            >
                                &#8249;
                            </button>
                            <button
                                onClick={handleNextImage}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
                            >
                                &#8250;
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <RelatedProduct selectedCategories={productData.category} selectedTypes={productData.subcategory} />
        </>
    );
}

export default Product;
