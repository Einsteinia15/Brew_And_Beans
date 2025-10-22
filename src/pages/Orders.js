import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await apiService.getOrders();
        setOrders(data);
        setError(null);
      } catch (err) {
        setError('Failed to load orders. Please try again.');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-warning',
      confirmed: 'bg-info',
      preparing: 'bg-primary',
      ready: 'bg-success',
      completed: 'bg-success',
      cancelled: 'bg-danger'
    };
    
    return `badge ${statusClasses[status] || 'bg-secondary'}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiService.updateOrderStatus(orderId, newStatus);
      // Refresh orders list
      const data = await apiService.getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status. Please try again.');
    }
  };

  if (loading) {
    return (
      <div>
        <section className="py-5">
          <div className="container">
            <div className="text-center py-5">
              <div className="spinner-border text-coffee" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading orders...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-4 fw-bold hero-text mb-4">Order Management</h1>
              <p className="lead hero-text">
                View and manage all customer orders
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Orders List */}
      <section className="py-5">
        <div className="container">
          {error && (
            <div className="alert alert-danger text-center">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
              <button 
                className="btn btn-outline-danger btn-sm ms-3"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          )}

          {orders.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-receipt fa-3x text-muted mb-3"></i>
              <h4 className="text-muted">No orders found</h4>
              <p className="text-muted">Orders will appear here once customers place them.</p>
            </div>
          ) : (
            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead className="bg-coffee text-white">
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{order.customer_name}</td>
                          <td>{order.customer_email}</td>
                          <td>${parseFloat(order.total_amount).toFixed(2)}</td>
                          <td>
                            <span className={`badge ${getStatusBadge(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td>{formatDate(order.order_date)}</td>
                          <td>
                            <button 
                              className="btn btn-sm btn-outline-coffee"
                              onClick={() => setSelectedOrder(order)}
                            >
                              View Items
                            </button>
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <button 
                                className="btn btn-sm btn-success"
                                onClick={() => updateOrderStatus(order.id, 'confirmed')}
                              >
                                Confirm
                              </button>
                              <button 
                                className="btn btn-sm btn-primary"
                                onClick={() => updateOrderStatus(order.id, 'preparing')}
                              >
                                Preparing
                              </button>
                              <button 
                                className="btn btn-sm btn-warning"
                                onClick={() => updateOrderStatus(order.id, 'ready')}
                              >
                                Ready
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-coffee">
                  Order #{selectedOrder.id} Details
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setSelectedOrder(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6 className="text-coffee">Customer Information</h6>
                    <p><strong>Name:</strong> {selectedOrder.customer_name}</p>
                    <p><strong>Email:</strong> {selectedOrder.customer_email}</p>
                    {selectedOrder.customer_phone && (
                      <p><strong>Phone:</strong> {selectedOrder.customer_phone}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-coffee">Order Information</h6>
                    <p><strong>Order Date:</strong> {formatDate(selectedOrder.order_date)}</p>
                    <p><strong>Status:</strong> 
                      <span className={`badge ${getStatusBadge(selectedOrder.status)} ms-2`}>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </span>
                    </p>
                    <p><strong>Total:</strong> ${parseFloat(selectedOrder.total_amount).toFixed(2)}</p>
                  </div>
                </div>
                
                <h6 className="text-coffee">Order Items</h6>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items && selectedOrder.items.map(item => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>${parseFloat(item.unit_price).toFixed(2)}</td>
                          <td>${parseFloat(item.total_price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {selectedOrder.notes && (
                  <div className="mt-3">
                    <h6 className="text-coffee">Special Instructions</h6>
                    <p className="bg-light p-3 rounded">{selectedOrder.notes}</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
