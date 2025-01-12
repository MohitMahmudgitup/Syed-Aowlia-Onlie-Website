import React from 'react';
import { MdClose } from 'react-icons/md';

function ProductDetailModal({ product, onClose }) {
  if (!product) return null; // Return null if no product is selected

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <button onClick={onClose}>
            <MdClose className="text-gray-600 hover:text-black " />
          </button>
        </div>
        
        {/* Display all product images */}
        <div className="flex overflow-x-auto mb-4 scrollbar-custom">
          {product.images && product.images.length > 0 ? (
            product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} image ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg mr-2" // Adjust size and spacing as needed
              />
            ))
          ) : (
            <img
              src='https://via.placeholder.com/150'
              alt='No images available'
              className="w-32 h-32 object-cover rounded-lg mr-2"
            />
          )}
        </div>

        <p className="text-lg font-semibold">Price: ৳{product.price}</p>
        <p className="text-sm text-gray-500">Category: {product.category}</p>
        <p className="text-sm text-gray-500">Subcategory: {product.subcategory}</p>
        <p className="text-sm text-gray-500">Bestseller: {product.bestseller ? 'Yes' : 'No'}</p>
        <p className="text-sm text-gray-500">Date Added: {new Date(product.date).toLocaleDateString()}</p>
        
        <div className='mt-4 bg-gray-200 p-1 rounded-t-xl'>
        <p className="text-black text-lg font-semibold">Description:</p>
        <div className='overflow-y-scroll h-40 scrollbar-custom'>
        <p className=" text-gray-600 text-sm">{product.description}</p> 
        </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;
