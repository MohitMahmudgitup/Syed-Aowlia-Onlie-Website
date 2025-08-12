import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';

function Titel({ text1, text2, color1, color2 }) {
  const { darkmode } = useContext(ShopContext);

  return (
    <div className="inline-flex gap-2 items-center mb-3 text-center text-2xl sm:text-3xl">
      <p className={`${darkmode ? 'text-gray-300' : 'text-gray-500'} ${color1}`}>
        {text1}
        <span className={`${darkmode ? 'text-white' : 'text-gray-700'} font-medium ${color2}`}>
          {text2}
        </span>
      </p>
      <p className={`w-8 sm:w-12 h-[1.5px] sm:h-[2px] ${darkmode ? 'bg-white' : 'bg-black'}`}></p>
    </div>
  );
}

export default Titel; 
