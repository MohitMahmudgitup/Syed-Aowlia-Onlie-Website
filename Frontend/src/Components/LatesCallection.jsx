import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Titel from './titel';
import ProductItem from './ProductItem';
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'

function LatesCallection() {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]); // Initialize with an empty array

  useEffect(() => {
    if (products.products) {
      // console.log("LatesCallection:", products.products);
      setLatestProducts(products.products.reverse().slice(0, 10)); // Access the products array from the object
    } else {
      console.error("Products is not an array:", products);
    }
  }, [products]);

  return (
    <div>
      <div className='text-center py-8 text-3xl'>
        <Titel text1={"LATEST "} text2={"COLLECTION"} />
        <p className='w-3/4 text-xs sm:text-sm m-auto md:text-base text-gray-600'>
        Shopify puts your store within 50 milliseconds of every shopper on the planet, with the capacity to handle even the most epic product drops.
        </p>
      </div>
      {/* Rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 relative">
  {latestProducts.length > 0 ? (
    latestProducts.map((item) => (
      <ProductItem
        key={item._id} // Using the unique product ID as the key
        id={item._id}
        name={item.name}
        description={item.description}
        price={item.price}
        image={item.images[0]} // Accessing the first image from the images array
      />
    ))
  ) : (
    // Generate 10 skeleton loaders
    [...Array(10)].map((_, index) => (
      <div key={index}>
        <Skeleton height={200} /> {/* Simulate image skeleton */}
        <Skeleton count={2} /> {/* Simulate text skeleton */}
        <Skeleton width={100} /> {/* Simulate price skeleton */}
      </div>
    ))
  )}
</div>

    </div>
  );
}

export default LatesCallection;

