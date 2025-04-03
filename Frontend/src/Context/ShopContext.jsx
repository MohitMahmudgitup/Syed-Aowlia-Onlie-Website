import { createContext, useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backend = import.meta.env.VITE_BACKEND_URL;

  const currency = "$";
  const delivery_fee = 20;
  const [search, setSearch] = useState("");
  const [showsearch, setShowsearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [darkmode , setDarkmode] = useState(true);

  // Retrieve token from localStorage

  // Initialize cart from local storage if available
  const [cartItem, setCartItem] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // Fetch products from backend using axios
  const getProductsdata = async () => {
    try {
      const response = await axios.get(
        `${backend}/api/product`,
        {headers: {token}} , // Add token to headers
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

  // Add item to cart and save to local storage
  const addtocart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
  
    let cardData = { ...cartItem }; // Create a copy of cart data
  
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
  
    setCartItem(cardData);
    // localStorage.setItem("cart", JSON.stringify(cardData));
  
    if (token) {
      try {
        await axios.post(
          `${backend}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
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
  
    if (cartData[itemId] && cartData[itemId][size]) {
      // Decrease quantity
      cartData[itemId][size] -= 1;
      const updatedQuantity = cartData[itemId][size];
  
      // If quantity is zero, remove the item from the cart
      if (updatedQuantity === 0) {
        delete cartData[itemId][size];
  
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
        } catch (error) {
          console.error("Error removing product from cart:", error);
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

  const getUserCart = async (token) => {
    try {
        // Validate token presence
        if (!token) {
            toast.error("Authentication token is missing.");
            return;
        }

        // Fetch the user's cart using a GET request
       await axios.get(`${backend}/api/cart/get`, {
            headers: {token} // Sending token with Authorization header
        });

    } catch (error) {
        // Log error details and show user-friendly error message
        console.error("Error fetching user cart:", error);
        toast.error("Unable to fetch the cart. Please try again.");
    }
};


useEffect(() => {
  const token = localStorage.getItem("token"); // Get the token from local storage

  if (token) {
    setToken(token); // Set the token in state
    getUserCart(token); // Fetch the user's cart
  } else {
    // Redirect to login if token is missing
    navigate("/login");
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
  }, [cartItem , token]);

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
    getUserCart,
    darkmode,setDarkmode
    
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
