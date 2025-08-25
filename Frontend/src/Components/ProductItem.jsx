import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

function ProductItem({ id, image, name, price, description, cls }) {
    const { currency, darkmode } = useContext(ShopContext); 

    const safeDescription = description || ''; 

    return (
        <Link 
            className={`${cls} cursor-pointer h-full shadow-sm w-40 sm:w-full  rounded-xl bg-[#C8E6E7] hover:shadow-md ${darkmode ? 'text-gray-300' : 'text-gray-700'}`} 
            to={`/product/${id}`}
        >
            <div className='overflow-hidden rounded-xl'>
                <img src={image} alt={name} className={` w-full h-36 sm:h-44  object-cover`} />
            </div>
            <p className={`pl-3 pt-3 pb-1 text-sm  sm:text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                {safeDescription.length > 25 ? safeDescription.slice(0, 39) + "..." : safeDescription}
            </p>
            <p className='pl-3 text-lg sm:text-xl font-medium text-[#FF8311]'>{currency}{price}</p>
            <img className='pl-2 pb-2' width={80}  src={assets.yellowFiveSter} alt="" />
        </Link>
    );
}

export default ProductItem;
