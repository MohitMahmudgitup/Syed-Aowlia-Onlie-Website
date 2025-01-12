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
      <LatesCallection/>
      <BestSeller/>
      <OuerPolicy/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home
