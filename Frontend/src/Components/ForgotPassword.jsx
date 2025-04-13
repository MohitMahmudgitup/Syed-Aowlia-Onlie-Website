import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../Context/ShopContext';
import Titel from './Titel';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { backend, darkmode } = useContext(ShopContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    
    try {
      setLoading(true);
      const res = await axios.post(`${backend}/api/user/forgot-password`, { email });
      if (res.data.success) {
        toast.success(res.data.message);
        setEmail('');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen `}>
      <div className={`shadow-2xl rounded-3xl p-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl transition-all duration-300 ${darkmode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
         <Titel text1={"FORGOT "} text2={"PASSWORD"} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Enter your email"
            className={`w-full px-4 outline-none py-2 border mb-4 rounded transition-all duration-200 ${
              darkmode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full  bgbtn hbgbtn text-white py-2 rounded  transition duration-300"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className={`text-sm font-medium ${
            darkmode ? 'text-blue-400' : 'text-blue-500'
          }`}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
