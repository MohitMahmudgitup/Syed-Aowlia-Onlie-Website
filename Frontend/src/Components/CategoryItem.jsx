import React from 'react'
import { IoMdWatch } from "react-icons/io";
import { FaHeadphones } from "react-icons/fa";
import { ImPower } from "react-icons/im";
import { FaMobile } from "react-icons/fa6";
import { BsPcDisplay } from "react-icons/bs";
const CategoryItem = () => {
  return (
    <div className='flex gap-2'>
        <div className='bg-white w-10 h-10 p-3 flex justify-center items-center rounded-xl shadow-md'>
            <IoMdWatch size={30}/>
        </div>
        <div className='bg-white w-10 h-10 p-3 flex justify-center items-center rounded-xl shadow-md'>
            <FaHeadphones size={30}/>
        </div>
        <div className='bg-white w-10 h-10 p-3 flex justify-center items-center rounded-xl shadow-md'>
            <ImPower size={25}/>
        </div>
        <div className='bg-white w-10 h-10 p-3 flex justify-center items-center rounded-xl shadow-md'>
            <FaMobile size={30}/>
        </div>
        <div className='bg-white w-10 h-10 p-3 flex justify-center items-center rounded-xl shadow-md'>
            <BsPcDisplay  size={30}/>
        </div>
        
    </div>

  )
}

export default CategoryItem 
