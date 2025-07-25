import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

function SearchBer() {
    const  {search, setSearch, showsearch, setShowsearch } = useContext(ShopContext);

    const location  = useLocation();
    useEffect(()=>{
      if(location.pathname === '/collection'){
        setShowsearch(true)
        }else{
          setShowsearch(false)
        }


    },[location])

  return showsearch && (
    <div  className="border-t border-b bg-gray-50 text-center">
      <div  className="inline-flex items-center justify-center border border-gray-400 px-5 my-5 rounded-full w-3/4 sm:w-1/2">
      <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm py-2' type='text' placeholder='Search...'/>
      <img className='w-6' src={assets.search_icon} alt="" />
      </div>
    </div>
    )
}

export default SearchBer
