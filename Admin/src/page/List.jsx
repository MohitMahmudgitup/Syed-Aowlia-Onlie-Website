import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backend } from '../App'; // Ensure this points to your backend URL
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEdit, MdDelete, MdLocalSee } from "react-icons/md";
import ProductDetailModal from './ProductDetailModal';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function List({ token }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReversed, setIsReversed] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // Track deleting product

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backend}/api/product`, {
          headers: { token },
        });
        setProducts(response.data?.products || []);
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
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      setDeletingId(productId);
      await axios.delete(`${backend}/api/product/${productId}`, {
        headers: { token },
      });
      setProducts(products.filter(product => product._id !== productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setDeletingId(null);
    }
  };

  const toggleSortOrder = () => setIsReversed(!isReversed);

  const sortedProducts = [...products].sort((a, b) =>
    isReversed ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="min-h-screen py-4 md:p-4 relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Product List</h2>

      <button
        onClick={toggleSortOrder}
        className="mb-4 bg-black text-white px-4 py-2 rounded-md transition duration-300 absolute right-0"
      >
        {isReversed ? 'Show Oldest First' : 'Show Newest First'}
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
        <div className="text-center mt-20 text-gray-500">No products found.</div>
      ) : (
        <div className="flex flex-col mt-20 overflow-y-scroll md:h-[72vh]">
          {sortedProducts.map((product) => (
            <div key={product._id} className="flex bg-gray-100 mt-1 rounded-xl p-3 items-center">
              <img
                src={product.images?.[0] ? `${backend}/uploads/product/${product.images[0]}` : "/placeholder.png"}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-xl"
              />
              <div className="flex-grow px-4">
                <h3 className="text-sm font-bold">{product.name}</h3>
                <p className="text-gray-800 font-semibold">৳{product.price}</p>
                <p className="text-sm text-gray-500">Date Added: {product.date ? new Date(product.date).toLocaleDateString() : "N/A"}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="text-blue-500 hover:underline"
                  title="View product details"
                >
                  <MdLocalSee size={20} />
                </button>
                <Link title="Edit product" to={`/products/edit/${product._id}`}>
                  <MdEdit size={20} />
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  disabled={deletingId === product._id}
                  className={`flex gap-2 items-center px-2 py-1 rounded ${deletingId === product._id ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 text-white'}`}
                >
                  <MdDelete size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ToastContainer />

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default List;
