import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../Context/ShopContext';
import Titel from './Titel';
import { assets } from '../assets/assets';

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
    <div className="flex justify-center items-center right-0 top-0 absolute loginbg z-50 w-[100vw] h-[100vh]">
      <NavLink to={"/"} className={"absolute top-10 left-4 sm:left-16"} >
                  <img width={120} src={assets.logo01} alt="" />
                </NavLink>
      <div className={`shadow-2xl rounded-3xl p-8 w-full max-w-md lg:max-w-xl transition-all duration-300  text-gray-800`}>
      <div className=" font-semibold mb-5 text-2xl sm:text-4xl">
              <p className=" text-blue-500">
              FORGOT PASSWORD
              </p>
            </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Enter your email"
            className={`w-full px-4 outline-none py-2 border mb-4 rounded transition-all duration-200 bg-white border-gray-300 `}
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
        <div className="text-end mt-4">
          <Link to="/login" className={`text-sm font-medium text-blue-400`}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
