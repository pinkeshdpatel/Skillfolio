import { useState, useEffect } from 'react';
import { PortfolioConfig, defaultConfig } from '../config/portfolioConfig';

export const usePortfolioConfig = () => {
  const [config, setConfig] = useState<PortfolioConfig>(defaultConfig);
  const [isViewMode, setIsViewMode] = useState(false);

  // Check for view mode and shared config ID in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedId = urlParams.get('share');
    const template = urlParams.get('template');
    
    if (sharedId) {
      setIsViewMode(true);
      // Try to load shared configuration from localStorage
      const savedConfigs = localStorage.getItem('sharedPortfolios');
      if (savedConfigs) {
        try {
          const configs = JSON.parse(savedConfigs);
          const sharedConfig = configs[sharedId];
          if (sharedConfig) {
            setConfig(sharedConfig);
            return;
          }
        } catch (error) {
          console.error('Error loading shared config:', error);
        }
      }
    } else {
      // Load config from localStorage for editing mode
      const savedConfig = localStorage.getItem('portfolioConfig');
      if (savedConfig) {
        try {
          const parsedConfig = JSON.parse(savedConfig);
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
    }
  }, []);

  const updateConfig = (newConfig: Partial<PortfolioConfig>) => {
    if (isViewMode) return; // Prevent updates in view mode
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    localStorage.setItem('portfolioConfig', JSON.stringify(updatedConfig));
  };

  const updateField = (path: string[], value: any) => {
    if (isViewMode) return; // Prevent updates in view mode
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

  const generateShareableLink = () => {
    if (!config) return '';
    
    // Generate a unique ID for the shared config
    const sharedId = Math.random().toString(36).substring(2, 15);
    
    // Save the current config to shared portfolios in localStorage
    const savedConfigs = localStorage.getItem('sharedPortfolios');
    const configs = savedConfigs ? JSON.parse(savedConfigs) : {};
    configs[sharedId] = config;
    localStorage.setItem('sharedPortfolios', JSON.stringify(configs));
    
    // Get the current template from the URL
    const currentPath = window.location.pathname;
    const template = currentPath.includes('development') ? 'development' : 'graphic';
    
    // Generate the shareable URL
    const baseUrl = window.location.origin;
    return `${baseUrl}/templates/${template}?share=${sharedId}`;
  };

  const resetConfig = () => {
    if (isViewMode) return; // Prevent reset in view mode
    setConfig(defaultConfig);
    localStorage.removeItem('portfolioConfig');
  };

  return { 
    config, 
    updateConfig, 
    updateField, 
    resetConfig, 
    isViewMode,
    generateShareableLink 
  };
};