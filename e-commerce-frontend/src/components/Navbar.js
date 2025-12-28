import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const { cartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const totalItems = Object.values(cartItems).reduce((a, b) => a + b, 0);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">TechShop</Link>
        
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                <FaShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>

            {userInfo ? (
              <>
                <li className="nav-item">
                    <Link className="nav-link" to="/my-orders">My Orders</Link>
                </li>
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" role="button">
                    <FaUser className="me-1"/> {userInfo.name}
                  </span>
                </li>
                <li className="nav-item">
                    <button onClick={logoutHandler} className="btn btn-outline-light btn-sm ms-2">Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
