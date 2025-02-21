import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimatedCursor from 'react-animated-cursor';
import './assets/css/style.css';
import './assets/css/animations.css';
import './assets/css/man.css';
import './assets/css/detail.css';
import './assets/css/legal.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './view/Home';
import Collection from './view/Collection';
import Detail from './view/Detail';
import PromoBar from './components/PromoBar';
import TermsConditions from './view/legal/TermsConditions';
import PrivacyPolicy from './view/legal/PrivacyPolicy';
import CookiePolicy from './view/legal/CookiePolicy';

function App() {
  return (
    <Router>
      <div>
        <AnimatedCursor
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          hasBlendMode={true}
          innerStyle={{
            backgroundColor: '#000'
          }}
          outerStyle={{
            border: '3px solid #000'
          }}
        />
        <PromoBar />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection/:category" element={<Collection />} />
          <Route path="/product/:productId" element={<Detail />} />
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
