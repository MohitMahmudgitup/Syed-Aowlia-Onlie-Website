import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const AdminNavbar = ({ setAdmintoken }) => {
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("admintoken"); 
  setAdmintoken("");
  navigate("/", { replace: true });
};


  return (
    <nav className="flex justify-between items-center py-3 px-4 sm:px-16 sticky top-0 bg-white shadow-md z-50 border-b border-gray-100">
      {/* Logo */}
      <NavLink to={"/"} className="flex items-center gap-2">
          <img
            width={150}
            src={assets.SyedAowliaBlack}
            alt="Logo"
            className="object-contain"
          />

      </NavLink>

      {/* Right Side */}
      <div className="flex items-center gap-4">
<button
  onClick={handleLogout}
  className="px-5 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 transition-all shadow-md hover:shadow-lg"
>
  Logout
</button>

      </div>
    </nav>
  );
};

export default AdminNavbar;
