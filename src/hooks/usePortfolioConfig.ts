import { useState, useEffect } from 'react';
import { PortfolioConfig, defaultConfig } from '../config/portfolioConfig';

export const usePortfolioConfig = () => {
  const [config, setConfig] = useState<PortfolioConfig>({
    ...defaultConfig,
    hero: { ...defaultConfig.hero },
    skills: [...defaultConfig.skills],
    software: [...defaultConfig.software],
    projects: [...defaultConfig.projects],
    testimonials: [...defaultConfig.testimonials],
    clients: [...defaultConfig.clients],
    contact: { ...defaultConfig.contact }
  });
  const [isViewMode, setIsViewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for view mode and shared config ID in URL
  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true);
        const urlParams = new URLSearchParams(window.location.search);
        const sharedId = urlParams.get('share');
        
        console.log('Loading config with sharedId:', sharedId);
        
        if (sharedId) {
          setIsViewMode(true);
          // Try to load shared configuration from localStorage
          const savedConfigs = localStorage.getItem('sharedPortfolios');
          console.log('Saved shared configs:', savedConfigs);
          
          if (savedConfigs) {
            const configs = JSON.parse(savedConfigs);
            const sharedConfig = configs[sharedId];
            console.log('Found shared config:', sharedConfig);
            
            if (sharedConfig) {
              // Merge with default config to ensure all required fields exist
              const mergedConfig = {
                ...defaultConfig,
                ...sharedConfig,
                hero: {
                  ...defaultConfig.hero,
                  ...sharedConfig.hero
                },
                skills: sharedConfig.skills || [...defaultConfig.skills],
                software: sharedConfig.software || [...defaultConfig.software],
                projects: sharedConfig.projects || [...defaultConfig.projects],
                testimonials: sharedConfig.testimonials || [...defaultConfig.testimonials],
                clients: sharedConfig.clients || [...defaultConfig.clients],
                contact: {
                  ...defaultConfig.contact,
                  ...sharedConfig.contact
                }
              };
              console.log('Setting merged config:', mergedConfig);
              setConfig(mergedConfig);
            }
          }
        } else {
          // Load config from localStorage for editing mode
          const savedConfig = localStorage.getItem('portfolioConfig');
          if (savedConfig) {
            const parsedConfig = JSON.parse(savedConfig);
            const mergedConfig = {
              ...defaultConfig,
              ...parsedConfig,
              hero: {
                ...defaultConfig.hero,
                ...parsedConfig.hero
              },
              skills: parsedConfig.skills || [...defaultConfig.skills],
              software: parsedConfig.software || [...defaultConfig.software],
              projects: parsedConfig.projects || [...defaultConfig.projects],
              testimonials: parsedConfig.testimonials || [...defaultConfig.testimonials],
              clients: parsedConfig.clients || [...defaultConfig.clients],
              contact: {
                ...defaultConfig.contact,
                ...parsedConfig.contact
              }
            };
            setConfig(mergedConfig);
          }
        }
      } catch (error) {
        console.error('Error loading config:', error);
        // Reset to default config on error
        setConfig({
          ...defaultConfig,
          hero: { ...defaultConfig.hero },
          skills: [...defaultConfig.skills],
          software: [...defaultConfig.software],
          projects: [...defaultConfig.projects],
          testimonials: [...defaultConfig.testimonials],
          clients: [...defaultConfig.clients],
          contact: { ...defaultConfig.contact }
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, [window.location.search]);

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
    // Generate a unique ID for the shared config
    const sharedId = Math.random().toString(36).substring(2, 15);
    
    try {
      // Save a complete copy of the current config
      const configToShare = {
        ...config,
        hero: { ...config.hero },
        skills: [...config.skills],
        software: [...config.software],
        projects: [...config.projects],
        testimonials: [...config.testimonials],
        clients: [...config.clients],
        contact: { ...config.contact }
      };
      
      // Get or initialize shared configs
      const savedConfigs = localStorage.getItem('sharedPortfolios') || '{}';
      const configs = JSON.parse(savedConfigs);
      
      // Save the config
      configs[sharedId] = configToShare;
      localStorage.setItem('sharedPortfolios', JSON.stringify(configs));
      console.log('Saved shared config:', configToShare);
      
      // Generate the shareable URL
      const currentPath = window.location.pathname;
      const template = currentPath.includes('development') ? 'development' : 'graphic';
      const baseUrl = window.location.origin;
      const shareableLink = `${baseUrl}/templates/${template}?share=${sharedId}`;
      console.log('Generated shareable link:', shareableLink);
      return shareableLink;
    } catch (error) {
      console.error('Error generating shareable link:', error);
      return '';
    }
  };

  const resetConfig = () => {
    if (isViewMode) return; // Prevent reset in view mode
    const freshConfig = {
      ...defaultConfig,
      hero: { ...defaultConfig.hero },
      skills: [...defaultConfig.skills],
      software: [...defaultConfig.software],
      projects: [...defaultConfig.projects],
      testimonials: [...defaultConfig.testimonials],
      clients: [...defaultConfig.clients],
      contact: { ...defaultConfig.contact }
    };
    setConfig(freshConfig);
    localStorage.removeItem('portfolioConfig');
  };

  return { 
    config, 
    updateConfig, 
    updateField, 
    resetConfig, 
    isViewMode,
    generateShareableLink,
    isLoading
  };
};