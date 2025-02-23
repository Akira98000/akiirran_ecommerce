import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

function Collection() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { getProductsByCategory, getFiltersByCategory, getProductsByFilter } = useProducts();

  useEffect(() => {
    // Réinitialiser le filtre actif lors du changement de catégorie
    setActiveFilter(null);
    // Charger tous les produits de la catégorie
    const products = getProductsByCategory(category);
    setFilteredProducts(products);
  }, [category]);

  useEffect(() => {
    // Mettre à jour les produits filtrés en fonction du filtre actif
    const products = activeFilter
      ? getProductsByFilter(category, activeFilter)
      : getProductsByCategory(category);
    setFilteredProducts(products);
    // Réinitialiser la pagination
    setCurrentPage(1);
  }, [activeFilter]);

  const filters = getFiltersByCategory(category);

  const handleFilterClick = (filter) => {
    // Si on clique sur le filtre déjà actif, le désactiver
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Pagination
  const productsPerPage = 8;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <main>
      <section className="collection">
        <h1>{category.toUpperCase()} CLOTHING COLLECTION</h1>
        <p className="collection-desc">
          Find everything you need to look and feel your best, and shop the latest {category.toLowerCase()}'s fashion and lifestyle products
        </p>

        <div className="category-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          ))}
          <button className="filter-btn-1">
            <i className="fa fa-sliders"></i>
          </button>
        </div>

        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="no-products-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <h2>Aucun produit disponible</h2>
              <p>Les produits pour cette catégorie arrivent bientôt</p>
            </div>
          ) : (
            currentProducts.map((product) => (
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
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="page-btn" 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className="page-btn" 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Collection; 