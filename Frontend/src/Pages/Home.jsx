import React from 'react'
import Hero from '../Components/Hero'
import LatesCallection from '../Components/LatesCallection'
import BestSeller from '../Components/BestSeller'
import OuerPolicy from '../Components/OuerPolicy'
import NewsLetterBox from '../Components/NewsLetterBox'

function Home() {
  

  return (
    <div>
      <Hero/>
      <div className={` sm:px-[5vw] md:px-[7vw] lg:px-[9vw] `}>
      <BestSeller/>
      <LatesCallection/>
      <OuerPolicy/>
      <NewsLetterBox/>

      </div>
    </div>
  )
}

export default Home
