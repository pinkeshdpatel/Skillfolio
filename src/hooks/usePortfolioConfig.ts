import { useState, useEffect } from 'react';
import { PortfolioConfig, defaultConfig } from '../config/portfolioConfig';

export const usePortfolioConfig = () => {
  const [config, setConfig] = useState<PortfolioConfig>(defaultConfig);

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('portfolioConfig');
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (error) {
        console.error('Error loading config:', error);
      }
    }
  }, []);

  const updateConfig = (newConfig: Partial<PortfolioConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    localStorage.setItem('portfolioConfig', JSON.stringify(updatedConfig));
  };

  const updateField = (path: string[], value: any) => {
    const newConfig = { ...config };
    let current = newConfig;
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i] as keyof typeof current];
    }
    
    const lastKey = path[path.length - 1];
    current[lastKey as keyof typeof current] = value;
    
    setConfig(newConfig);
    localStorage.setItem('portfolioConfig', JSON.stringify(newConfig));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    localStorage.removeItem('portfolioConfig');
  };

  return { config, updateConfig, updateField, resetConfig };
};