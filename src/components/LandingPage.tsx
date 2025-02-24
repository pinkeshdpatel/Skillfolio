import React, { useState } from 'react';
import { ArrowRight, Palette, Code, Camera, Video, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';
import { HeroSection } from './ui/HeroSection';
import { TestimonialsSection } from './ui/TestimonialsSection';
import { BentoGrid, type BentoItem } from './ui/bento-grid';

const categories: BentoItem[] = [
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Showcase your visual design projects and creative work',
    icon: <Palette className="w-6 h-6 text-purple-400" />,
    tags: ['Branding', 'UI/UX', 'Print'],
    status: 'Popular'
  },
  {
    id: 'development',
    title: 'Development',
    description: 'Display your coding projects and technical expertise',
    icon: <Code className="w-6 h-6 text-blue-400" />,
    tags: ['Web', 'Mobile', 'API'],
    status: 'New'
  },
  {
    id: 'photography',
    title: 'Photography',
    description: 'Present your photography portfolio and visual stories',
    icon: <Camera className="w-6 h-6 text-amber-400" />,
    tags: ['Portrait', 'Landscape']
  },
  {
    id: 'video',
    title: 'Video Production',
    description: 'Share your video projects and cinematography work',
    icon: <Video className="w-6 h-6 text-red-400" />,
    tags: ['Film', 'Animation']
  }
];

const testimonials = [
  {
    author: {
      name: "Sarah Chen",
      handle: "@sarahdesign",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "Skillfolio transformed how I showcase my work. The templates are stunning and the customization options are endless!",
    href: "https://twitter.com/sarahdesign"
  },
  {
    author: {
      name: "Alex Rivera",
      handle: "@alexdev",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "As a developer, I love how clean and professional my portfolio looks. It took minutes to set up and the results are amazing.",
    href: "https://twitter.com/alexdev"
  },
  {
    author: {
      name: "Emily Zhang",
      handle: "@emilyart",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "The best portfolio platform for creatives! My artwork has never looked better online. Highly recommend!"
  }
];

const LandingPage: React.FC = () => {
  const { user, signIn, signUp, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const categoryItems = categories.map(category => ({
    ...category,
    href: user ? `/templates/${category.id}` : undefined,
    onClick: !user ? () => setShowAuthModal(true) : undefined
  }));

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gradient">
              Skillfolio
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{user.email}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#0A0A0A] rounded-lg shadow-lg border border-white/10 overflow-hidden">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-white/5 transition-colors"
                    >
                      My Portfolios
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-white/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection
        title="Welcome to Skillfolio"
        subtitle={{
          regular: "Create your professional portfolio ",
          gradient: "in minutes.",
        }}
        description="Showcase your work with stunning templates designed for creative professionals. Choose your category, customize your portfolio, and share your story with the world."
        ctaText={user ? "Create Portfolio" : "Get Started"}
        ctaHref={user ? "/profile" : "#"}
        bottomImage={{
          light: "/hero-image.jpeg",
          dark: "/hero-image.jpeg"
        }}
        gridOptions={{
          angle: 65,
          opacity: 0.4,
          cellSize: 50,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
      />

      {/* Categories Section */}
      <section id="categories" className="py-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Choose Your Category</h2>
          <BentoGrid items={categoryItems} />
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection
        title="Loved by creative professionals"
        description="Join thousands of designers, developers, and creators who are already showcasing their work with Skillfolio"
        testimonials={testimonials}
      />

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSignIn={signIn}
          onSignUp={signUp}
        />
      )}
    </div>
  );
};

export default LandingPage;