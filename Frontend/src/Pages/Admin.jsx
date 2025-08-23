// ...existing code...
import React, { useContext, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate} from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

function Login({ setAdmintoken }) {
  
  const { backend } = useContext(ShopContext);
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${backend}/api/user/adminLogin`, { email, password });
      if (response.data.success) {
        setAdmintoken && setAdmintoken(response.data.token);
        if(response.data.role === "admin")  localStorage.setItem('admintoken', response.data.token);
        toast.success(response.data.message);
        navigate('/adminPages')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error('Invalid email or password frontend!');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <section className="min-h-screen flex items-center justify-center absolute bg-slate-100 left-0 w-full h-[100vh] top-0 z-50">

      <div className="flex items-center justify-center h-[80vh] w-full px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm border">
          <h2 className="text-3xl font-bold mb-6 text-center">Admin Panel</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                role="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="relative">
              <a href="https://full-stack-e-commerce-frontend.onrender.com" target="_blank" rel="noreferrer">
                <p className="absolute right-0 -top-2 text-sm font-bold text-red-600">Go to Home</p>
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-md font-medium hover:opacity-95 transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;