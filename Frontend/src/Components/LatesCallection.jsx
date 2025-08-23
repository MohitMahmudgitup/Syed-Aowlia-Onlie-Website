import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Titel from "./Titel";
import ProductItem from "./ProductItem";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

function LatesCallection() {
  const { products, darkmode } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]); // Initialize with an empty array

useEffect(() => {
  let productsArray = [];

  // If products is an object with a products array
  if (products?.products && Array.isArray(products.products)) {
    productsArray = products.products;
  }
  // If products itself is an array
  else if (Array.isArray(products)) {
    productsArray = products;
  } else {
    console.error("Products is not an array:", products);
    return; // Exit early
  }

  // Now productsArray is guaranteed to be an array
  setLatestProducts(productsArray.slice().slice(0, 12));
}, [products]);


  return (
    <div>
      <div className=" py-2 text-3xl pl-2">
        <Titel text1={"LATEST "} text2={"COLLECTION"} />
        {/* <p
          className={`w-3/4 text-xs sm:text-sm m-auto md:text-base ${
            darkmode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Shopify puts your store within 50 milliseconds of every shopper on the
          planet, with the capacity to handle even the most epic product drops.
        </p> */}
      </div>
      {/* Rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-x-2 gap-y-1 sm:gap-y-2 relative sm:px-0 px-2">
        {latestProducts.length > 0
          ? latestProducts.map((item) => (
              <ProductItem
                key={item._id} // Using the unique product ID as the key
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={`http://localhost:4000/uploads/product/${item.images[0]}`} // Accessing the first image from the images array
              />
            ))
          : // Generate 10 skeleton loaders
            [...Array(10)].map((_, index) => (
              <div key={index}>
                <Skeleton height={200} baseColor={darkmode ? "#374151" : "#e0e0e0"} highlightColor={darkmode ? "#4b5563" : "#f5f5f5"} /> {/* Simulate image skeleton */}
                <Skeleton count={2} baseColor={darkmode ? "#374151" : "#e0e0e0"} highlightColor={darkmode ? "#4b5563" : "#f5f5f5"} /> {/* Simulate text skeleton */}
                <Skeleton width={100} baseColor={darkmode ? "#374151" : "#e0e0e0"} highlightColor={darkmode ? "#4b5563" : "#f5f5f5"} /> {/* Simulate price skeleton */}
              </div>
            ))}
      </div>
    </div>
  );
}

export default LatesCallection;
