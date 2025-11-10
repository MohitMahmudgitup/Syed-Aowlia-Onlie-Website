import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

function ProductItem({ id, image, name, price, description, discountprice, cls }) {
    const { currency, darkmode } = useContext(ShopContext); 

    const safeDescription = description || ''; 

    return (
        <Link 
            to={`/product/${id}`}
            className="break-inside-avoid block"  // IMPORTANT for Masonry layout
        >
            <div className={`${cls} cursor-pointer rounded-lg bg-white hover:shadow-md ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>

                <div className='overflow-hidden rounded-t-lg'>
                    <img src={image} alt={name} className="w-full sm:h-44 object-cover" />
                </div>

             <p
  className={`px-3 pt-3 pb-1 text-sm sm:text-sm line-clamp-2  text-gray-600`}
>
  {safeDescription}
</p>
                <div className='flex items-center'>
                    {discountprice ? (
                        <>
                            <p className='pl-3 text-lg sm:text-xl font-medium text-[#ff0404]'>{currency}{discountprice}</p>
                            <p className='pl-1 text-xs sm:text-xs text-[#7c7c7c] line-through'>{currency}{price}</p>
                        </>
                    ) : (
                        <p className='pl-3 text-lg sm:text-xl font-medium text-[#ff0404]'>{currency}{price}</p>
                    )}
                </div>

                <img className='pl-2 pb-2' width={80} src={assets.yellowFiveSter} alt="" />
            </div>
        </Link>
    );
}

export default ProductItem;
