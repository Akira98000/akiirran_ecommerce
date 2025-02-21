import { useState, useEffect } from 'react';
import productsData from '../data/products.json';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    setProducts(productsData.products);
    setCategories(productsData.categories);
  }, []);

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const getFiltersByCategory = (category) => {
    return categories[category]?.filters || [];
  };

  const getProductsByFilter = (category, filter) => {
    return products.filter(product => 
      product.category === category && 
      product.type === filter
    );
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getRecommendedProducts = (currentProductId, category, type, limit = 4) => {
    // Filtrer les produits de la même catégorie et du même type, sauf le produit actuel
    const similarProducts = products.filter(product => 
      product.category === category &&
      product.type === type &&
      product.id !== parseInt(currentProductId)
    );

    // Si pas assez de produits du même type, ajouter des produits de la même catégorie
    if (similarProducts.length < limit) {
      const otherCategoryProducts = products.filter(product => 
        product.category === category &&
        product.type !== type &&
        product.id !== parseInt(currentProductId)
      );
      
      return shuffleArray([...similarProducts, ...otherCategoryProducts])
        .slice(0, limit);
    }

    // Sinon, retourner des produits aléatoires du même type
    return shuffleArray(similarProducts).slice(0, limit);
  };

  return {
    products,
    categories,
    getProductsByCategory,
    getProductById,
    getFiltersByCategory,
    getProductsByFilter,
    getRecommendedProducts
  };
} 