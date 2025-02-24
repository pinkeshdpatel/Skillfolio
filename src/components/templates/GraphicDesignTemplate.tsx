import React from 'react';
import { usePortfolioConfig } from '../../hooks/usePortfolioConfig';
import EditableText from '../EditableText';
import ImageUploader from '../ImageUploader';
import AddProjectModal from '../AddProjectModal';
import AddTestimonialModal from '../AddTestimonialModal';
import { Star, ChevronRight, ExternalLink, Share2 } from 'lucide-react';

const GraphicDesignTemplate: React.FC = () => {
  const { config, updateField } = usePortfolioConfig();
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [selectedProject, setSelectedProject] = React.useState<any>(null);
  const [showAddProject, setShowAddProject] = React.useState(false);
  const [showAddTestimonial, setShowAddTestimonial] = React.useState(false);
  const [showShareTooltip, setShowShareTooltip] = React.useState(false);

  const categories = ["all", ...new Set(config.projects.map(p => p.category))];
  const filteredProjects = activeCategory === "all" 
    ? config.projects 
    : config.projects.filter(p => p.category === activeCategory);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const handleAddProject = (project: any) => {
    updateField(['projects'], [...config.projects, project]);
  };

  const handleAddTestimonial = (testimonial: any) => {
    updateField(['testimonials'], [...config.testimonials, testimonial]);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <a href="#home" className="text-purple-400 hover:text-purple-300">Home</a>
              <a href="#work" className="text-white/70 hover:text-white">Work</a>
              <a href="#testimonials" className="text-white/70 hover:text-white">Testimonials</a>
              <a href="#contact" className="text-white/70 hover:text-white">Contact</a>
            </div>
            <div className="relative">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-full transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Portfolio</span>
              </button>
              {showShareTooltip && (
                <div className="absolute top-full right-0 mt-2 px-4 py-2 bg-green-500 text-white rounded-lg whitespace-nowrap">
                  Link copied to clipboard!
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 grid-background opacity-20"></div>
        <div className="absolute inset-0 mask-radial-faded bg-gradient-to-b from-purple-500/20 via-purple-900/5 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-left">
              <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 mb-6">
                <EditableText
                  value={config.hero.name}
                  onChange={(value) => updateField(['hero', 'name'], value)}
                />
              </div>
              <EditableText
                value={config.hero.title}
                onChange={(value) => updateField(['hero', 'title'], value)}
                className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
                as="h1"
              />
              <EditableText
                value={config.hero.description}
                onChange={(value) => updateField(['hero', 'description'], value)}
                className="text-xl text-white/70 max-w-2xl mb-12"
              />
              <div className="flex items-center gap-6">
                <a 
                  href="#work"
                  className="group bg-white px-8 py-4 rounded-full text-black font-medium hover:bg-purple-400 transition-all duration-300 flex items-center"
                >
                  View My Work
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#contact"
                  className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-all duration-300"
                >
                  Contact Me
                </a>
              </div>
            </div>
            <div className="flex-1 relative">
              <ImageUploader
                value={config.hero.image}
                onChange={(url) => updateField(['hero', 'image'], url)}
                className="aspect-square rounded-3xl overflow-hidden"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <h2 className="text-4xl font-bold">Selected Work</h2>
            <div className="flex flex-wrap gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    activeCategory === category
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-white/70'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                onClick={() => handleProjectClick(project)}
                className="group cursor-pointer relative aspect-square overflow-hidden rounded-2xl bg-white/5"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-purple-400 text-sm mb-2">{project.category}</div>
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-white/70">{project.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-white/70">What my clients say about working with me</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {config.testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10"
              >
                <div className="flex items-start gap-4 mb-6">
                  <ImageUploader
                    value={testimonial.image}
                    onChange={(url) => updateField(['testimonials', index, 'image'], url)}
                    className="w-16 h-16 rounded-full"
                    isProfileImage={true}
                  />
                  <div>
                    <h3 className="font-semibold text-xl">{testimonial.name}</h3>
                    <p className="text-white/70">{testimonial.role}</p>
                    <p className="text-purple-400">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-purple-500 text-purple-500" />
                  ))}
                </div>
                <p className="text-white/70 italic">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-gradient-to-b from-transparent to-purple-900/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's create something amazing together</h2>
          <p className="text-white/70 mb-12">Ready to transform your vision into reality? Let's discuss your project and create something extraordinary.</p>
          <a
            href={`mailto:${config.contact.email}`}
            className="inline-flex items-center bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full transition-colors"
          >
            Get in Touch
            <ChevronRight className="ml-2" />
          </a>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="relative w-full max-w-6xl bg-[#0A0A0A] rounded-2xl overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
            
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="space-y-6">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="text-purple-400 text-sm mb-2">{selectedProject.category}</div>
                  <h3 className="text-3xl font-bold mb-4">{selectedProject.title}</h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    {selectedProject.fullDescription || selectedProject.description}
                  </p>
                </div>
                
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full transition-colors"
                >
                  View Live Project
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProject && (
        <AddProjectModal
          onClose={() => setShowAddProject(false)}
          onSave={handleAddProject}
        />
      )}

      {/* Add Testimonial Modal */}
      {showAddTestimonial && (
        <AddTestimonialModal
          onClose={() => setShowAddTestimonial(false)}
          onSave={handleAddTestimonial}
        />
      )}
    </div>
  );
};

export default GraphicDesignTemplate;