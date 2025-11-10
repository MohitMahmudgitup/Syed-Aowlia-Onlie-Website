import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

function ProductItem({ id, image, name, price, description, discountprice, cls }) {
    const { currency, darkmode } = useContext(ShopContext); 

    const safeDescription = description || ''; 

    return (
        <Link 
            className={`${cls} cursor-pointer  2xl:w-full xl:w-full  rounded-lg bg-[#FAFCFC] hover:shadow-md ${darkmode ? 'text-gray-300' : 'text-gray-700'}`} 
            to={`/product/${id}`}
        >
            <div className='overflow-hidden rounded-t-lg shadow-xl'>
                <img src={image} alt={name} className={` w-full h-40  sm:h-44  object-cover`} />
            </div>
            <p className={`pl-3 pt-3 pb-1 text-sm  sm:text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                {safeDescription.length > 25 ? safeDescription.slice(0, 25) + "..." : safeDescription}
            </p>
            <div className='flex items-center'>
                {
                    discountprice ? 
                    (
                        <>
                            <p className='pl-3 text-lg sm:text-xl font-medium text-[#ff0404]'>{currency}{discountprice}</p>
                            <p className='pl-1 text-xs sm:text-xs  text-[#7c7c7c] line-through'>{currency}{price}</p>
                        </>
                        
                    ):(
                        <p className='pl-3 text-lg sm:text-xl font-medium text-[#ff0404]'>{currency}{price}</p>
                    )
                }
            </div>
            <img className='pl-2 pb-2' width={80}  src={assets.yellowFiveSter} alt="" />
        </Link>
    );
}

export default ProductItem;
