import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TemplateSelection from './components/TemplateSelection';
import PortfolioTemplate from './components/PortfolioTemplate';
import ProfilePage from './components/ProfilePage';
import GraphicDesignTemplate from './components/templates/GraphicDesignTemplate';
import DevelopmentTemplate from './components/templates/DevelopmentTemplate';

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
        <Route path="/templates/graphic" element={<GraphicDesignTemplate />} />
        <Route path="/templates/development" element={<DevelopmentTemplate />} />
        <Route path="/:username" element={<GraphicDesignTemplate />} />
      </Routes>
    </Router>
  );
}

export default App;