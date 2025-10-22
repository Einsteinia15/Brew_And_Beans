import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import apiService from '../services/api';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setOrderError('');

    try {
      const orderData = {
        ...checkoutData,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: parseFloat(item.price),
          quantity: item.quantity
        }))
      };

      const result = await apiService.createOrder(orderData);
      
      if (result.success) {
        setOrderSuccess(true);
        clearCart();
        setShowCheckout(false);
        setCheckoutData({
          customer_name: '',
          customer_email: '',
          customer_phone: '',
          notes: ''
        });
      }
    } catch (error) {
      console.error('Order error:', error);
      setOrderError(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setCheckoutData({
      ...checkoutData,
      [e.target.name]: e.target.value
    });
  };

  if (items.length === 0 && !orderSuccess) {
    return (
      <div>
        <section className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <i className="fas fa-shopping-cart fa-5x text-coffee mb-4"></i>
                <h2 className="text-coffee mb-4">Your Cart is Empty</h2>
                <p className="mb-4">Looks like you haven't added any items to your cart yet.</p>
                <Link to="/menu" className="btn btn-coffee btn-lg">
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div>
        <section className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <i className="fas fa-check-circle fa-5x text-success mb-4"></i>
                <h2 className="text-success mb-4">Order Placed Successfully!</h2>
                <p className="mb-4">Thank you for your order. We'll prepare your coffee with care.</p>
                <div className="d-flex gap-3 justify-content-center">
                  <Link to="/menu" className="btn btn-coffee">
                    Order More
                  </Link>
                  <button 
                    className="btn btn-outline-coffee"
                    onClick={() => setOrderSuccess(false)}
                  >
                    New Order
                  </button>
                </div>
              </div>
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
              <h1 className="display-4 fw-bold hero-text mb-4">Your Cart</h1>
              <p className="lead hero-text">
                Review your order and proceed to checkout
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Items */}
      <section className="py-5">
        <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <h3 className="text-coffee mb-4">Order Items</h3>
                    {items.map(item => (
                      <div key={item.id} className="cart-item">
                        <div className="row align-items-center">
                          <div className="col-md-2 col-3">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="img-fluid rounded"
                              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                            />
                          </div>
                          <div className="col-md-4 col-9">
                            <h5 className="text-coffee mb-1">{item.name}</h5>
                            <p className="text-muted small mb-0">{item.description}</p>
                          </div>
                          <div className="col-md-2 col-6 mt-2">
                            <span className="h6 text-coffee">${parseFloat(item.price).toFixed(2)}</span>
                          </div>
                          <div className="col-md-2 col-6 mt-2">
                            <div className="quantity-controls">
                              <button 
                                className="btn btn-sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <span className="mx-2">{item.quantity}</span>
                              <button 
                                className="btn btn-sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="col-md-2 col-12 mt-2 text-center">
                            <span className="h6 text-coffee">
                              ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                            </span>
                            <button 
                              className="btn btn-sm btn-outline-danger ms-2"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
            
            <div className="col-lg-4">
              <div className="total-section">
                <h4 className="text-coffee mb-4">Order Summary</h4>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax (8.5%):</span>
                  <span>${(getTotalPrice() * 0.085).toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total:</strong>
                  <strong>${(getTotalPrice() * 1.085).toFixed(2)}</strong>
                </div>
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-coffee btn-lg"
                    onClick={() => setShowCheckout(true)}
                  >
                    <i className="fas fa-credit-card me-2"></i>
                    Proceed to Checkout
                  </button>
                  <button 
                    className="btn btn-outline-coffee"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                  <Link to="/menu" className="btn btn-outline-coffee">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-coffee">
                  <i className="fas fa-shopping-cart me-2"></i>
                  Complete Your Order
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowCheckout(false)}
                ></button>
              </div>
              <div className="modal-body">
                {orderError && (
                  <div className="alert alert-danger">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {orderError}
                  </div>
                )}
                
                <form onSubmit={handleCheckoutSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="customer_name" className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="customer_name"
                        name="customer_name"
                        value={checkoutData.customer_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="customer_email" className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        id="customer_email"
                        name="customer_email"
                        value={checkoutData.customer_email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="customer_phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="customer_phone"
                      name="customer_phone"
                      value={checkoutData.customer_phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="notes" className="form-label">Special Instructions</label>
                    <textarea
                      className="form-control"
                      id="notes"
                      name="notes"
                      rows="3"
                      value={checkoutData.notes}
                      onChange={handleInputChange}
                      placeholder="Any special requests or notes for your order..."
                    ></textarea>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-light p-3 rounded mb-4">
                    <h6 className="text-coffee mb-3">Order Summary</h6>
                    {items.map(item => (
                      <div key={item.id} className="d-flex justify-content-between mb-2">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <hr />
                    <div className="d-flex justify-content-between">
                      <strong>Total: ${(getTotalPrice() * 1.085).toFixed(2)}</strong>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={() => setShowCheckout(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-coffee"
                  onClick={handleCheckoutSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check me-2"></i>
                      Place Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
