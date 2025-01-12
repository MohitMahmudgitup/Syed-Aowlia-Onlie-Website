import React, { useState } from 'react'
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


function App() {


  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navber/>
      {/* <SearchBer/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/oders' element={<Oders/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/product/:productID' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/place-order' element={<PlaceOder/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
