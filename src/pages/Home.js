import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-4 fw-bold hero-text mb-4">
                Experience the Perfect Cup
              </h1>
              <p className="lead hero-text mb-4">
                Discover the art of coffee at BrewAndBean Coffee House. We source the finest beans 
                and craft each cup with passion and precision.
              </p>
              <Link to="/menu" className="btn btn-coffee btn-lg">
                Explore Our Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-5 bg-cream">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop" 
                alt="Coffee shop interior"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <h2 className="section-title text-coffee">Our Story</h2>
              <h3 className="h4 text-coffee mb-3">Brewing Excellence Since 2010</h3>
              <p className="mb-3">
                Founded by two passionate coffee enthusiasts, BrewAndBean began as a small 
                neighborhood coffee cart with a big dream. Today, we've grown into a beloved 
                community hub where coffee lovers gather to enjoy exceptional brews in a warm, 
                welcoming atmosphere.
              </p>
              <p className="mb-3">
                We travel the world to source the finest beans, working directly with farmers 
                who share our commitment to sustainable practices. Each bean is carefully roasted 
                in-house to bring out its unique character and flavor profile.
              </p>
              <p className="mb-4">
                At BrewAndBean, we believe coffee is more than a beverage - it's an experience 
                to be savored and shared. We invite you to join us in celebrating the art of coffee.
              </p>
              <Link to="/about" className="btn btn-coffee">
                Visit Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Coffee Selection Preview */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title text-coffee text-center mb-5">Our Coffee Selection</h2>
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="card product-card h-100">
                <img 
                  src="https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=300&h=200&fit=crop" 
                  className="card-img-top" 
                  alt="Classic Espresso"
                />
                <div className="card-body">
                  <h5 className="card-title text-coffee">Classic Espresso</h5>
                  <p className="card-text">Rich, concentrated coffee with a golden crema</p>
                  <p className="h5 text-coffee">$3.50</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card product-card h-100">
                <img 
                  src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=200&fit=crop" 
                  className="card-img-top" 
                  alt="Velvet Cappuccino"
                />
                <div className="card-body">
                  <h5 className="card-title text-coffee">Velvet Cappuccino</h5>
                  <p className="card-text">Equal parts espresso, steamed milk and foam</p>
                  <p className="h5 text-coffee">$4.25</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card product-card h-100">
                <img 
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop" 
                  className="card-img-top" 
                  alt="Caramel Macchiato"
                />
                <div className="card-body">
                  <h5 className="card-title text-coffee">Caramel Macchiato</h5>
                  <p className="card-text">Espresso with vanilla syrup, steamed milk and caramel drizzle</p>
                  <p className="h5 text-coffee">$5.00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/menu" className="btn btn-coffee btn-lg">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
