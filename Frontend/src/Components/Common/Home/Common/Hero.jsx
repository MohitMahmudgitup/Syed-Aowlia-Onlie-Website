import React, { useContext } from 'react';
import { ShopContext } from '../../../../Context/ShopContext';
import Swiper from '../../../Swiper';

function Hero() {
  const { darkmode } = useContext(ShopContext);

  return (
    <>
    <Swiper/>
    </>
);
}

export default Hero;
