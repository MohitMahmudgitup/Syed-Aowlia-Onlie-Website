import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

function ProductItem({ id, image, name, price, description, cls }) {
    const { currency, darkmode } = useContext(ShopContext); // Assuming dark mode state is stored in ShopContext

    // Set a default description if it's undefined
    const safeDescription = description || ''; // Fallback to an empty string if undefined

    return (
        <Link 
            className={`${cls} cursor-pointer h-full shadow-sm w-40 sm:w-full  rounded-xl bg-white hover:shadow-md ${darkmode ? 'text-gray-300' : 'text-gray-700'}`} 
            to={`/product/${id}`}
            //  style={{
            //     background: 'linear-gradient(188deg, rgba(183,78,252,1) 0%, rgba(255,181,181,1) 50%, rgba(252,176,69,0) 100%)'
            // }}
        >
            <div className='overflow-hidden rounded-xl'>
                <img src={image} alt={name} className={`w-40 sm:w-full h-40 sm:h-52  object-cover`} />
            </div>
            {/* <p className='pl-3 pt-3 pb-1 text-sm'>{name}</p> */}
            <p className={`pl-3 pt-3 pb-1 text-sm  sm:text-xl ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                {safeDescription.length > 25 ? safeDescription.slice(0, 39) + "..." : safeDescription}
            </p>
            <p className='pl-3 text-lg sm:text-2xl font-medium text-[#FF8311]'>{currency}{price}</p>
            <img className='pl-2 pb-2' width={80}  src={assets.yellowFiveSter} alt="" />
        </Link>
    );
}

export default ProductItem;
