import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const { cartItems } = useContext(ShopContext);
  const itemCount = Object.values(cartItems).reduce((a, b) => a + b, 0);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">ShopMERN</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">
            <FaShoppingCart /> 
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
          <Link to="/login"><FaUser /> Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
