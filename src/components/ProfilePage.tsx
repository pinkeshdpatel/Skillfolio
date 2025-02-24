import React from 'react';
import { Plus, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

type Portfolio = {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  thumbnail: string;
};

const ProfilePage: React.FC = () => {
  // This would typically come from a backend service
  const portfolios: Portfolio[] = [
    {
      id: '1',
      name: 'Personal Portfolio',
      description: 'My main portfolio showcasing web development projects',
      lastModified: '2024-03-15',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80'
    },
    {
      id: '2',
      name: 'Design Portfolio',
      description: 'Collection of my UI/UX design work',
      lastModified: '2024-03-14',
      thumbnail: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80'
    }
  ];

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log('Delete portfolio:', id);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">My Portfolios</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Create New Portfolio Card */}
          <Link
            to="/create"
            className="group h-[400px] bg-white/5 rounded-2xl border-2 border-dashed border-white/20 hover:border-purple-500 transition-colors flex flex-col items-center justify-center gap-4 p-8"
          >
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
              <Plus className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Create New Portfolio</h3>
              <p className="text-white/70">Start with a blank canvas and create your perfect portfolio</p>
            </div>
          </Link>

          {/* Portfolio Cards */}
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10"
            >
              <div className="aspect-video relative">
                <img
                  src={portfolio.thumbnail}
                  alt={portfolio.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <Link
                    to={`/edit/${portfolio.id}`}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <Pencil className="w-5 h-5" />
                  </Link>
                  <a
                    href={`/portfolio/${portfolio.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => handleDelete(portfolio.id)}
                    className="p-2 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{portfolio.name}</h3>
                <p className="text-white/70 mb-4">{portfolio.description}</p>
                <div className="text-sm text-white/50">
                  Last modified: {new Date(portfolio.lastModified).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;