import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products to verify details (Price, Image, etc.)
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const totalAmount = products.reduce((acc, product) => {
    if (cartItems[product._id]) {
      return acc + (product.price * cartItems[product._id]);
    }
    return acc;
  }, 0);

  return (
    <div className="container cart-page">
      <h1>Your Cart Items</h1>
      
      <div className="cart-items">
        {products.map((product) => {
          if (cartItems[product._id]) {
            return (
              <div className="cart-item" key={product._id}>
                <img src={product.image} alt={product.name} />
                <div className="description">
                  <p><b>{product.name}</b></p>
                  <p>${product.price}</p>
                  <div className="count-handler">
                    <button onClick={() => removeFromCart(product._id)}> - </button>
                    <input value={cartItems[product._id]} readOnly />
                    <button onClick={() => addToCart(product._id)}> + </button>
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
          <button style={{backgroundColor: '#e74c3c'}}> Checkout </button>
        </div>
      ) : (
        <h3>Your Cart is Empty</h3>
      )}
    </div>
  );
};

export default Cart;
