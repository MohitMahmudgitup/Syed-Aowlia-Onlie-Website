import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import { FaSeedling } from "react-icons/fa6";

function ProductItem({ id, image, name, price, description, discountprice, cls }) {
    const { currency, darkmode } = useContext(ShopContext); 

    const safeDescription = description || ''; 

    return (
        <div
            className="break-inside-avoid block"  // IMPORTANT for Masonry layout
        >
            <div className={`${cls} cursor-pointer rounded-lg bg-white ${darkmode ? 'text-gray-300' : 'text-gray-700'}`}>

                <div className='overflow-hidden rounded-t-lg p-2'>
                    <img src={image} alt={name} className="w-full xl:h-44 object-cover rounded-lg" />
                </div>
                <div className='pb-2 px-3'>


             <p  className={` pb-1 text-lg sm:text-sm line-clamp-2  text-gray-600`}>  {name} </p>
                <div className='flex items-center justify-between '>
                    <div className='flex items-center'>

                    {discountprice ? (
                        <>
                            <p className=' text-sm sm:text-xl font-medium text-[#ff0404]'>{currency}{discountprice}</p>
                            <p className='pl-1 text-xs sm:text-xs text-[#7c7c7c] line-through'>{currency}{price}</p>
                        </>
                    ) : (
                        <p className='pl-3 text-lg sm:text-xl font-medium text-[#ff0404]'>{currency}{price}</p>
                    )}

                    </div>
                    <Link 
            to={`/product/${id}`}>
                        <button className="bg-[#ECFF8E] hover:bg-[#C9E7E3] border hover:shadow-sm  p-3 rounded-full text-blue-900" ><FaSeedling /></button>
                    </Link>
                </div>

                </div>

            </div>
        </div>
    );
}

export default ProductItem;
