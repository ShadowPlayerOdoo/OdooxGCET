import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  const totalAmount = products.reduce((acc, product) => {
    if (cartItems[product._id]) {
      return acc + (product.price * cartItems[product._id]);
    }
    return acc;
  }, 0);

  const checkoutHandler = () => {
     // Check if logged in
     const userInfo = localStorage.getItem('userInfo');
     if (!userInfo) {
         navigate('/login');
     } else {
         navigate('/place-order');
     }
  };

  return (
    <div className="container mt-5">
      <h2>Your Cart Items</h2>
      <div className="row">
        <div className="col-md-8">
            {products.map((product) => {
                if (cartItems[product._id] > 0) {
                    return (
                        <div className="card mb-3" key={product._id}>
                            <div className="row g-0 align-items-center">
                                <div className="col-md-2 p-2">
                                    <img src={product.image} className="img-fluid rounded-start" alt={product.name} />
                                </div>
                                <div className="col-md-6">
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">${product.price}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 text-center">
                                    <button className="btn btn-sm btn-outline-danger me-2" onClick={() => removeFromCart(product._id)}>-</button>
                                    <span className="fw-bold">{cartItems[product._id]}</span>
                                    <button className="btn btn-sm btn-outline-success ms-2" onClick={() => addToCart(product._id)}>+</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                return null;
            })}
        </div>
        <div className="col-md-4">
            <div className="card p-3">
                <h4>Subtotal: ${totalAmount.toFixed(2)}</h4>
                <button 
                    onClick={checkoutHandler}
                    className="btn btn-dark mt-3" 
                    disabled={totalAmount === 0}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
