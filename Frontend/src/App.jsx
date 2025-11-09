import React, { useContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import { Collection } from './Pages/Collection'
import Oders from './Pages/Oders'
import Login from './Pages/Login'
import Product from './Pages/Product'
import { Cart } from './Pages/Cart'
import PlaceOder from './Pages/PlaceOder'
import Navber from './Components/Navber.jsx'
import Footer from './Components/Footer.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShopContext } from './Context/ShopContext.jsx'
import VerifyStripe from './Pages/verifyStripe.jsx'
import ForgotPassword from './Components/ForgotPassword.jsx'
import ResetPassword from './Components/ResetPassword.jsx'
import Messenge from './Components/Messenge.jsx'
import Admin from './Pages/Admin.jsx'
import Adminpages from './Pages/Adminpages.jsx'



function App() {
  const [admintoken, setAdmintoken] = useState(localStorage.getItem('admintoken') || null);
  return (
    <main >
      <Navber admintoken={admintoken} />
       <Routes>
          <Route path='/' element={<Home />} />
          </Routes>
      <div className={`px-1 sm:px-[5vw] md:px-[7vw] xl:px-[8vw] 2xl:px-[16vw]  `}>
        <ToastContainer />
        <Routes>
          <Route path='/:collectionID' element={<Collection />} />
          <Route path='/oders' element={<Oders />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product/:productID' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/place-order' element={<PlaceOder />} />
          <Route path='/verify' element={<VerifyStripe />} />
          <Route path="/login/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/admin-panal" element={<Admin setAdmintoken={setAdmintoken} />} />
          <Route path="/adminPages/*" element={<Adminpages admintoken={admintoken} setAdmintoken={setAdmintoken} />} />
        </Routes>
      </div>
      <Footer />
      <Messenge admintoken={admintoken} />
    </main>
  )
}

export default App
