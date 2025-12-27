import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { cartItems } = useContext(ShopContext);
  const itemCount = Object.values(cartItems).reduce((a, b) => a + b, 0);
  const navigate = useNavigate();

  // Check if user is logged in
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems'); // Clear cart on logout
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">ShopMERN</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          
          {/* CONDITIONAL RENDERING: Only show Cart if user is logged in */}
          {userInfo && (
            <Link to="/cart">
              <FaShoppingCart /> 
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </Link>
          )}

          {userInfo ? (
            <>
              <span style={{ color: '#ecf0f1', marginLeft: '20px' }}>Hi, {userInfo.name.split(' ')[0]}</span>
              <button onClick={logoutHandler} className="login-btn" style={{ background: 'transparent', border: '1px solid white' }}>
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <Link to="/login"><FaUser /> Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
