import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    toast.success("Added to Cart!");
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
        const newCart = { ...prev };
        if (newCart[itemId] > 1) newCart[itemId] -= 1;
        else delete newCart[itemId];
        return newCart;
    });
  };

  // --- NEW FUNCTION ---
  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem('cartItems');
  };

  const contextValue = { cartItems, addToCart, removeFromCart, clearCart };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
