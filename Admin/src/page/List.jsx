import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backend } from '../App';  // Ensure backend URL is updated if necessary
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { MdEdit, MdDelete, MdLocalSee } from "react-icons/md";
import ProductDetailModal from './ProductDetailModal'; // Import the modal
import Skeleton from 'react-loading-skeleton'; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Import Skeleton CSS

function List({ token }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReversed, setIsReversed] = useState(false); // State to manage sorting direction
  const [selectedProduct, setSelectedProduct] = useState(null); // State to manage selected product

  // Fetch products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backend}/api/product`, {
          headers: { token },
        });
        setProducts(response.data.products || []); 
        setIsLoading(false); // Access products array correctly
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products.');
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchProducts();
    } else {
      console.error('Token is missing!');
      setIsLoading(false);
    }
  }, [token]);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${backend}/api/product/${productId}`, {
          headers: { token },
        });
        // Remove the deleted product from the state
        setProducts(products.filter(product => product._id !== productId));
        toast.success('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      }
    }
  };

  const toggleSortOrder = () => {
    setIsReversed(!isReversed); // Toggle the sort order
  };

  // Sort products based on isReversed state
  const sortedProducts = isReversed ? [...products].reverse() : products;

  return (
    <div className="min-h-screen py-4 md:p-4 relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Product List</h2>

      {/* Button to toggle sort order */}
      <button
        onClick={toggleSortOrder}
        className="mb-4 bg-black text-white px-4 py-2 rounded-md transition duration-300 absolute right-0"
      >
        {isReversed ? 'Show Original Order' : 'Show Reversed Order'}
      </button>

      {isLoading ? (
        <div className="flex flex-col mt-20 overflow-y-scroll md:h-[72vh]">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex bg-gray-100 mt-1 rounded-xl p-3">
              <Skeleton circle={true} height={64} width={64} className="mr-4" />
              <div className="flex-grow px-4">
                <Skeleton height={20} className="mb-2" />
                <Skeleton height={14} className="mb-1" />
                <Skeleton height={12} />
              </div>
            </div>
          ))}
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="text-center">No products found.</div>
      ) : (
        <div className="flex flex-col mt-20 overflow-y-scroll md:h-[72vh]">
          {sortedProducts.map((product) => (
            <div key={product._id} className="flex bg-gray-100 mt-1 rounded-xl p-3">
              <img 
                src={product.images?.[0] || 'https://via.placeholder.com/150'} 
                alt={product.name} 
                className="w-16 h-16 object-cover rounded-xl" 
              />
              <div className="flex-grow px-4">
                <h3 className="text-sm font-bold">{product.name}</h3>
                <p className="text-gray-800 font-semibold">৳{product.price}</p>
                <p className="text-sm text-gray-500">Date Added: {new Date(product.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedProduct(product)} // Set selected product for modal
                  className="text-blue-500 hover:underline"
                  title="View product details"
                >
                  <MdLocalSee />
                </button>
                <Link title="Edit product" to={`/products/edit/${product._id}`}>
                  <MdEdit />
                </Link>
                <button 
                  onClick={() => handleDelete(product._id)} 
                  className="flex gap-2 items-center bg-red-500 text-white px-2 py-1 rounded"
                >
                  <MdDelete />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <ToastContainer /> {/* Include ToastContainer for notifications */}

      {/* Modal for product details */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} // Close the modal
        />
      )}
    </div>
  );
}

export default List;
