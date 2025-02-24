import { useState, useEffect } from 'react';
import { PortfolioConfig, defaultConfig } from '../config/portfolioConfig';

export const usePortfolioConfig = () => {
  const [config, setConfig] = useState<PortfolioConfig>(defaultConfig);

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('portfolioConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        // Ensure all required arrays exist
        const mergedConfig = {
          ...defaultConfig,
          ...parsedConfig,
          skills: parsedConfig.skills || defaultConfig.skills,
          software: parsedConfig.software || defaultConfig.software,
          projects: parsedConfig.projects || defaultConfig.projects,
          testimonials: parsedConfig.testimonials || defaultConfig.testimonials
        };
        setConfig(mergedConfig);
      } catch (error) {
        console.error('Error loading config:', error);
        setConfig(defaultConfig);
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
      current = current[path[i] as keyof typeof current] as any;
    }
    
    const lastKey = path[path.length - 1];
    (current as any)[lastKey] = value;
    
    setConfig(newConfig);
    localStorage.setItem('portfolioConfig', JSON.stringify(newConfig));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    localStorage.removeItem('portfolioConfig');
  };

  return { config, updateConfig, updateField, resetConfig };
};