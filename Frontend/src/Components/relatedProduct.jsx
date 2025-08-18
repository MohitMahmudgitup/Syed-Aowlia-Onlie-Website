import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import ProductItem from "./ProductItem";
import Titel from "./Titel";

function RelatedProduct({ selectedCategories, selectedTypes }) {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    // Support both array and object with products array
    const productList = Array.isArray(products)
      ? products
      : products?.products || [];

    if (productList.length > 0) {
      const filtered = productList.filter((item) => {
        const categoryMatch = selectedCategories
          ? item.category?.toLowerCase() === selectedCategories.toLowerCase()
          : true;
        const typeMatch = selectedTypes
          ? item.subCategory?.toLowerCase() === selectedTypes.toLowerCase()
          : true;
        return categoryMatch && typeMatch;
      });

      if (filtered.length === 0) {
        // Shuffle & pick first 5
        const shuffled = [...productList].sort(() => 0.5 - Math.random());
        setRelated(shuffled.slice(0, 5));
      } else {
        setRelated(filtered.slice(0, 5));
      }
    } else {
      setRelated([]);
    }
  }, [products, selectedCategories, selectedTypes]);

  return (
    <div className="">
      <div className=" py-8 text-3xl">
        <Titel text1={"RELATED"} text2={" PRODUCTS"} />
      </div>

      {related.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-2 ">
          {related.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
               image={`http://localhost:4000/uploads/product/${product.images[0]}`}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <p>No products available.</p>
        </div>
      )}
    </div>
  );
}

export default RelatedProduct;
