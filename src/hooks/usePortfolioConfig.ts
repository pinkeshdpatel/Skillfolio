import { useState, useEffect } from 'react';
import { PortfolioConfig, defaultConfig } from '../config/portfolioConfig';

export type SharedConfig = {
  config: PortfolioConfig;
  templateType: 'graphic' | 'development';
};

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
  const [templateType, setTemplateType] = useState<'graphic' | 'development'>('graphic');

  // Check for view mode and shared config ID in URL
  useEffect(() => {
    const loadConfig = async () => {
      try {
        setIsLoading(true);
        const pathParts = window.location.pathname.split('/');
        const username = pathParts[1]; // Get username from URL path
        
        // Set template type based on URL if creating new
        if (pathParts[1] === 'templates' && pathParts[2]) {
          setTemplateType(pathParts[2] as 'graphic' | 'development');
        }
        
        if (username && username !== 'templates' && username !== 'create') {
          setIsViewMode(true);
          // Try to load shared configuration from localStorage
          const savedConfigs = localStorage.getItem('sharedPortfolios');
          
          if (savedConfigs) {
            const configs = JSON.parse(savedConfigs);
            const sharedData = configs[username] as SharedConfig;
            
            if (sharedData) {
              // Set template type from shared data
              setTemplateType(sharedData.templateType);
              
              // Deep clone the shared config to avoid reference issues
              const mergedConfig = {
                ...defaultConfig,
                ...JSON.parse(JSON.stringify(sharedData.config)),
                hero: {
                  ...defaultConfig.hero,
                  ...sharedData.config.hero
                },
                skills: sharedData.config.skills || [...defaultConfig.skills],
                software: sharedData.config.software || [...defaultConfig.software],
                projects: sharedData.config.projects || [...defaultConfig.projects],
                testimonials: sharedData.config.testimonials || [...defaultConfig.testimonials],
                clients: sharedData.config.clients || [...defaultConfig.clients],
                contact: {
                  ...defaultConfig.contact,
                  ...sharedData.config.contact
                }
              };
              setConfig(mergedConfig);
            } else {
              console.error('Shared configuration not found');
              // Keep default config if shared config is not found
            }
          }
        } else {
          setIsViewMode(false);
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
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    loadConfig();
  }, []);

  const updateConfig = (newConfig: Partial<PortfolioConfig>) => {
    if (isViewMode) return;
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    localStorage.setItem('portfolioConfig', JSON.stringify(updatedConfig));
  };

  const updateField = (path: string[], value: any) => {
    if (isViewMode) return;
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

  const generateShareableLink = (customUsername?: string) => {
    try {
      // Use custom username if provided, otherwise generate from hero name
      let username = customUsername;
      if (!username) {
        username = config.hero.name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '')
          .replace(/\s+/g, '');
      }
      
      // Sanitize the username to ensure it's URL-safe
      username = username
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '')
        .replace(/\s+/g, '-');
      
      // Create a deep clone of the current config
      const configToShare = JSON.parse(JSON.stringify(config));
      
      // Get or initialize shared configs
      const savedConfigs = localStorage.getItem('sharedPortfolios') || '{}';
      const configs = JSON.parse(savedConfigs);
      
      // Save the config using username as the key, including template type
      configs[username] = {
        config: configToShare,
        templateType
      };
      localStorage.setItem('sharedPortfolios', JSON.stringify(configs));
      
      // Generate the shareable URL with username
      const baseUrl = window.location.origin;
      const shareableLink = `${baseUrl}/${username}`;
      return shareableLink;
    } catch (error) {
      console.error('Error generating shareable link:', error);
      return '';
    }
  };

  const resetConfig = () => {
    if (isViewMode) return;
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
    isLoading,
    templateType
  };
};