import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      if (!userInfo) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/orders/myorders', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) return <div className="container mt-5 text-center">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Orders</h2>
      
      {orders.length === 0 ? (
        <div className="alert alert-info">You have no orders yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      <span className="badge bg-success">Paid</span>
                    ) : (
                      <span className="badge bg-danger">Not Paid</span>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <span className="badge bg-success">Delivered</span>
                    ) : (
                      <span className="badge bg-warning text-dark">Processing</span>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`} className="btn btn-sm btn-primary">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
