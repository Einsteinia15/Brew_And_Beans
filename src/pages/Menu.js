import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';
import apiService from '../services/api';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, debugCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-4 fw-bold hero-text mb-4">Our Menu</h1>
              <p className="lead hero-text">
                Discover our carefully crafted selection of premium coffee drinks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 bg-cream">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`btn ${selectedCategory === category ? 'btn-coffee' : 'btn-outline-coffee'} mb-2`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-5">
        <div className="container">
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-coffee" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading products...</p>
            </div>
          )}
          
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
          
          {!loading && !error && (
            <div className="row">
              {filteredProducts.length === 0 ? (
                <div className="col-12 text-center py-5">
                  <i className="fas fa-coffee fa-3x text-muted mb-3"></i>
                  <h4 className="text-muted">No products found in this category</h4>
                </div>
              ) : (
                filteredProducts.map(product => (
                  <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                    <div className="card product-card h-100">
                      <img 
                        src={product.image_url} 
                        className="card-img-top" 
                        alt={product.name}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title text-coffee">{product.name}</h5>
                        <p className="card-text flex-grow-1">{product.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="h5 text-coffee mb-0">${parseFloat(product.price).toFixed(2)}</span>
                          <button 
                            className="btn btn-coffee"
                            onClick={() => {
                              addToCart(product);
                              debugCart();
                            }}
                          >
                            <i className="fas fa-plus me-2"></i>
                            Add to Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Menu;
