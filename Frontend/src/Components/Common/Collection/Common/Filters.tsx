import React from 'react'
import { assets } from '../../../../assets/assets'

const Filters = ({setShowFilter , showFilter , collectionID , categoryType , handleCategoryChange , selectedCategories , selectSubCat , handleTypeChange , selectedTypes } : any) => {
 
 const getCategoryName = (id : any) => {
  const cat = categoryType.find((c : any) => String(c._id) === String(id));
  return cat?.name || "Category";
};
    return (
     <div className="w-full sm:w-1/4 ">
        <div className={`p-4 sticky top-0 rounded-xl transition-all duration-300 bg-white text-gray-700`}>
          {/* FILTERS HEADER */}
          <div className="flex items-center justify-between">
            <p
              onClick={() => setShowFilter((prev : any) => !prev)}
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

            <div
              className={`p-4 sticky top-[115px]  transition-all duration-300   max-h-[80vh] overflow-y-auto bg-[#FAFCFC] rounded-lg`}  // ✅ add scroll
            >

              {/* CATEGORIES - Show only when collectionID is "collection" */}
              {collectionID === "collection" && categoryType.length > 0 && (
                <div className="mb-6">
                  <p className={`mb-3 text-sm font-bold transition-all duration-300 text-gray-600`}>
                    CATEGORIES ({categoryType.length})
                  </p>
                  <div className="flex flex-col gap-3 text-sm">
                    {categoryType.map((categoryItem : any) => (
                      <label className="flex items-center gap-2" key={categoryItem._id}>
                        <input
                          className="w-4 h-4 rounded-md transition-all duration-300"
                          type="checkbox"
                          value={categoryItem._id}
                          onChange={() => handleCategoryChange(categoryItem._id)}
                          checked={selectedCategories.includes(String(categoryItem._id))}
                        />
                        <span className={"text-gray-700"}>
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
                  <p className={`mb-3 text-sm font-bold transition-all duration-300 text-gray-600`}>
                    SUBCATEGORIES ({selectSubCat.length})
                  </p>
                  <div className="flex flex-col gap-3 text-sm">
                    {selectSubCat.map((item :any) => (
                      <label className="flex items-center gap-2" key={item._id || item.id}>
                        <input
                          className="w-4 h-4 rounded-md transition-all duration-300"
                          type="checkbox"
                          value={item._id || item.id}
                          onChange={() => handleTypeChange(item._id || item.id)}
                          checked={selectedTypes.includes(String(item._id || item.id))}
                        />
                        <span className={"text-gray-700"}>
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
                  <p className={`mb-2 text-sm font-bold text-gray-600`}>
                    Active Filters:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((catId : any) => (
                      <span
                        key={catId}
                        className={`px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700`}
                      >
                        {getCategoryName(catId )}
                      </span>
                    ))}
                    {selectedTypes.map((subId : any )=> (
                      <span
                        key={subId}
                        className={`px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700`}
                      >
                        {selectSubCat.find((sub : any) => String(sub._id || sub.id) === String(subId))?.name || 'Subcategory'}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  )
}

export default Filters
