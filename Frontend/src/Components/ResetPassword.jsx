import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext';
import { toast } from 'react-toastify';
import Titel from './Titel';

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
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 transition-all duration-300 `}>
      <div className={`shadow-2xl rounded-3xl p-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl transition-all duration-300 ${darkmode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <Titel text1={"RESAT "} text2={"YOUR PASSWORD"} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full px-5 py-3 border rounded-lg outline-none  transition-all duration-300 ${darkmode ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500' : 'bg-gray-50 border-gray-300 focus:ring-blue-400'}`}
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
