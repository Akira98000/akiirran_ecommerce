import { useState, useEffect } from 'react';

export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product, selectedSize) => {
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      const existingItemIndex = newItems.findIndex(
        item => item.id === product.id && item.size === selectedSize
      );

      if (existingItemIndex >= 0) {
        newItems[existingItemIndex].quantity += 1;
      } else {
        newItems.push({
          id: product.id,
          name: product.title,
          image: product.images ? product.images[0] : product.image,
          size: selectedSize,
          price: parseFloat(product.currentPrice.replace('€', '')),
          quantity: 1,
          color: product.color,
          isFavorite: false
        });
      }

      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const updateQuantity = (id, size, change) => {
    setCartItems(prevItems => {
      const newItems = prevItems.map(item => {
        if (item.id === id && item.size === size) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeItem = (id, size) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(
        item => !(item.id === id && item.size === size)
      );
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const toggleFavorite = (id, size) => {
    setCartItems(prevItems => {
      const newItems = prevItems.map(item => {
        if (item.id === id && item.size === size) {
          return { ...item, isFavorite: !item.isFavorite };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    toggleFavorite
  };
} 