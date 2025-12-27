import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, cartItems } = useContext(ShopContext);
  const [product, setProduct] = useState(null);

  // Fetch single product from list or API (Simpler to just fetch list for now)
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p._id === id);
        setProduct(found);
      });
  }, [id]);

  if (!product) return <div className="container"><h2>Loading...</h2></div>;

  const cartAmount = cartItems[product._id];

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
            <button className="add-to-cart-btn" onClick={() => addToCart(product._id)}>
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
