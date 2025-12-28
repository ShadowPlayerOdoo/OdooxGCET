import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderScreen = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      try {
        const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        
        const data = await res.json();
        
        if (res.ok) {
          setOrder(data);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error('Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <div className="container mt-5 text-center">Loading...</div>;
  if (!order) return <div className="container mt-5 text-center">Order not found</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Order ID: {order._id}</h2>
      
      <div className="row">
        <div className="col-md-8">
          {/* Shipping Info */}
          <div className="card mb-3">
            <div className="card-header bg-light">Shipping Info</div>
            <div className="card-body">
              <p><strong>Name:</strong> {order.user.name}</p>
              <p><strong>Email:</strong> {order.user.email}</p>
              <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}</p>
              
              {order.isDelivered ? (
                <div className="alert alert-success">Delivered on {order.deliveredAt}</div>
              ) : (
                <div className="alert alert-warning">Not Delivered</div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="card mb-3">
            <div className="card-header bg-light">Order Items</div>
            <ul className="list-group list-group-flush">
              {order.orderItems.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '15px' }} />
                    <span>{item.name}</span>
                  </div>
                  <span>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-dark text-white">Order Summary</div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Items</span>
                <span>${order.itemsPrice}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>${order.shippingPrice}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>${order.taxPrice}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total</strong>
                <strong>${order.totalPrice}</strong>
              </div>
              
              {/* Payment Status */}
              {order.isPaid ? (
                 <div className="alert alert-success text-center">Paid</div>
              ) : (
                 <div className="alert alert-danger text-center">Not Paid</div>
              )}
              
              <Link to="/" className="btn btn-outline-dark w-100">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
