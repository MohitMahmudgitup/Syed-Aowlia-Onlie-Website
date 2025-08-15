import React from 'react'
import { Link } from 'react-router-dom'

const Messenge = () => {
  return (
    <Link to={"https://wa.me/8801630075111"} className=" text-white fixed bottom-10 right-0 shadow-md rounded-l-full hover:bg-[#ff7b39] bg-[#F85606] w-20 sm:w-60 h-20 cursor-pointer">
        <div className=' gap-4 flex items-center h-full pl-4'>
          <img width={50} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1022px-WhatsApp.svg.png" alt="" />
          <h1 className=' sm:block hidden text-xl'>What's App</h1>
        </div>
    </Link>
  )
}

export default Messenge
