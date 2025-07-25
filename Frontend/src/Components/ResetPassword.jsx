import { NavLink, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext';
import { toast } from 'react-toastify';
import Titel from './Titel';
import { assets } from '../assets/assets';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const { backend, navigate, darkmode } = useContext(ShopContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backend}/api/user/reset-password/${token}`, { newPassword });          
      setSuccess(true);
      toast.success(res.data.message);
      if (res.data.success) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setSuccess(false);
      toast.error("Password reset failed");
    }
  };

  return (
    <div className="flex justify-center items-center right-0 top-0 absolute loginbg z-50 w-[100vw] h-[100vh]">
      <NavLink to={"/"} className={"absolute top-10 left-4 sm:left-16"} >
                  <img width={120} src={assets.logo01} alt="" />
                </NavLink>
      <div className={`shadow-2xl rounded-3xl p-8 w-full max-w-md  lg:max-w-xl `}>
      <div className=" font-semibold mb-5 text-2xl sm:text-4xl">
              <p className=" text-blue-500">
              RESAT YOUR PASSWORD
              </p>
            </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full px-5 py-3 border rounded-lg outline-none text-black transition-all duration-300  bg-gray-50 border-gray-300 focus:ring-blue-400 `}
            required
          />
           <p className=" text-sm text-red-500 mt-2">A minimum of 6 characters is required.</p>
          <button
            type="submit"
            className=" bgbtn hbgbtn w-full py-3  text-white font-semibold rounded-lg transition-all duration-300"
          >
            Reset Password
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-400">Add the new password and click on reset password button to reset your password.</p>
        {success === true && (
          <p className="text-green-400 mt-4 text-center">✅ Password successfully reset.</p>
        )}
        {success === false && (
          <p className="text-red-500 mt-4 text-center">❌ Something went wrong. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
