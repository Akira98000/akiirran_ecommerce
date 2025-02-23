import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/style.css';
import './assets/css/animations.css';
import './assets/css/man.css';
import './assets/css/detail.css';
import './assets/css/legal.css';
import './assets/css/cart.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './view/Home';
import Collection from './view/Collection';
import Detail from './view/Detail';
import Cart from './view/Cart';
import PromoBar from './components/PromoBar';
import TermsConditions from './view/legal/TermsConditions';
import PrivacyPolicy from './view/legal/PrivacyPolicy';
import CookiePolicy from './view/legal/CookiePolicy';
import PremiumCursor from './components/PremiumCursor';

function App() {
  return (
    <Router>
      <div>
        <PremiumCursor />
        <PromoBar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection/:category" element={<Collection />} />
          <Route path="/product/:productId" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
