import { Switch } from '@headlessui/react'
import { useState, useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';

export default function Example() {
  const { darkmode, setDarkmode } = useContext(ShopContext);

  return (
    <Switch
  checked={darkmode}
  onChange={setDarkmode}
  className={`relative flex h-8 w-16 cursor-pointer items-center rounded-full outline-none border transition-all duration-300
    ${darkmode ? "bg-gray-900 border-gray-700 shadow-lg shadow-gray-800" : "bg-gray-300 border-gray-400 shadow-md"}`}
>
  {/* Sun / Moon Icon */}
  <span className="absolute left-8 text-lg transition-all duration-300">
    {!darkmode && "☀️" } 
  </span>

  {/* Moving Toggle Knob */}
  <span
    className={`absolute h-6 w-6 transform rounded-full z-30 transition-all duration-300
      ${darkmode ? "translate-x-8 bg-violet-300  " : "translate-x-1 bg-white shadow-md"}`}
  />
  <span className="absolute left-1 text-lg transition-all duration-300">
    {darkmode && "🌙" } 
  </span>
</Switch>

  )
}

