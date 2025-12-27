import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-section">
          <h3>ShopMERN</h3>
          <p>Your one-stop shop for premium electronics and lifestyle products.</p>
          <div className="social-icons">
            <FaFacebook /> <FaInstagram /> <FaTwitter />
          </div>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>123 Tech Street, Silicon Valley</p>
          <p>support@shopmern.com</p>
          <p>+1 234 567 890</p>
        </div>
        <div className="footer-section">
          <h4>We Accept</h4>
          <div className="payment-icons">
            <FaCcVisa /> <FaCcMastercard /> <FaCcPaypal />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 ShopMERN. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
