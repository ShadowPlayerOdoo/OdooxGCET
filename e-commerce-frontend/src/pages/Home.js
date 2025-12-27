// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover the Future of Shopping</h1>
          <p>Get the best deals on electronics, fashion, and more.</p>
          <button className="cta-btn">Shop Now</button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container products-section">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="card-body">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <Link to={`/product/${product.id}`} className="view-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
