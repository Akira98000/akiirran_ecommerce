import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

function SearchOverlay({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const { products, categories } = useProducts();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const query = searchQuery.toLowerCase();
      const results = products.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query)
      ).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, products]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="search-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '100px',
        zIndex: 1000
      }}
    >
      <div 
        className="search-container"
        onClick={e => e.stopPropagation()}
        style={{
          width: '600px',
          maxWidth: '90%',
          position: 'relative'
        }}
      >
        <div style={{ position: 'relative', marginBottom: '30px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher..."
            autoFocus
            style={{
              width: '100%',
              padding: '15px 0',
              fontSize: '24px',
              border: 'none',
              borderBottom: '2px solid white',
              background: 'transparent',
              color: 'white',
              outline: 'none',
              transition: 'all 0.3s ease',
              '::placeholder': {
                color: 'rgba(255, 255, 255, 1.0)'
              }
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            style={{
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '24px',
              height: '24px'
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>

        {searchResults.length > 0 && (
          <div 
            className="search-results"
            style={{
              background: 'transparent',
              marginTop: '20px'
            }}
          >
            {searchResults.map(product => (
              <div 
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                style={{
                  padding: '20px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.paddingLeft = '10px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.paddingLeft = '0';
                }}
              >
                <img 
                  src={product.images ? product.images[0] : product.image}
                  alt={product.title}
                  style={{
                    width: '70px',
                    height: '90px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    margin: '0 0 8px 0',
                    fontSize: '18px',
                    fontWeight: '500'
                  }}>
                    {product.title}
                  </h4>
                  <p style={{ 
                    margin: 0,
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px',
                    fontWeight: '300'
                  }}>
                    {product.brand} • {product.category} • {product.type}
                  </p>
                </div>
                <span style={{ 
                  fontWeight: '500',
                  fontSize: '16px',
                  color: 'white'
                }}>
                  {product.currentPrice}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchOverlay; 