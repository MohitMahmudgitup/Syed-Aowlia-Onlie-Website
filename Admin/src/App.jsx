import React, { useEffect, useState } from 'react'
import Navbar from './component/Navbar'
import Sideber from './component/Sidebers'
import { Routes, Route, useNavigate } from 'react-router-dom'
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
  const [token, setToken] = useState(  localStorage.getItem('token') ? localStorage.getItem('token') : "/login")
const navigate = useNavigate()
  
useEffect(()=>{
    const token = localStorage.getItem("token")
    token === null && navigate("/login")

    

  },[token])
  

  return (
    <main className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      
      <ToastContainer />
      {
        !token ? (
          <Login setToken={setToken} />  
        ) : (
          <>
            <Navbar setToken={setToken} />
            <hr />
            <div className='flex flex-col md:flex-row w-full'>
              <Sideber />
              <div className='w-full p-4'>
                <Routes>
                  <Route path="/" element={<Add token={token}/> }/>
                  <Route path="/list" element={<List token={token}/> } />
                  <Route path="/orders" element={<Orders token={token}/> } />
                  <Route path="/products/edit/:id" element={<EditProduct token={token} />} />
                </Routes>
              </div>
            </div>
            <Footer/>
          </>
        )
      }
    </main>
  )
}

export default App
