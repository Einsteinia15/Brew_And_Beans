import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-cream">
      <div className="container">
        <Link className="navbar-brand text-coffee" to="/">
          <i className="fas fa-coffee coffee-icon"></i>
          BrewAndBean
        </Link>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-coffee" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-coffee" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-coffee" to="/menu">Menu</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-coffee" to="/gallery">Gallery</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-coffee" to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-coffee" to="/orders">Orders</Link>
            </li>
          </ul>
          
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-coffee position-relative" to="/cart">
                <i className="fas fa-shopping-cart"></i>
                Cart
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
