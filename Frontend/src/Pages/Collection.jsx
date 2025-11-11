import React, { useContext, useEffect, useState } from "react";
import Titel from "../Components/Titel";
import { ShopContext } from "../Context/ShopContext";
import ProductItem from "../Components/ProductItem";
import { useParams } from "react-router-dom";
import axios from "axios";
import Filters from "../Components/Common/Collection/Common/Filters";
import { toast } from "react-toastify";

export const Collection = () => {
  const { collectionID } = useParams()
  const { products, darkmode, backend, searchQuery, setSearchQuery } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState("Relevant");
  const [subCategoryType, setSubCategoryType] = useState([]);
  const [selectSubCat, setSelectSubCat] = useState([]);
  const [categoryType, setCategoryType] = useState([]);

  const fetchSubCategory = async () => {
    try {
      const res = await axios.get(backend + "/api/subcategory/getSubCategory");
      const subCatData = res.data.categories;
      setSubCategoryType(subCatData);
    } catch (error) {
      toast.error("Error fetching subcategories:", error);
    }
  }

  const fetchCategory = async () => {
    try {
      const res = await axios.get(backend + "/api/category/getCategory");
      const CatData = res.data.categories;
      setCategoryType(CatData);
    } catch (error) {
      toast.error("Error fetching categories:", error);
    }
  }

  const subFilter = () => {
    const subCatdata = subCategoryType || [];

    if (collectionID === "collection") {
      if (selectedCategories.length > 0) {
        const filteredSubCats = subCatdata.filter((subCat) => {
          const catId = subCat.category?._id || subCat.category;
          return selectedCategories.includes(String(catId));
        });
        setSelectSubCat(filteredSubCats);
      } else {
        setSelectSubCat(subCatdata);
      }
    } else {
      const filtersubcat = subCatdata.filter(
        (p) => String(p.category?._id || p.category) === String(collectionID) // ✅ normalize
      );
      setSelectSubCat(filtersubcat);
    }
  };


  const applyFilters = () => {
    let filteredProducts = products?.products || [];

    // Show all products if collectionID is "collection", otherwise filter by category
    if (collectionID && collectionID !== "collection") {
      filteredProducts = filteredProducts.filter((product) =>
        String(product.category) === String(collectionID)
      );
    }

    // Apply category filters (using ObjectId)
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(String(product.category))
      );
    }

    // Apply subcategory filters (using ObjectId)
    if (selectedTypes.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedTypes.includes(String(product.subcategory))
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "high-low") {
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }

    if (sortOption === "low-high") {
      filteredProducts = [...filteredProducts].sort((c, d) => c.price - d.price);
    }
    if (sortOption === "Relevant") {
      filteredProducts = [...filteredProducts]
    }

    setFilter(filteredProducts);
  };



  // Fetch both categories and subcategories on mount
  useEffect(() => {
    fetchCategory();
    fetchSubCategory();
  }, [backend]);

  // Apply subfilter when subcategories are fetched, collectionID changes, or category filters change
  useEffect(() => {
    if (subCategoryType.length > 0) {
      subFilter();
    }
  }, [subCategoryType, collectionID, selectedCategories]);

  // Apply filters when dependencies change
  useEffect(() => {
    if (products?.products) {
      applyFilters();
    }
  }, [selectedCategories, selectedTypes, sortOption, searchQuery, products, collectionID]);

  // Clear filters when collectionID changes
  useEffect(() => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSearchQuery("");
  }, [collectionID]);

  // Clear subcategory filters when category selection changes
  useEffect(() => {
    setSelectedTypes([]);
  }, [selectedCategories]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(String(categoryId))
        ? prev.filter((cat) => cat !== String(categoryId))
        : [...prev, String(categoryId)]
    );
  };

  const handleTypeChange = (subcategoryId) => {
    setSelectedTypes((prev) => {
      const stringId = String(subcategoryId);
      const newSelectedTypes = prev.includes(stringId)
        ? prev.filter((t) => t !== stringId)
        : [...prev, stringId];
      return newSelectedTypes;
    });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Helper function to get category name by ID

  const category = categoryType.find(cat => String(cat._id) === String(collectionID));





  const categorytitel = "hi"
  return (
    <div className={`flex flex-col sm:flex-row gap-6 sm:pt-10 pt-2  ${darkmode ? "border-t border-t-gray-700" : "border-t"}`}>
      <Filters setShowFilter={setShowFilter} showFilter={showFilter} collectionID={collectionID} categoryType={categoryType} handleCategoryChange={handleCategoryChange} selectedCategories={selectedCategories} selectSubCat={selectSubCat} handleTypeChange={handleTypeChange} selectedTypes={selectedTypes} />

      <div className="flex-1">
        <div className="flex items-center justify-between mb-6  gap-2 sm:flex-row">
          <Titel
            text1={"ALL"}
            text2={collectionID === "collection" ? " COLLECTIONS" : ` ${category?.name?.toUpperCase()}`}
          />

          <select
            className={`border-2 text-sm sm:px-3 sm:py-1 rounded-lg transition-all focus:outline-none focus:ring-2 ${darkmode
              ? "border-gray-600 bg-gray-600 text-white hover:bg-gray-700 focus:bg-gray-700 focus:ring-gray-400"
              : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus:ring-blue-400"
              }`}
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="Relevant">Relevant</option>
            <option value="low-high">Low-High</option>
            <option value="high-low">High-Low</option>
          </select>
        </div>

        {/* Products Count */}
        <div className="mb-4">
          <p className={`text-sm ${darkmode ? "text-gray-400" : "text-gray-600"}`}>
            Showing {filter.length} product{filter.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        <div className=" columns-2 xl:grid   xl:grid-cols-5   gap-3   space-y-3 sm:space-y-0 ">
          {filter.length > 0 ? (
            filter.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                discountprice={item.discount_price}
                image={item.images && item.images[0] ? `${item.images[0]}` : ''}
              />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center h-[50vh]">
              <div className="text-center">
                <img
                  className="mx-auto w-40 md:w-60 mb-4"
                  src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png"
                  alt="No results found"
                />
                <p className={`text-lg ${darkmode ? "text-gray-400" : "text-gray-600"}`}>
                  No products found
                </p>
                {(selectedCategories.length > 0 || selectedTypes.length > 0 || searchQuery) && (
                  <p className={`text-sm mt-2 ${darkmode ? "text-gray-500" : "text-gray-500"}`}>
                    Try adjusting your filters or search terms
                  </p>
                )}
              </div>
            </div>
          )}
        </div>


      </div>
    </div>
  );
};