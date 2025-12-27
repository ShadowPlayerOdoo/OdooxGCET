import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data';
import { FaFilter } from 'react-icons/fa';

const Home = () => {
  const [filter, setFilter] = useState("All");

  // Get unique categories
  const categories = ["All", ...new Set(products.map(p => p.category))];
  
  const filteredProducts = filter === "All" 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Premium Quality, <br/> Unbeatable Prices</h1>
          <p>Join the revolution of smart shopping.</p>
          <button className="cta-btn">Explore Collection</button>
        </div>
      </section>

      <div className="container">
        {/* Filter Bar */}
        <div className="filter-bar">
          <h3><FaFilter /> Filter by:</h3>
          <div>
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} style={{textDecoration: 'none'}}>
                <img src={product.image} alt={product.name} />
                <div className="card-body">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
