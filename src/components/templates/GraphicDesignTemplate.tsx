import React from 'react';
import { usePortfolioConfig } from '../../hooks/usePortfolioConfig';
import EditableText from '../EditableText';
import ImageUploader from '../ImageUploader';
import AddProjectModal from '../AddProjectModal';
import AddTestimonialModal from '../AddTestimonialModal';
import { Star, ChevronRight, ExternalLink, Share2, Plus, Pencil } from 'lucide-react';

const GraphicDesignTemplate: React.FC = () => {
  const { config, updateField, isViewMode, generateShareableLink } = usePortfolioConfig();
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [selectedProject, setSelectedProject] = React.useState<any>(null);
  const [showAddProject, setShowAddProject] = React.useState(false);
  const [showAddTestimonial, setShowAddTestimonial] = React.useState(false);
  const [showShareTooltip, setShowShareTooltip] = React.useState(false);
  const [editingSkill, setEditingSkill] = React.useState<number | null>(null);
  const [editingSoftware, setEditingSoftware] = React.useState<number | null>(null);

  // Initialize config with default values if not present
  React.useEffect(() => {
    if (!config.skills) {
      updateField(['skills'], []);
    }
    if (!config.software) {
      updateField(['software'], []);
    }
    if (!config.projects) {
      updateField(['projects'], []);
    }
    if (!config.testimonials) {
      updateField(['testimonials'], []);
    }
  }, [config]);

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

  const handleDeleteProject = (index: number) => {
    const newProjects = config.projects.filter((_, i) => i !== index);
    updateField(['projects'], newProjects);
  };

  const handleAddTestimonial = (testimonial: any) => {
    updateField(['testimonials'], [...config.testimonials, testimonial]);
  };

  const handleDeleteTestimonial = (index: number) => {
    const newTestimonials = config.testimonials.filter((_, i) => i !== index);
    updateField(['testimonials'], newTestimonials);
  };

  const handleShare = async () => {
    try {
      const shareableLink = generateShareableLink();
      await navigator.clipboard.writeText(shareableLink);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleAddSkill = () => {
    const newSkill = {
      name: "New Skill",
      proficiency: 50,
      category: "Design"
    };
    const currentSkills = config.skills || [];
    updateField(['skills'], [...currentSkills, newSkill]);
  };

  const handleAddSoftware = () => {
    const newSoftware = {
      name: "New Software",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      proficiency: 50
    };
    const currentSoftware = config.software || [];
    updateField(['software'], [...currentSoftware, newSoftware]);
  };

  const handleUpdateSkill = (index: number, field: string, value: string | number) => {
    const currentSkills = [...(config.skills || [])];
    currentSkills[index] = { ...currentSkills[index], [field]: value };
    updateField(['skills'], currentSkills);
  };

  const handleUpdateSoftware = (index: number, field: string, value: string | number) => {
    const currentSoftware = [...(config.software || [])];
    currentSoftware[index] = { ...currentSoftware[index], [field]: value };
    updateField(['software'], currentSoftware);
  };

  const handleDeleteSkill = (index: number) => {
    const currentSkills = config.skills || [];
    const newSkills = currentSkills.filter((_, i) => i !== index);
    updateField(['skills'], newSkills);
  };

  const handleDeleteSoftware = (index: number) => {
    const currentSoftware = config.software || [];
    const newSoftware = currentSoftware.filter((_, i) => i !== index);
    updateField(['software'], newSoftware);
  };

  // Conditionally render edit buttons and controls
  const renderEditButton = (onClick: () => void, children: React.ReactNode) => {
    if (isViewMode) return null;
    return (
      <button onClick={onClick} className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-500 hover:bg-purple-600 transition-all">
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <a href="#home" className="text-purple-400 hover:text-purple-300 transition-colors">Home</a>
              <a href="#work" className="text-white/70 hover:text-white transition-colors">Work</a>
              <a href="#testimonials" className="text-white/70 hover:text-white transition-colors">Testimonials</a>
              <a href="#contact" className="text-white/70 hover:text-white transition-colors">Contact</a>
            </div>
            {!isViewMode && (
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-2.5 bg-purple-500 hover:bg-purple-600 rounded-full transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Portfolio</span>
                </button>
                {showShareTooltip && (
                  <div className="absolute top-full right-0 mt-2 px-4 py-2 bg-green-500 text-white rounded-full whitespace-nowrap">
                    Link copied to clipboard!
                  </div>
                )}
              </div>
            )}
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
              {isViewMode ? (
                <>
                  <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 mb-6">
                    {config.hero.name}
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                    {config.hero.title}
                  </h1>
                  <p className="text-xl text-white/70 max-w-2xl mb-12">
                    {config.hero.description}
                  </p>
                </>
              ) : (
                <>
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
                </>
              )}
              <div className="flex items-center gap-6">
                <a 
                  href="#work"
                  className="group flex items-center gap-2 bg-white px-6 py-2.5 rounded-full text-black font-medium hover:bg-purple-400 transition-all duration-300"
                >
                  View My Work
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#contact"
                  className="px-6 py-2.5 rounded-full border border-white/20 hover:bg-white/5 transition-all duration-300"
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

      {/* Skills Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold">Skills & Expertise</h2>
            {renderEditButton(handleAddSkill, (
              <>
                <Plus className="w-4 h-4" />
                Add Skill
              </>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {(config.skills || []).map((skill, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-purple-500/5 to-purple-900/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/20 transition-all"
              >
                {editingSkill === index ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => handleUpdateSkill(index, 'name', e.target.value)}
                      className="w-full bg-white/10 rounded-lg px-3 py-2 text-white"
                    />
                    <input
                      type="text"
                      value={skill.category}
                      onChange={(e) => handleUpdateSkill(index, 'category', e.target.value)}
                      className="w-full bg-white/10 rounded-lg px-3 py-2 text-white"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.proficiency}
                      onChange={(e) => handleUpdateSkill(index, 'proficiency', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <button
                      onClick={() => setEditingSkill(null)}
                      className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-semibold mb-2">{skill.name}</h3>
                        <p className="text-purple-400 text-sm uppercase tracking-wider font-medium">{skill.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingSkill(index)}
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(index)}
                          className="p-2 rounded-full bg-red-500/80 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    <div className="relative w-full h-3 bg-purple-900/20 rounded-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-purple-600"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                    <span className="block mt-2 text-sm text-purple-300">{skill.proficiency}% Proficiency</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Software Proficiency Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold">Software Proficiency</h2>
            {renderEditButton(handleAddSoftware, (
              <>
                <Plus className="w-4 h-4" />
                Add Software
              </>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(config.software || []).map((software, index) => (
              <div
                key={index}
                className="group relative bg-[#1c1c1c] rounded-full p-4 border border-[#333] hover:bg-[#2a2a2a] hover:border-purple-500/50 transition-all duration-300"
              >
                {editingSoftware === index ? (
                  <div className="space-y-4 p-4">
                    <input
                      type="text"
                      value={software.name}
                      onChange={(e) => handleUpdateSoftware(index, 'name', e.target.value)}
                      className="w-full bg-[#2a2a2a] rounded-lg px-3 py-2 text-white border border-[#333]"
                      placeholder="Software Name"
                    />
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Software Icon URL
                      </label>
                      <input
                        type="text"
                        value={software.icon}
                        onChange={(e) => handleUpdateSoftware(index, 'icon', e.target.value)}
                        className="w-full bg-[#2a2a2a] rounded-lg px-3 py-2 text-white border border-[#333]"
                        placeholder="Icon URL"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Proficiency Level
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={software.proficiency}
                        onChange={(e) => handleUpdateSoftware(index, 'proficiency', parseInt(e.target.value))}
                        className="w-full accent-purple-500"
                      />
                      <span className="text-sm text-white/70">{software.proficiency}%</span>
                    </div>
                    <button
                      onClick={() => setEditingSoftware(null)}
                      className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4 px-2">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 rounded-full bg-[#2a2a2a] p-2 flex items-center justify-center border border-[#333]">
                        <img
                          src={software.icon}
                          alt={software.name}
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-white">{software.name}</h3>
                        <div className="relative w-full h-1 bg-[#333] rounded-full overflow-hidden mt-2">
                          <div
                            className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-purple-600"
                            style={{ width: software.proficiency + '%' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditingSoftware(index)}
                        className="p-1.5 rounded-full bg-[#2a2a2a] hover:bg-[#333] border border-[#333] transition-colors"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteSoftware(index)}
                        className="p-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 transition-colors"
                      >
                        <span className="text-xs">✕</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
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
                  className={`px-6 py-2.5 rounded-full transition-all ${
                    activeCategory === category
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-white/70'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
              {!isViewMode && (
                <button
                  onClick={() => setShowAddProject(true)}
                  className="px-6 py-2.5 rounded-full bg-purple-500 hover:bg-purple-600 text-white transition-all"
                >
                  Add Project
                </button>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="group cursor-pointer relative aspect-square overflow-hidden rounded-2xl bg-white/5"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProject(index);
                    }}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-red-500/80 hover:bg-red-600 transition-all flex items-center justify-center w-8 h-8"
                  >
                    ✕
                  </button>
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-8"
                    onClick={() => handleProjectClick(project)}
                  >
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
            {renderEditButton(() => setShowAddTestimonial(true), "Add Testimonial")}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {config.testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="group relative bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
              >
                <button
                  onClick={() => handleDeleteTestimonial(index)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-red-500/80 hover:bg-red-600 transition-all flex items-center justify-center w-8 h-8 opacity-0 group-hover:opacity-100"
                >
                  ✕
                </button>
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
            className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-2.5 rounded-full transition-all"
          >
            Get in Touch
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="relative w-full max-w-6xl bg-[#0A0A0A] rounded-2xl overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
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
                
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-2.5 rounded-full transition-all"
                  >
                    View Live Project
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProject && (
        <AddProjectModal
          onClose={() => setShowAddProject(false)}
          onSave={(project) => {
            handleAddProject(project);
            setShowAddProject(false);
          }}
        />
      )}

      {/* Add Testimonial Modal */}
      {showAddTestimonial && (
        <AddTestimonialModal
          onClose={() => setShowAddTestimonial(false)}
          onSave={(testimonial) => {
            handleAddTestimonial(testimonial);
            setShowAddTestimonial(false);
          }}
        />
      )}
    </div>
  );
};

export default GraphicDesignTemplate;