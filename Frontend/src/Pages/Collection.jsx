import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Titel from "../Components/Titel";
import { ShopContext } from "../Context/ShopContext";
import ProductItem from "../Components/ProductItem";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Collection = () => {
  const { collectionID } = useParams()
  const { products, darkmode, backend } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState("Relevant");
  const [searchQuery, setSearchQuery] = useState("");
  const [subCategoryType, setSubCategoryType] = useState([]);
  const [selectSubCat, setSelectSubCat] = useState([]);
  const [categoryType, setCategoryType] = useState([]);

  const fetchSubCategory = async () => {
    try {
      const res = await axios.get(backend + "/api/subcategory/getSubCategory");
      const subCatData = res.data.categories;
      setSubCategoryType(subCatData);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }

  const fetchCategory = async () => {
    try {
      const res = await axios.get(backend + "/api/category/getCategory");
      const CatData = res.data.categories;
      setCategoryType(CatData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

const subFilter = () => {
  const subCatdata = subCategoryType || [];

  if (collectionID === "collection") {
    if (selectedCategories.length > 0) {
      const filteredSubCats = subCatdata.filter((subCat) => {
        const catId = subCat.category?._id || subCat.category; // ✅ handle both object & string
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
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Helper function to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categoryType.find(cat => String(cat._id) === String(categoryId));
    return category ? (category.name || category.categoryName) : `Category ${categoryId}`;
  };


  return (
    <div className={`flex flex-col sm:flex-row gap-6 pt-10 ${darkmode ? "border-t border-t-gray-700" : "border-t"}`}>
      <div className="w-full sm:w-1/4">
        <div className={`p-4 sticky top-[115px] rounded-xl shadow-md transition-all duration-300 ${darkmode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"}`}>
          {/* FILTERS HEADER */}
          <div className="flex items-center justify-between mb-4">
            <p
              onClick={() => setShowFilter((prev) => !prev)}
              className="text-xl font-semibold cursor-pointer flex items-center gap-2 transition-colors duration-300"
            >
              FILTERS
              <img
                className={`h-4 transition-transform sm:hidden ${showFilter ? "rotate-90" : ""}`}
                src={assets.dropdown_icon}
                alt="Toggle Filters"
              />
            </p>
          </div>

          {/* FILTER OPTIONS */}
          <div className={`${showFilter ? "hidden" : "block"} sm:block`}>
            {/* SEARCH BOX */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className={`border-2 p-2 w-full rounded-lg transition-all duration-300 ${darkmode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 text-gray-800 placeholder-gray-500"}`}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
              <div
    className={`p-4 sticky top-[115px]  transition-all duration-300 
      max-h-[80vh] overflow-y-auto`}  // ✅ add scroll
  >

                          {/* CATEGORIES - Show only when collectionID is "collection" */}
            {collectionID === "collection" && categoryType.length > 0 && (
              <div className="mb-6">
                <p className={`mb-3 text-sm font-bold transition-all duration-300 ${darkmode ? "text-gray-400" : "text-gray-600"}`}>
                  CATEGORIES ({categoryType.length})
                </p>
                <div className="flex flex-col gap-3 text-sm">
                  {categoryType.map((categoryItem) => (
                    <label className="flex items-center gap-2" key={categoryItem._id}>
                      <input
                        className="w-4 h-4 rounded-md transition-all duration-300"
                        type="checkbox"
                        value={categoryItem._id}
                        onChange={() => handleCategoryChange(categoryItem._id)}
                        checked={selectedCategories.includes(String(categoryItem._id))}
                      />
                      <span className={darkmode ? "text-gray-300" : "text-gray-700"}>
                        {categoryItem.name || categoryItem.categoryName || 'Unnamed Category'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* SUBCATEGORIES */}
            {selectSubCat.length > 0 && (
              <div className="mb-6">
                <p className={`mb-3 text-sm font-bold transition-all duration-300 ${darkmode ? "text-gray-400" : "text-gray-600"}`}>
                  SUBCATEGORIES ({selectSubCat.length})
                </p>
                <div className="flex flex-col gap-3 text-sm">
                  {selectSubCat.map((item) => (
                    <label className="flex items-center gap-2" key={item._id || item.id}>
                      <input
                        className="w-4 h-4 rounded-md transition-all duration-300"
                        type="checkbox"
                        value={item._id || item.id}
                        onChange={() => handleTypeChange(item._id || item.id)}
                        checked={selectedTypes.includes(String(item._id || item.id))}
                      />
                      <span className={darkmode ? "text-gray-300" : "text-gray-700"}>
                        {item.name || 'Unnamed Subcategory'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ACTIVE FILTERS DISPLAY */}
            {(selectedCategories.length > 0 || selectedTypes.length > 0) && (
              <div className="mb-4">
                <p className={`mb-2 text-sm font-bold ${darkmode ? "text-gray-400" : "text-gray-600"}`}>
                  Active Filters:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map(catId => (
                    <span 
                      key={catId}
                      className={`px-2 py-1 text-xs rounded-full ${darkmode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"}`}
                    >
                      {getCategoryName(catId)}
                    </span>
                  ))}
                  {selectedTypes.map(subId => (
                    <span 
                      key={subId}
                      className={`px-2 py-1 text-xs rounded-full ${darkmode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"}`}
                    >
                      {selectSubCat.find(sub => String(sub._id || sub.id) === String(subId))?.name || 'Subcategory'}
                    </span>
                  ))}
                </div>
              </div>
            )}

            </div>



          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between mb-6 flex-col sm:flex-row">
          <Titel 
            text1={"ALL"} 
            text2={collectionID === "collection" ? " COLLECTIONS" : ` ${getCategoryName(collectionID)?.toUpperCase() || "COLLECTIONS"}`} 
          />

          <select
            className={`border-2 text-sm px-3 py-1 rounded-lg transition-all focus:outline-none focus:ring-2 ${
              darkmode 
                ? "border-gray-600 bg-gray-600 text-white hover:bg-gray-700 focus:bg-gray-700 focus:ring-gray-400" 
                : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus:ring-blue-400"
            }`}
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="Relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low-High</option>
            <option value="high-low">Sort by: High-Low</option>
          </select>
        </div>

        {/* Products Count */}
        <div className="mb-4">
          <p className={`text-sm ${darkmode ? "text-gray-400" : "text-gray-600"}`}>
            Showing {filter.length} product{filter.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2">
          {filter.length > 0 ? (
            filter.map((item) => (
              <ProductItem 
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.images && item.images[0] ? `${backend}/uploads/product/${item.images[0]}` : ''}
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