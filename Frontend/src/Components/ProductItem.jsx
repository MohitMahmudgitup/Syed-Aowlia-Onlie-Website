import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';

function ProductItem({ id, image, name, price, description }) {
    const { currency } = useContext(ShopContext);

    // Set a default description if it's undefined
    const safeDescription = description || ''; // Fallback to an empty string if undefined

    return (
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden rounded-t-xl'>
                <img src={image} alt={name} className="w-full h-52 sm:h-72 md:h-56 object-cover" />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
            <p className='pt-3 pb-1 text-sm text-gray-400'>
                {safeDescription.length > 100 ? safeDescription.slice(0, 100) + "..." : safeDescription}
            </p>
        </Link>
    );
}

export default ProductItem;
