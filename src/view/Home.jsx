import React, { useRef } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';

function useIntersectionObserver(elementRef, options = {}) {
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        elementRef.current.classList.add('visible');
      }
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, options]);
}

function Hero() {
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  
  useIntersectionObserver(textRef);
  useIntersectionObserver(buttonRef);

  const scrollToCollection = () => {
    const collection = document.getElementById('collection');
    if (collection) {
      collection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-text">
        <div ref={textRef} className="text-left fade-in-left">
          <h2>OUR NEW WINTER COLLECTION</h2>
          <p>
            Find out the best winter collection. Offering the best quality
            <br /> products in the Akirrran Winter Collection.
          </p>
        </div>
        <button ref={buttonRef} className="btn fade-in-right" onClick={scrollToCollection}>
          Découvrir la collection
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 6.75v10.5m0 0H6.75m10.5 0L6.75 6.75"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

function NewCollection() {
  const sectionRef = useRef(null);
  useIntersectionObserver(sectionRef);
  const { products } = useProducts();
  const navigate = useNavigate();

  const getRandomProducts = (allProducts, count) => {
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const selectedProducts = getRandomProducts(products, 8);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section ref={sectionRef} className="new-collection fade-in-up" id="collection">
      <h3>NEW WINTER COLLECTION</h3>
      <p>
        Our latest collection, where classic and contemporary style converge in
        <br />
        perfect harmony.
      </p>
      <div className="products-grid">
        {selectedProducts.map((product) => (
          <div 
            className="product-card" 
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={product.images ? product.images[0] : product.image} 
              alt={product.title} 
            />
            <div className="product-card-text">
              <h4>{product.title}</h4>
              <p className="desc">{product.desc}</p>
              <p className="price">{product.currentPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const navigate = useNavigate();

  useIntersectionObserver(card1Ref);
  useIntersectionObserver(card2Ref);
  useIntersectionObserver(card3Ref);

  const handleCategoryClick = (category) => {
    navigate(`/collection/${category}`);
  };

  return (
    <section className="categories">
      <div ref={card1Ref} className="category-card fade-in-left">
        <div className="category-overlay">
          <h4>MAN</h4>
          <button onClick={() => handleCategoryClick('men')}>See Details</button>
        </div>
      </div>
      <div ref={card2Ref} className="category-card fade-in-up">
        <div className="category-overlay">
          <h4>WOMAN</h4>
          <button onClick={() => handleCategoryClick('women')}>See Details</button>
        </div>
      </div>
      <div ref={card3Ref} className="category-card fade-in-right">
        <div className="category-overlay">
          <h4>KIDS</h4>
          <button onClick={() => handleCategoryClick('children')}>See Details</button>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <NewCollection />
      <Categories />
    </>
  );
}

export default Home; 