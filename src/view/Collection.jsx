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
    const products = activeFilter
      ? getProductsByFilter(category, activeFilter)
      : getProductsByCategory(category);
    setFilteredProducts(products);
  }, [category, activeFilter]);

  useEffect(() => {
    const filters = getFiltersByCategory(category);
    if (filters.length > 0 && !activeFilter) {
      setActiveFilter(filters[0]);
    }
  }, [category]);

  const filters = getFiltersByCategory(category);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
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
          {currentProducts.map((product) => (
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