import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-4 fw-bold hero-text mb-4">Contact Us</h1>
              <p className="lead hero-text">
                Get in touch with us - we'd love to hear from you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title text-coffee text-center mb-5">Visit Us</h2>
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-info">
                <h4 className="text-coffee mb-4">Get In Touch</h4>
                <div className="mb-3">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>123 Coffee Street, Brewville, CA 94107</span>
                </div>
                <div className="mb-3">
                  <i className="fas fa-phone"></i>
                  <span>(555) 123-4567</span>
                </div>
                <div className="mb-4">
                  <i className="fas fa-envelope"></i>
                  <span>info@brewandbean.com</span>
                </div>
                
                <h5 className="text-coffee mb-3">Opening Hours</h5>
                <div className="mb-2">
                  <strong>Monday - Friday:</strong> 7:00 AM - 8:00 PM
                </div>
                <div className="mb-2">
                  <strong>Saturday:</strong> 8:00 AM - 9:00 PM
                </div>
                <div className="mb-4">
                  <strong>Sunday:</strong> 8:00 AM - 6:00 PM
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="contact-info">
                <h4 className="text-coffee mb-4">Send Us a Message</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-coffee">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
