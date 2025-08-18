import React, { useContext, useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import { Collection } from './Pages/Collection'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Oders from './Pages/Oders'
import Login from './Pages/Login'
import Product from './Pages/Product'
import { Cart } from './Pages/Cart'
import PlaceOder from './Pages/PlaceOder'
import Navber from './Components/Navber.jsx'
import Footer from './Components/Footer.jsx'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShopContext } from './Context/ShopContext'
import VerifyStripe from './Pages/verifyStripe.jsx'
import ForgotPassword from './Components/ForgotPassword.jsx'
import ResetPassword from './Components/ResetPassword.jsx'
import Messenge from './Components/Messenge.jsx'



function App() {
  const { darkmode, setDarkmode } = useContext(ShopContext);

  return (
    <main className={` ${darkmode ? ' bg-zinc-900   text-white' : 'bg-[#F5F5F5] text-black'}`}>
      <Navber/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    
    <div className={`px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ${darkmode ? ' bg-zinc-900   text-white' : ' text-black'}`}>
      <ToastContainer/>
      {/* <SearchBer/> */}
      <Routes>
        {/* <Route path='/' element={<Home/>}/> */}
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/oders' element={<Oders/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/product/:productID' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/place-order' element={<PlaceOder/>}/>
        <Route path='/verify' element={<VerifyStripe/>}/>
        <Route path="/login/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
      <Footer/>
      <Messenge/>
    </main>
  )
}

export default App
