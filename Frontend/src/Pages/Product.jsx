import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import RelatedProduct from "../Components/relatedProduct";

function Product() {
  const { backend } = useContext(ShopContext);
  const { productID } = useParams();
  const { products, addtocart, token, navigate, darkmode } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productID]);

  const fetchProductData = () => {
    if (Array.isArray(products.products)) {
      const foundProduct = products.products.find((item) => item._id === productID);
      setProductData(foundProduct);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productID, products]);

  if (!productData) {
    return (
      <div className={`min-h-screen flex items-center justify-center  ${darkmode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className={`text-lg ${darkmode ? 'text-gray-300' : 'text-gray-600'}`}>Loading product...</p>
        </div>
      </div>
    );
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <>
      <div className={`min-h-screen ${darkmode ? 'bg-gray-900' : ''}`}>
        <div className="max-w-7xl mx-auto  pt-2 sm:pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:bg-white sm:p-2 rounded-md">
            {/* Image Gallery Section */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative group">
                <div className={`aspect-square rounded-2xl overflow-hidden ${darkmode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
                  <img
                    src={`${backend}/uploads/product/${productData.images[currentImageIndex]}`}
                    alt={productData.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-zoom-in"
                    onClick={openModal}
                  />

                  {/* Navigation Arrows */}
                  {productData.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Bestseller Badge */}
                  {productData.bestseller && (
                    <div className="absolute top-6 left-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                      ⭐ Bestseller
                    </div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {productData.images.length > 1 && (
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {productData.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${currentImageIndex === index
                            ? 'border-indigo-500 ring-2 ring-indigo-200'
                            : `border-transparent ${darkmode ? 'hover:border-gray-600' : 'hover:border-gray-300'}`
                          }`}
                      >
                        <img
                          src={`${backend}/uploads/product/${productData.images[index]}`}
                          alt={`${productData.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info Section */}
            <div className={`space-y-8 ${darkmode ? 'text-white' : 'text-gray-900'}`}>
              {/* Title and Price */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">{productData.name}</h1>

                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold text-indigo-600">৳{productData.price}</span>
                  {/* {productData.discount_price && (
                    <span className={`text-xl line-through ${darkmode ? 'text-gray-500' : 'text-gray-400'}`}>
                      ৳{productData.discount_price}
                    </span>
                  )} */}
                </div>

                {/* Product Meta */}
                <div className={`grid grid-cols-2 gap-4 p-6 rounded-xl ${darkmode ? 'bg-gray-800' : 'bg-[#ECFF8E]'}`}>
                  {productData.brand && (
                    <div>
                      <span className={`text-sm font-medium ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>Brand</span>
                      <p className="font-semibold">{productData.brand}</p>
                    </div>
                  )}

                  {productData.model && (
                    <div>
                      <span className={`text-sm font-medium ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>Model</span>
                      <p className="font-semibold">{productData.model}</p>
                    </div>
                  )}

                  {productData.ram && (
                    <div>
                      <span className={`text-sm font-medium ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>RAM</span>
                      <p className="font-semibold">{productData.ram} GB</p>
                    </div>
                  )}

                  {productData.rom && (
                    <div>
                      <span className={`text-sm font-medium ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>ROM</span>
                      <p className="font-semibold">{productData.rom} GB</p>
                    </div>
                  )}

                  {productData.storage && (
                    <div>
                      <span className={`text-sm font-medium ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>Storage</span>
                      <p className="font-semibold">{productData.storage} GB</p>
                    </div>
                  )}

                  {productData.processor && (
                    <div>
                      <span className={`text-sm font-medium ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>Processor</span>
                      <p className="font-semibold">{productData.processor}</p>
                    </div>
                  )}

                  {productData.display && (
                    <div>
                      <span className={`text-sm font-medium ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>Display</span>
                      <p className="font-semibold">{productData.display}</p>
                    </div>
                  )}

                  {productData.battery && (
                    <div>
                      <span className={`text-sm font-medium ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>Battery</span>
                      <p className="font-semibold">{productData.battery} mAh</p>
                    </div>
                  )}

                  {productData.os && (
                    <div>
                      <span className={`text-sm font-medium ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>OS</span>
                      <p className="font-semibold">{productData.os}</p>
                    </div>
                  )}
                </div>

              </div>

              {/* Size Selection */}
              {productData.sizes?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {productData.sizes.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setSize(item)}
                        className={`px-6 py-3 rounded-lg border-2 font-medium transition-all duration-200 ${item === size
                            ? 'border-indigo-500 bg-indigo-500 text-white shadow-lg'
                            : `border-gray-300 ${darkmode ? 'text-white hover:border-gray-500 hover:bg-gray-800' : 'text-gray-700 hover:border-gray-400 hover:bg-gray-50'}`
                          }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {productData.color?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {productData.color.map((c, index) => (
                      <button
                        key={index}
                        onClick={() => setColor(c)}
                        className={`px-6 py-3 rounded-lg border-2 font-medium transition-all duration-200 ${color === c
                            ? 'border-indigo-500 bg-indigo-500 text-white shadow-lg'
                            : `border-gray-300 ${darkmode ? 'text-white hover:border-gray-500 hover:bg-gray-800' : 'text-gray-700 hover:border-gray-400 hover:bg-gray-50'}`
                          }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                {token ? (
                  <div className="flex space-x-4">
                    <button
                      onClick={() => addtocart(productData._id, size, color)}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8" />
                      </svg>
                      Add to Cart
                    </button>
                    <button className={`px-6 py-4 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-all duration-200 ${darkmode ? 'hover:text-white' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Login to Purchase
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          {activeTab === "details" && (
            <div className={`py-4 ${darkmode ? 'bg-gray-800' : 'bg-white'} rounded-xl mt-6 shadow-lg`}>
              <div className="px-2">
                <h3 className={`text-2xl sm:pl-2 font-bold  ${darkmode ? 'text-white' : 'text-gray-900'}`}>Description</h3>
                <div className={`prose sm:p-4 p-0 rounded-lg max-w-none ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <p className="whitespace-pre-line text-sm leading-relaxed">{productData.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Full-Screen Image Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={`${backend}/uploads/product/${productData.images[currentImageIndex]}`}
                alt={productData.name}
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              {productData.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <RelatedProduct selectedCategories={productData.category} selectedTypes={productData.subcategory} />
    </>
  );
}

export default Product;