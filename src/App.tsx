import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TemplateSelection from './components/TemplateSelection';
import PortfolioTemplate from './components/PortfolioTemplate';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/templates/:category" element={<TemplateSelection />} />
        <Route path="/create/:templateId" element={<PortfolioTemplate />} />
        <Route path="/portfolio/:id" element={<PortfolioTemplate />} />
        <Route path="/edit/:id" element={<PortfolioTemplate />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;