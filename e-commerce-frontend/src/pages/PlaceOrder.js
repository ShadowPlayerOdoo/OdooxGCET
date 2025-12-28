import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const { cartItems, clearCart } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Load products to ensure we have current prices and details
  useEffect(() => {
    fetch('http://localhost:5000/api/products') // Change to your Render URL if deploying
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  // Filter only items currently in the cart
  const cartProducts = products.filter((product) => cartItems[product._id] > 0);

  // Calculations
  const itemsPrice = cartProducts.reduce(
    (acc, item) => acc + item.price * cartItems[item._id],
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Example: Free shipping over $100
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2)); // Example: 15% Tax
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
      toast.error('Please login to place order');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          orderItems: cartProducts.map((item) => ({
            product: item._id,
            name: item.name,
            price: item.price,
            image: item.image,
            qty: cartItems[item._id],
          })),
          shippingAddress: {
            address: '123 Main St', // You can add a form input for this later
            city: 'Ahmedabad',
            postalCode: '380001',
            country: 'India',
          },
          paymentMethod: 'PayPal', // Default for now
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Order Placed Successfully!');
        clearCart(); // Clear the cart context
        navigate(`/order/${data._id}`); // Redirect to order details
      } else {
        toast.error(data.message || 'Order Failed');
      }
    } catch (error) {
      toast.error('Network Error');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Order Summary</h2>
      <div className="row">
        {/* Left Side: Items */}
        <div className="col-md-8">
          <ul className="list-group mb-4">
            {cartProducts.map((item) => (
              <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src={item.image} alt={item.name} style={{ width: '50px', objectFit: 'cover', marginRight: '15px' }} />
                  <span>{item.name} (x{cartItems[item._id]})</span>
                </div>
                <span>${(item.price * cartItems[item._id]).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Totals */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title text-center mb-3">Total</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Items:</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>${shippingPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Order Total:</strong>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
              <button 
                className="btn btn-primary w-100" 
                onClick={placeOrderHandler}
                disabled={cartProducts.length === 0}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
