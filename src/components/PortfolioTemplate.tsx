import React from 'react';
import { useParams } from 'react-router-dom';
import DevelopmentTemplate from './templates/DevelopmentTemplate';
import GraphicDesignTemplate from './templates/GraphicDesignTemplate';

const PortfolioTemplate: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();

  // Render the appropriate template based on the templateId
  switch (templateId) {
    case 'dev-showcase':
      return <DevelopmentTemplate />;
    case 'modern-portfolio':
      return <GraphicDesignTemplate />;
    default:
      return <div>Template not found</div>;
  }
};

export default PortfolioTemplate;