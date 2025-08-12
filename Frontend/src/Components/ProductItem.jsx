import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';

function ProductItem({ id, image, name, price, description }) {
    const { currency, darkmode } = useContext(ShopContext); // Assuming dark mode state is stored in ShopContext

    // Set a default description if it's undefined
    const safeDescription = description || ''; // Fallback to an empty string if undefined

    return (
        <Link 
        
            className={`cursor-pointer shadow-sm rounded-t-xl bg-zinc-100 hover:shadow-md ${darkmode ? 'text-gray-300' : 'text-gray-700'}`} 
            to={`/product/${id}`}
            //  style={{
            //     background: 'linear-gradient(188deg, rgba(183,78,252,1) 0%, rgba(255,181,181,1) 50%, rgba(252,176,69,0) 100%)'
            // }}
        >
            <div className='overflow-hidden rounded-t-xl'>
                <img src={image} alt={name} className="w-full h-52 sm:h-72 md:h-56 object-cover" />
            </div>
            {/* <p className='pl-3 pt-3 pb-1 text-sm'>{name}</p> */}
            <p className={`pl-3 pt-3 pb-1 text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                {safeDescription.length > 20 ? safeDescription.slice(0, 50) + "..." : safeDescription}
            </p>
            <p className='pl-3 text-lg font-medium text-violet-500'>{currency}{price}</p>
        </Link>
    );
}

export default ProductItem;
