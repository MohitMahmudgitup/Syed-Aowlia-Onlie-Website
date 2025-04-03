import { useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

function Navbar({ setToken }) {
  const navigate = useNavigate()


  const handleLogout = () => {
    // Clear the token from state and localStorage
    setToken("")
    localStorage.removeItem('token')
    // Redirect to the login page
    navigate('/login')
  }

  return (
    <nav className='flex justify-between py-4'>
      <img className='w-40' src={assets.logo} alt="Logo" />
      <button
        onClick={handleLogout}
        className='px-5 bg-gray-950 hover:bg-gray-900 text-white rounded-md font-medium'
        disabled={false} // Ensure logout is always enabled
      >
        Logout
      </button>
    </nav>
  )
}

export default Navbar
