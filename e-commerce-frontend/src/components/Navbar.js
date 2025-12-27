// src/components/Navbar.js
import React, { useContext } from 'react'; // Import useContext
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'; // Import Context

const Navbar = () => {
  const { cartItems } = useContext(ShopContext);
  
  // Calculate total items in cart
  const itemCount = Object.values(cartItems).reduce((a, b) => a + b, 0);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">ShopMERN</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart ({itemCount})</Link>
          <button className="login-btn">Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
