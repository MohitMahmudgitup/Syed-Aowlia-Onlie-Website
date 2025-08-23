import { createContext, useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backend = import.meta.env.VITE_BACKEND_URL;

  const currency = "৳";
  const delivery_fee = 80;
  const [search, setSearch] = useState("");
  const [showsearch, setShowsearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [darkmode, setDarkmode] = useState(() => {
    const savedDarkmode = localStorage.getItem("darkmode");
    return savedDarkmode ? JSON.parse(savedDarkmode) : false;
  });
  useEffect(() => {
    localStorage.setItem("darkmode", JSON.stringify(darkmode));
  }, [darkmode]);





  // Fetch products from backend using axios
  const getProductsdata = async () => {
    try {
      const response = await axios.get(
        `${backend}/api/product`,
        { headers: { token } }, // Add token to headers
      );
      // console.log(response.data); // Replace with your API endpoint

      if (response.data) {
        setProducts(response.data); // Set the products only if it's an array
      } else {
        console.error("Fetched data is not an array:", response.data);
        toast.error("Products data format is incorrect.");
      } // Update state with the fetched products
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products. Please try again later.");
    }
  };
  // Call getProductsdata when the component mounts
  useEffect(() => {
    getProductsdata();
  }, []);


  // Initialize cart from local storage if available
  const [cartItem, setCartItem] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (!savedCart) return {}; 
      return JSON.parse(savedCart);
    } catch (error) {
      console.error("Invalid cart data in localStorage:", error);
      localStorage.removeItem("cart"); // clear corrupted data
      return {};
    }
  });


  // console.log(cartItem)


  const addtocart = async (itemId, size = null, color = null) => {
    let cardData = { ...cartItem }; 


    // Check if the item already exists in the cart
    if (cardData[itemId]) {
      if (cardData[itemId][size]) {
        cardData[itemId][size] += 1; // Increment quantity if item and size exist
      } else {
        cardData[itemId][size] = 1; // Add new size with quantity 1
      }
    } else {
      cardData[itemId] = { [size]: 1 }; // Add new item with size
    }

if (cardData[itemId]) {
  if (!Array.isArray(cardData[itemId].color)) {
    cardData[itemId].color = [];
  }
  if (color) {
    cardData[itemId].color.push(color);
  }
}else{
  delete cardData[itemId].color;
}



    setCartItem(cardData);
    // localStorage.setItem("cart", JSON.stringify(cardData));

    if (token) {
      try {
        await axios.post(
          `${backend}/api/cart/add`,
          { itemId, size, color },
          { headers: { token } }
        );
        toast.success("successfully add");
      } catch (error) {
        console.error("Error adding product to cart:", error);
        toast.error("An error occurred while adding the product to the cart.");
      }
    } else {
      toast.warn("You need to be logged in to add items to your cart.");
    }
  };


  // Remove item from cart and save to local storage
  const removeFromCart = async (itemId, size) => {
    let cartData = { ...cartItem };

    if (cartData[itemId] && cartData[itemId][size] && cartData[itemId].color) {
      // Decrease quantity
      cartData[itemId][size] -= 1;
      const updatedQuantity = cartData[itemId][size];

      // If quantity is zero, remove the item from the cart
      if (updatedQuantity === 0) {
        delete cartData[itemId][size] ;
        if (Object.keys(cartData[itemId][size] === 0))  delete cartData[itemId].color ;
       
        // If no other sizes exist for this item, remove the item entirely
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }

      // Update the cart state locally
      setCartItem(cartData);

      if (token) {
        try {
          // Update the cart on the backend
          await axios.put(
            `${backend}/api/cart/update`,
            { itemId, size, quantity: updatedQuantity }, // Send the updated quantity
            { headers: { token } }
          );
          toast.success("Delete successfully ");
        } catch (error) {
          console.log("Error removing product from cart:", error);
          toast.error("An error occurred while removing the product from the cart.");
        }
      } else {
        toast.warn("You need to be logged in to modify items in your cart.");
      }
    }
  };








  // Calculate total quantity of items in the cart
  const getCartItem = () => {
    let totalItems = 0;
    for (const items in cartItem) {
      for (const size in cartItem[items]) {
        try {
          if (cartItem[items][size] > 0) {
            totalItems += cartItem[items][size];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return totalItems;
  };




  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the token from local storage

    if (token ) {
      setToken(token); // Set the token in state
    }
  }, []);



  const getTotalAmount = () => {
    let total = 0;
    for (const item in cartItem) {
      for (const size in cartItem[item]) {
        const product = products?.products?.find((p) => p._id === item);
        if (product && cartItem[item][size] > 0) {
          total += product.price * cartItem[item][size];
        }
      }
    }
    return total;
  };

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem, token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showsearch,
    setShowsearch,
    cartItem,
    addtocart,
    removeFromCart,
    getCartItem,
    getTotalAmount,
    navigate,
    backend,
    token,
    setToken,
    setCartItem,
    darkmode, setDarkmode

  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
