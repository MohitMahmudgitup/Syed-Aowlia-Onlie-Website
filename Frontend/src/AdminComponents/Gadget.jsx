import React, { useState } from "react";
import { Combobox } from "@headlessui/react";

const colors = [
  "red","blue","black","green","white","yellow","orange","pink","purple","brown",
  "gray","violet","indigo","turquoise","teal","magenta","cyan","lime","maroon","navy",
  "olive","silver","gold","beige","coral","lavender","mint","peach","salmon","khaki",
  "crimson","amber","apricot","plum","orchid","sienna","tan","chocolate","mustard","rose",
  "emerald","aquamarine","fuchsia","cerulean","jade","scarlet","periwinkle","charcoal","azure","ivory",
  "bronze","burgundy","cobalt","cream","denim","eggplant","flax","garnet","honey","ice",
  "jade","jet","khaki","lemon","mahogany","mauve","navyblue","ochre","onyx","pearl",
  "quartz","ruby","sand","sepia","smoke","snow","tangerine","taupe","topaz","umber",
  "vermilion","wheat","wine","yale","zinc","alabaster","amethyst","apricot","aqua","aquamarine",
  "azure","babyblue","beige","bistre","blush","carmine","celeste","cerise","cerulean","champagne",
  "chartreuse","cobaltblue","copper","coralpink","cornflower","crimsonred","cyanblue","dandelion","denimblue","ecru",
  "electricblue","emeraldgreen","fandango","flamingo","forestgreen","fuchsiapink","gainsboro","goldenrod","grape","grayblue",
  "greenyellow","harlequin","heliotrope","iceblue","ivorywhite","jadegreen","kellygreen","lavenderblush","lemonchiffon","lightblue",
  "lightcoral","lightcyan","lightgoldenrod","lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray",
  "lightsteelblue","limegreen","linen","magenta","malachite","maroonred","mediumaquamarine","mediumblue","mediumorchid","mediumpurple",
  "mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite",
  "neonpink","ochre","olivegreen","orangered","orchidpink","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip",
  "peachpuff","peru","pinkrose","powderblue","prussianblue","puce","pumpkin","raspberry","rawsienna","redorange",
  "royalblue","saddlebrown","salmonpink","sandybrown","seafoam","seagreen","sepiabrown","shamrock","sienna","skyblue","black",
  "slateblue","slategray","springgreen","steelblue","sunflower","tanbrown","thistle","tomato","turquoiseblue","ultramarine",
  "vanillabean","verdigris","vermilion","violetred","wheatgold","white smoke","wildstrawberry","yellowgreen","zaffre","zinnwaldite"
];
 // predefined suggestions

const Gadget = () => {
  const [image, setImage] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [query, setQuery] = useState("");

  const filteredColors =
    query === ""
      ? colors
      : colors.filter((color) =>
          color.toLowerCase().includes(query.toLowerCase())
        );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Gadget submitted!\nSelected Colors: ${selectedColors.join(", ")}`);
  };

  const removeColor = (colorToRemove) => {
    setSelectedColors(selectedColors.filter((c) => c !== colorToRemove));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Gadget</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between gap-2">
    {/* Gadget Name */}
        <div className="w-full">
          <label className="block mb-1 font-medium">Gadget Name</label>
          <input
            type="text"
            placeholder="Enter gadget name"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Brand */}
        <div className="w-full">
          <label className="block mb-1 font-medium">Brand</label>
          <input
            type="text"
            placeholder="Enter brand"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
          />
        </div>

        </div>
        

        <div className="flex justify-between gap-2">
          {/* Model */}
          <div className="w-full">
            <label className="block mb-1 font-medium">Model</label>
            <input
              type="text"
              placeholder="Enter model"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>

 

          {/* Price */}
          <div className="w-full">
            <label className="block mb-1 font-medium">Price (৳)</label>
            <input
              type="number"
              placeholder="Enter price"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>
        </div>
                 {/* Color Multi-Select with Cancel */}
          <div className="w-full">
            <label className="block mb-1 font-medium">Colors</label>
            <Combobox
              value={selectedColors}
              onChange={setSelectedColors}
              multiple
            >
              <div className="relative">
                {/* Selected Color Tags */}
                <div className="flex flex-wrap gap-1 mb-1">
                  {selectedColors.map((color) => (
                    <span
                      key={color}
                      className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
                      {color}
                      <button
                        type="button"
                        className="ml-1 text-blue-600 hover:text-blue-900 font-bold"
                        onClick={() => removeColor(color)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <Combobox.Input
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                  placeholder="Enter colors"
                  onChange={(event) => setQuery(event.target.value)}
                  displayValue={() => ""}
                />

                {filteredColors.length > 0 && (
                  <Combobox.Options className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10 max-h-40 overflow-auto">
                    {filteredColors.map((color) => (
                      <Combobox.Option
                        key={color}
                        value={color}
                        className={({ active }) =>
                          `cursor-pointer px-3 py-2 ${
                            active ? "bg-blue-100" : ""
                          }`
                        }
                      >
                        {({ selected }) => (
                          <span className={selected ? "font-semibold" : ""}>
                            {color}
                          </span>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
              </div>
            </Combobox>
          </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            placeholder="Enter gadget description"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            rows="4"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Gadget
        </button>
      </form>
    </div>
  );
};

export default Gadget;
