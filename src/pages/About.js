import React from 'react';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-4 fw-bold hero-text mb-4">About BrewAndBean</h1>
              <p className="lead hero-text">
                Discover our passion for exceptional coffee and community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
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
            </div>
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop" 
                alt="Coffee shop interior"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-5 bg-cream">
        <div className="container">
          <h2 className="section-title text-coffee text-center mb-5">Our Values</h2>
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="text-center">
                <i className="fas fa-seedling fa-3x text-coffee mb-3"></i>
                <h4 className="text-coffee">Sustainability</h4>
                <p>
                  We work directly with farmers who practice sustainable agriculture, 
                  ensuring fair trade and environmental responsibility.
                </p>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="text-center">
                <i className="fas fa-heart fa-3x text-coffee mb-3"></i>
                <h4 className="text-coffee">Passion</h4>
                <p>
                  Every cup is crafted with love and attention to detail, from bean 
                  selection to the final pour.
                </p>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="text-center">
                <i className="fas fa-users fa-3x text-coffee mb-3"></i>
                <h4 className="text-coffee">Community</h4>
                <p>
                  We're more than a coffee shop - we're a gathering place where 
                  friendships are made and stories are shared.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coffee Moments */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title text-coffee text-center mb-5">Coffee Moments</h2>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="gallery-item">
                <img 
                  src="https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=300&h=250&fit=crop" 
                  alt="Latte art"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="gallery-item">
                <img 
                  src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=250&fit=crop" 
                  alt="Coffee preparation"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="gallery-item">
                <img 
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=250&fit=crop" 
                  alt="Coffee beans"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="gallery-item">
                <img 
                  src="https://images.unsplash.com/photo-1559056199-5c4d4a0b0b0b?w=300&h=250&fit=crop" 
                  alt="Coffee brewing"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
