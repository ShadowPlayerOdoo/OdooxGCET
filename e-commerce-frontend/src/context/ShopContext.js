import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  // Load cart from LocalStorage on startup (so data stays after refresh)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // Save to LocalStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

 const addToCart = (itemId) => {
    // Check if user is logged in
    const userInfo = localStorage.getItem('userInfo');
    
    if (!userInfo) {
      toast.error("Please Login to add items to cart");
      return; // Stop here, don't add item
    }

    // Existing logic...
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
    toast.success("Added to Cart!");
  };
  
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
    toast.info("Removed from Cart");
  };

  // We need to fetch products to calculate total, 
  // but for now let's just expose the cartItems and let components handle math
  // or you can pass the 'products' array to this context if available.
  
  const contextValue = { cartItems, addToCart, removeFromCart };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
