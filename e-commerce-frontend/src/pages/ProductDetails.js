// src/pages/ProductDetails.js
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data';
import { ShopContext } from '../context/ShopContext'; // Import Context

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart, cartItems } = useContext(ShopContext); // Get function

  const cartAmount = cartItems[product.id];

  if (!product) {
    return <div className="container"><h2>Product not found</h2></div>;
  }

  return (
    <div className="container product-details-page">
      <Link to="/" className="back-link">← Back to Products</Link>
      <div className="details-grid">
        <div className="image-section">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="info-section">
          <h1>{product.name}</h1>
          <p className="category">Category: {product.category}</p>
          <h2 className="price">${product.price}</h2>
          <p className="description">{product.description}</p>
          
          <div className="action-buttons">
            <button className="add-to-cart-btn" onClick={() => addToCart(product.id)}>
              Add to Cart {cartAmount > 0 && `(${cartAmount})`}
            </button>
            <button className="buy-now-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
