import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h5 className="text-white mb-3">
              <i className="fas fa-coffee me-2"></i>
              BrewAndBean
            </h5>
            <p className="text-light">
              Specialty coffee house dedicated to crafting exceptional coffee experiences since 2010.
            </p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Pinterest">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-4 mb-4">
            <h5 className="text-white mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/menu" className="text-light text-decoration-none">Menu</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-light text-decoration-none">Our Story</Link>
              </li>
              <li className="mb-2">
                <Link to="/gallery" className="text-light text-decoration-none">Gallery</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-light text-decoration-none">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-4 mb-4">
            <h5 className="text-white mb-3">Newsletter</h5>
            <p className="text-light mb-3">
              Subscribe to our newsletter for special offers and coffee tips.
            </p>
            <div className="input-group">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Your Email Address"
                aria-label="Email address"
              />
              <button className="btn btn-coffee" type="button">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
        
        <div className="row">
          <div className="col-12 text-center">
            <p className="text-light mb-0">
              © 2023 BrewAndBean Coffee House. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
