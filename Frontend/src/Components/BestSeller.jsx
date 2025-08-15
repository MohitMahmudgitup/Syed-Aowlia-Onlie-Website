import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Titel from "./Titel";
import ProductItem from "./ProductItem";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { assets } from "../assets/assets";

function BestSeller() {
  const { products, darkmode } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    // Check if products is an array
    if (products.products) {
      const bestProducts = products.products.filter((item) => item.bestseller); // Filter best sellers
      console.log(bestProducts)
      setBestSeller(bestProducts.reverse().slice(0, 50)); // Reverse and slice the best sellers
    } else {
      console.error("Products is not an array:", products); // Log the issue if not an array
    }
  }, [products]);

  return (
    <div className="sm:my-10 bg-white rounded-md sm:py-5 ">
      <div className=" text-3xl pl-2 border-b">
        <Titel text1={"BEST"} text2={"SELLERS"} />

      </div>
<div className="flex gap-2 sm:gap-0 overflow-x-auto scroll scrollbar-hide  py-1 sm:py-0 px-2 sm:px-0  ">
  {bestSeller.length > 0
    ? bestSeller.map((item) => (
        <div key={item._id} className="flex w-full relative sm:px-2  sm:py-4 justify-between">
          <div className="absolute -right-5 sm:-right-2 top-20 sm:top-32">
          <img width={100}  src={assets.bestSeller} alt="" />
          </div>
          <ProductItem 
            cls={"w-32"}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.images[0]}
          />
        </div>
      ))
    : [...Array(5)].map((_, index) => (
        <div key={index} className="flex-shrink-0 w-48">
          <Skeleton height={200} baseColor={darkmode ? "#374151" : "#e0e0e0"} highlightColor={darkmode ? "#4b5563" : "#f5f5f5"} />
          <Skeleton count={2} baseColor={darkmode ? "#374151" : "#e0e0e0"} highlightColor={darkmode ? "#4b5563" : "#f5f5f5"} />
          <Skeleton width={100} baseColor={darkmode ? "#374151" : "#e0e0e0"} highlightColor={darkmode ? "#4b5563" : "#f5f5f5"} />
        </div>
      ))}
</div>

    </div>
  );
}

export default BestSeller;
