import React from 'react';

const Gallery = () => {
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop",
      alt: "Latte Art",
      title: "Latte Art"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
      alt: "Coffee Preparation",
      title: "Coffee Preparation"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
      alt: "Coffee Beans",
      title: "Premium Beans"
    },
    {
      id: 4,
      src: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg?quality=90&resize=500,454",
      alt: "Flat White Coffee",
      title: "Flat White"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
      alt: "Coffee Shop Interior",
      title: "Our Space"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=300&fit=crop",
      alt: "Coffee Cup",
      title: "Perfect Cup"
    },
    {
      id: 7,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNw2aFKeANiMl5a4RQgvtw6y-n03cTqLWBHg&s",
      alt: "Coffee Shop",
      title: "Coffee Shop"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
      alt: "Cold Brew",
      title: "Cold Brew"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="display-4 fw-bold hero-text mb-4">Gallery</h1>
              <p className="lead hero-text">
                A visual journey through our coffee world
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {galleryImages.map(image => (
              <div key={image.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="gallery-item">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="img-fluid"
                  />
                  <div className="overlay d-flex align-items-center justify-content-center">
                    <h5 className="text-white text-center">{image.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
