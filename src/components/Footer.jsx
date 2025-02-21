import React, { useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Newsletter from './Newsletter';

function useIntersectionObserver(elementRef, options = {}) {
  useEffect(() => {
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

function Footer() {
  const footerRef = useRef(null);
  useIntersectionObserver(footerRef);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/collection/${category}`);
  };

  return (
    <>
      <footer ref={footerRef} className="footer fade-in-up">
        <div className="footer-container">
          <Newsletter />
          <div className="footer-columns">
            <div className="footer-column">
              <h4>Catégories</h4>
              <ul>
                <li onClick={() => handleCategoryClick('men')}>Homme</li>
                <li onClick={() => handleCategoryClick('women')}>Femme</li>
                <li onClick={() => handleCategoryClick('children')}>Enfant</li>
                <li onClick={() => handleCategoryClick('gift')}>Cadeaux</li>
                <li onClick={() => handleCategoryClick('new-arrival')}>Nouveautés</li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Réseaux Sociaux</h4>
              <ul>
                <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">Youtube</a></li>
                <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Contact</h4>
              <ul>
                <li>Boutique : 2 Boulevard de Belgique - 98000 Monaco</li>
                <li>Bureau : 123 Rue de la Paix - 75000 Paris</li>
                <li>Téléphone : +377 98 76 54 32</li>
                <li>Email : contact@akirran.com</li>
                <li>Horaires : 9:00 - 18:00</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-bottom">
        <p>© 2025 Akirran Web Production</p>
        <div className="footer-links">
          <Link to="/terms">Conditions Générales</Link>
          <Link to="/privacy">Politique de Confidentialité</Link>
          <Link to="/cookies">Politique des Cookies</Link>
        </div>
      </div>
    </>
  );
}

export default Footer; 