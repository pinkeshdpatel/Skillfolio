import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

type Template = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  featured?: boolean;
};

const templates: Template[] = [
  {
    id: 'modern-portfolio',
    name: 'Modern Portfolio',
    description: 'A clean and modern design perfect for showcasing your creative work',
    thumbnail: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80',
    category: 'graphic-design'
  },
  {
    id: 'dev-showcase',
    name: 'Developer Showcase',
    description: 'A sleek dark theme portfolio for showcasing your apps and development projects',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
    category: 'development',
    featured: true
  }
];

const TemplateSelection: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  const filteredTemplates = templates.filter(t => t.category === category);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Categories
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-16">Choose a Template</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => navigate(`/create/${template.id}`)}
              className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500 transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-[4/3]">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{template.name}</h3>
                  {template.featured && (
                    <span className="px-2 py-1 text-xs bg-purple-500 text-white rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-white/70 text-sm">{template.description}</p>
                <div className="mt-4 flex justify-end">
                  <span className="text-purple-400 text-sm group-hover:translate-x-1 transition-transform">
                    Use Template →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TemplateSelection;