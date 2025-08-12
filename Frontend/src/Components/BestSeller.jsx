import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Titel from "./Titel";
import ProductItem from "./ProductItem";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

function BestSeller() {
  const { products, darkmode } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    // Check if products is an array
    if (products.products) {
      const bestProducts = products.products.filter((item) => item.bestseller); // Filter best sellers
      // console.log(bestProducts)
      setBestSeller(bestProducts.reverse().slice(0, 5)); // Reverse and slice the best sellers
    } else {
      console.error("Products is not an array:", products); // Log the issue if not an array
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className=" text-3xl py-8 pl-2">
        <Titel text1={"BEST"} text2={"SELLERS"} />

      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 sm:px-0 px-2">
        {bestSeller.length > 0
          ? bestSeller.map((item) => (
              <ProductItem
                key={item._id} // Using the unique product ID as the key
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.images[0]} // Accessing the first image from the images array
              />
            ))
          : // Generate 10 skeleton loaders if there are no best sellers
            [...Array(5)].map((_, index) => (
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

export default BestSeller;
