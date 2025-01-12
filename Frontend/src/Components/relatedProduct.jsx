import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import ProductItem from './ProductItem';
import Titel from './titel';

function RelatedProduct({ selectedCategories, selectedTypes }) {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.products.length > 0) {
            // Filter products based on selected category and type
            const productCopy = products.products.filter((item) => 
                item.category === selectedCategories && item.subCategory === selectedTypes
            );
            // console.log("productCopy:", productCopy);
            setRelated(productCopy.slice(0, 5)); // Limit to 5 related products
        }
    }, [products, selectedCategories, selectedTypes]);

    return (
        <div className="p-4">
            <div className='text-center py-8 text-3xl'>
                <Titel text1={"RELATED"} text2={" PRODUCTS"} />
                <p className='w-3/4 text-xs sm:text-sm m-auto md:text-base text-gray-600'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
                </p>
            </div>

            {related.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {related.map((product) => (
                        <ProductItem 
                            key={product._id} 
                            id={product._id} 
                            name={product.name}  
                            price={product.price} 
                            image={product.images[0]} // Display the first image
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-600">
                    <p>No related products found.</p>
                </div>
            )}
        </div>
    );
}

export default RelatedProduct;
