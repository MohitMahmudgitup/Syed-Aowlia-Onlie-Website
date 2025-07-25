import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; // For a success icon

const VerifyStripe = () => {
  const { navigate, token, setCartItem, backend, darkmode } = useContext(ShopContext);

  return (
    <section className={`py-12 md:py-20 flex flex-col items-center justify-center min-h-screen ${darkmode ? ' text-white' : 'bg-white text-gray-800'}`}>
      {/* Success Icon and Message */}
      <div className="flex flex-col items-center justify-center space-y-4 px-4">
        <FaCheckCircle className="text-violet-500 text-6xl md:text-7xl" />
        <p className="text-2xl md:text-4xl font-semibold text-center">
          Your Order was Successfully Completed!
        </p>
        <p className="text-base md:text-lg text-center max-w-lg">
          Thank you for your purchase. You can view the details of your order by clicking the link below.
        </p>
      </div>

      {/* Go to Orders Button */}
      <Link 
        to="/oders" 
        className="mt-6 px-6 py-3 bg-violet-500 text-white text-base md:text-lg rounded-md hover:bg-violet-600 transition duration-300 ease-in-out"
      >
        Go to Orders Page
      </Link>
    </section>
  );
};

export default VerifyStripe;
