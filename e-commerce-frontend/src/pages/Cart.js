// src/pages/Cart.js
import React, { useContext } from 'react';
import { products } from '../data';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  return (
    <div className="container cart-page">
      <h1>Your Cart Items</h1>
      
      <div className="cart-items">
        {products.map((product) => {
          if (cartItems[product.id] !== 0) {
            return (
              <div className="cart-item" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="description">
                  <p><b>{product.name}</b></p>
                  <p>${product.price}</p>
                  <div className="count-handler">
                    <button onClick={() => removeFromCart(product.id)}> - </button>
                    <input value={cartItems[product.id]} readOnly />
                    <button onClick={() => addToCart(product.id)}> + </button>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: ${totalAmount.toFixed(2)}</p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button> Checkout </button>
        </div>
      ) : (
        <h3>Your Cart is Empty</h3>
      )}
    </div>
  );
};

export default Cart;
