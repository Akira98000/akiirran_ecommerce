import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeItem, toggleFavorite } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxes = subtotal * 0.11; // 11% tax rate
  const total = subtotal + taxes;

  const handleCheckout = () => {
    alert("Redirection vers la page de paiement...");
  };

  const handlePayPal = () => {
    alert("Redirection vers PayPal...");
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="empty-cart-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        <h2>Votre panier est vide</h2>
        <p>Découvrez nos collections et ajoutez des articles à votre panier</p>
        <Link to="/collection/men" className="continue-shopping-btn">
          Continuer mes achats
        </Link>
      </div>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <div className="cart-section">
          <h2>Votre panier</h2>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <div 
                  className="item-image"
                  onClick={() => handleProductClick(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <div className="item-header">
                    <h3 
                      onClick={() => handleProductClick(item.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {item.name}
                    </h3>
                    <div className="item-actions-icons">
                      <button 
                        className="action-btn"
                        onClick={() => toggleFavorite(item.id, item.size)}
                      >
                        <i className={`far fa-heart ${item.isFavorite ? 'active' : ''}`}></i>
                      </button>
                      <button 
                        className="action-btn"
                        onClick={() => removeItem(item.id, item.size)}
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                  <div className="item-variant">
                    <p>Size : {item.size}</p>
                    <p>Color : {item.color}</p>
                    <p>Brand : ... </p>
                  </div>
                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <div className="item-price">
                      {(item.price * item.quantity).toFixed(2)}€
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="summary-section">
          <h2>Résumé de la commande</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)}€</span>
            </div>
            <div className="summary-row">
              <span>Taxes (11%)</span>
              <span>{taxes.toFixed(2)}€</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{total.toFixed(2)}€</span>
            </div>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Procéder au paiement
          </button>
          <button className="paypal-btn" onClick={handlePayPal}>
            <i className="fab fa-paypal"></i>
            Payer avec PayPal
          </button>
        </div>
      </div>
    </main>
  );
}

export default Cart; 