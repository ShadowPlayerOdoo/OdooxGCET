import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // FETCH DATA FROM SERVER
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://mern-e-comm-njy2.onrender.com/api/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="container"><h2>Loading products...</h2></div>;

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

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`} style={{textDecoration: 'none'}}>
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
