import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('userInfo', JSON.stringify(data)); // Save token
        toast.success(`Welcome back ${data.name}!`);
        navigate('/'); // Go to Home
        window.location.reload(); // Refresh to update Navbar
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          onChange={handleChange} 
          required 
          style={{ padding: '10px' }}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
          style={{ padding: '10px' }}
        />
        <button type="submit" className="cta-btn" style={{ width: '100%' }}>Login</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        New Customer? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
