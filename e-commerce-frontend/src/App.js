import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import { ShopContextProvider } from './context/ShopContext';
import './App.css';

import Login from './pages/Login';      // <--- ADD THIS
import Register from './pages/Register'; // <--- ADD THIS

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />       {/* <--- ADD THIS */}
            <Route path="/register" element={<Register />} /> {/* <--- ADD THIS */}
          </Routes>
          <Footer />
        </Router>
        <ToastContainer position="bottom-right" theme="dark" />
      </ShopContextProvider>
    </div>
  );
}

export default App;
