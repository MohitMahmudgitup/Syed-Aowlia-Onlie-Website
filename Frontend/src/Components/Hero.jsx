import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Swiper from './Swiper';
import OfferHero from './OfferHero';

function Hero() {
  const { darkmode } = useContext(ShopContext);

  return (
    <>
    <Swiper/>
    {/* <OfferHero/>   */}
    </>
);
}

export default Hero;
