import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebers'
import List from './page/List'
import Orders from './page/Orders'
import Add from './page/Add'
import Login from './component/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EditProduct from './page/EditProduct'
import Footer from './component/Footer'

export const backend = import.meta.env.VITE_BACKEND_URL 

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]); // Added navigate dependency

  return (
    <main className='px-2 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      {!token ? (
        <div className='w-full p-4'>
          <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
          </Routes>
        </div>
      ) : (
        <>
          <Navbar setToken={setToken} />
          <div className='flex flex-col md:flex-row w-full'>
            <Sidebar />
            <div className='w-full p-4'>
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/products/edit/:id" element={<EditProduct token={token} />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </>
      )}
    </main>
  );
}

export default App;
