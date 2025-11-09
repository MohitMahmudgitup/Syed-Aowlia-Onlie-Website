import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Titel from "./Titel";
import ProductItem from "./ProductItem";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

function LatestCollection() {
  const { products, darkmode, backend } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  const skeletonBaseColor = darkmode ? "#374151" : "#e0e0e0";
  const skeletonHighlightColor = darkmode ? "#4b5563" : "#f5f5f5";

  useEffect(() => {
    let productsArray = [];

    if (Array.isArray(products)) {
      productsArray = products;
    } else if (products?.products && Array.isArray(products.products)) {
      productsArray = products.products;
    } else {
      console.error("Products is not an array:", products);
      return;
    }

    // Take the latest 12 products
    setLatestProducts(productsArray.slice(0, 12));
  }, [products]);

  return (
    <div className="py-4">
      <Titel text1="LATEST " text2="COLLECTION" />

      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:gap-4 gap-3 ">
        {latestProducts.length > 0
          ? latestProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                discountprice={item.discount_price}
                image={`${backend}/uploads/product/${item.images[0]}`}
              />
            ))
          : // Skeleton placeholders
            [...Array(12)].map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton
                  className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-60 2xl:h-64 rounded-lg"
                  baseColor={skeletonBaseColor}
                  highlightColor={skeletonHighlightColor}
                />
                <Skeleton
                  className="w-3/4 sm:w-4/5 md:w-4/5 h-4 sm:h-5 rounded-lg"
                  baseColor={skeletonBaseColor}
                  highlightColor={skeletonHighlightColor}
                />
                <Skeleton
                  className="w-1/2 sm:w-2/3 md:w-2/3 h-4 sm:h-5 rounded-lg"
                  baseColor={skeletonBaseColor}
                  highlightColor={skeletonHighlightColor}
                />
                <Skeleton
                  className="w-1/3 sm:w-1/4 h-5 sm:h-6 rounded-lg"
                  baseColor={skeletonBaseColor}
                  highlightColor={skeletonHighlightColor}
                />
              </div>
            ))}
      </div>
    </div>
  );
}

export default LatestCollection;
