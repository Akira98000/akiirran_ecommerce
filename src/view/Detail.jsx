import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ShareOverlay from '../components/ShareOverlay';

function Detail() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const { productId } = useParams();
  const navigate = useNavigate();
  const { getProductById, getRecommendedProducts } = useProducts();
  const [isShareOpen, setIsShareOpen] = useState(false);

  const product = getProductById(productId);
  const recommendations = getRecommendedProducts(productId, product?.category, product?.type);
  const images = product?.images || [product?.image];

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const handleRecommendationClick = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  const openFullscreen = (index) => {
    setCurrentImageIndex(index);
    setFullscreenImage(images[index]);
    setScale(1);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    setScale(1);
    document.body.style.overflow = 'unset';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
    setFullscreenImage(images[newIndex]);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
    setFullscreenImage(images[newIndex]);
  };

  const handleZoom = (e) => {
    e.stopPropagation();
    setScale(scale === 1 ? 2 : 1);
  };

  return (
    <>
      <div className="product-container">
        <div className="product-gallery">
          <div className="main-images">
            {images.slice(0, 2).map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`Vue ${index + 1}`} 
                className="main-image" 
                onClick={() => openFullscreen(index)}
                style={{ cursor: 'zoom-in' }}
              />
            ))}
          </div>
          <div className="thumbnail-grid">
            {images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`Vue détaillée ${index + 1}`} 
                onClick={() => openFullscreen(index)}
                style={{ cursor: 'zoom-in' }}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          
          <div className="price-container">
            <span className="current-price">{product.currentPrice}</span>
            {product.originalPrice && (
              <>
                <span className="original-price">{product.originalPrice}</span>
                <span className="discount-tag">{product.discount}</span>
              </>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          {product.color && (
            <div className="color-section">
              <p>Colour:</p>
              <div className="color-option selected" style={{ backgroundColor: product.color }}></div>
            </div>
          )}

          {product.sizes && (
            <div className="size-section">
              <div className="size-header">
                <span>Clothing Size</span>
                <a href="#" className="size-guide">Sizing help?</a>
              </div>
              <div className="size-grid">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button className="add-to-bag">ADD TO BAG</button>
          <p className="viewing-info">27 PEOPLE ARE VIEWING THIS PRODUCT</p>

          {product.details && (
            <div className="product-details">
              <div className="accordion-section">
                {Object.entries(product.details).map(([key, value]) => (
                  <div className="accordion-item" key={key}>
                    <button
                      className={`accordion ${activeAccordion === key ? 'active' : ''}`}
                      onClick={() => toggleAccordion(key)}
                    >
                      {key.toUpperCase()} <i className="fas fa-chevron-down"></i>
                    </button>
                    <div className={`accordion-content ${activeAccordion === key ? 'active' : ''}`}>
                      {key === 'description' ? (
                        <>
                          <p>{value.text}</p>
                          <ul>
                            {value.bullets.map((bullet, index) => (
                              <li key={index}>{bullet}</li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <p>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button 
            onClick={() => setIsShareOpen(true)}
            style={{
              background: 'none',
              border: '1px solid #000',
              padding: '10px 20px',
              marginTop: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
            Partager
          </button>
        </div>
      </div>

      {fullscreenImage && (
        <div 
          className="fullscreen-overlay"
          onClick={closeFullscreen}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div 
            className="fullscreen-image-container"
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90%',
              maxHeight: '90%'
            }}
          >
            <img
              src={fullscreenImage}
              alt="Vue plein écran"
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                transform: `scale(${scale})`,
                transition: 'transform 0.3s ease',
                cursor: 'zoom-in'
              }}
              onClick={handleZoom}
            />
            
            <button
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: '-50px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            
            <button
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: '-50px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <ShareOverlay
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={window.location.href}
        title={product?.title}
      />

      {recommendations.length > 0 && (
        <section className="recommendations-section">
          <div className="recommendations-container">
            <h3>YOU MIGHT ALSO LIKE</h3>
            <div className="product-carousel">
              {recommendations.map((product) => (
                <div 
                  className="recommendation-card" 
                  key={product.id}
                  onClick={() => handleRecommendationClick(product.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <img 
                    src={product.images ? product.images[0] : product.image} 
                    alt={product.title} 
                  />
                  <div className="card-info">
                    <h4>{product.title}</h4>
                    <p className="desc">{product.desc}</p>
                    <p className="price">{product.currentPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Detail; 