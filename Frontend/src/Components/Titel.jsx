import React from 'react'

function Titel({text1,text2,color1,color2}) {
  return (
    <div className='inline-flex gap-2 items-center mb-3 text-center text-2xl sm:text-4xl'>
      <p className={`text-gray-500 ${color1}`}>{text1}<span className={`text-gray-700 font-medium ${color2}`}>{text2}</span></p>
      <p className='w-8 sm:w-12 h-[1.5px] sm:h-[2px] bg-black'></p>
    </div>
  )
}

export default Titel
