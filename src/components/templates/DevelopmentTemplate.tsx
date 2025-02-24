import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, ArrowUp, ExternalLink, Plus, Trash2, Share2, X, Pencil } from 'lucide-react';
import EditableText from '../EditableText';
import ImageUploader from '../ImageUploader';
import { usePortfolioConfig } from '../../hooks/usePortfolioConfig';

type TechStack = {
  name: string;
  icon: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  type: string;
  image: string;
  link?: string;
  technologies: string[];
};

type SocialLink = {
  platform: 'github' | 'linkedin' | 'email';
  url: string;
};

const DevelopmentTemplate: React.FC = () => {
  const { config, updateField, isViewMode, generateShareableLink, isLoading } = usePortfolioConfig();
  const [techStack, setTechStack] = useState<TechStack[]>([
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Glide',
      description: 'Navigate the world of web technology',
      type: 'iOS App',
      image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80',
      technologies: ['Swift', 'Firebase'],
      link: 'https://example.com/glide'
    },
    {
      id: '2',
      title: 'Vaultflow',
      description: 'Modern analytics for the modern world',
      type: 'Web App',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: 'https://example.com/vaultflow'
    }
  ]);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: 'github', url: 'https://github.com' },
    { platform: 'linkedin', url: 'https://linkedin.com' },
    { platform: 'email', url: 'mailto:ray@apollo.com' }
  ]);

  const [showAddTech, setShowAddTech] = useState(false);
  const [newTech, setNewTech] = useState({ name: '', icon: '' });
  const [showAddProject, setShowAddProject] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newTechnology, setNewTechnology] = useState('');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [customUsername, setCustomUsername] = useState('');

  // Initialize projects and tech stack from config
  useEffect(() => {
    if (config) {
      if (config.projects) {
        setProjects(config.projects.map(p => ({
          id: Math.random().toString(),
          title: p.title,
          description: p.description,
          type: p.category,
          image: p.imageUrl,
          technologies: [],
          link: p.link
        })));
      }
      if (config.software) {
        setTechStack(config.software.map(s => ({
          name: s.name,
          icon: s.icon
        })));
      }
    }
  }, [config]);

  // Save projects and tech stack to config when they change
  useEffect(() => {
    if (!isViewMode) {
      updateField(['projects'], projects.map(p => ({
        title: p.title,
        description: p.description,
        imageUrl: p.image,
        category: p.type,
        link: p.link || '',
        technologies: p.technologies
      })));

      updateField(['software'], techStack.map(t => ({
        name: t.name,
        icon: t.icon,
        proficiency: 100
      })));
    }
  }, [projects, techStack, isViewMode, updateField]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Failed to load portfolio configuration</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const handleAddTech = () => {
    if (newTech.name && newTech.icon) {
      setTechStack([...techStack, newTech]);
      setNewTech({ name: '', icon: '' });
      setShowAddTech(false);
    }
  };

  const handleRemoveTech = (index: number) => {
    setTechStack(techStack.filter((_, i) => i !== index));
  };

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description',
      type: 'Web App',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
      technologies: [],
    };
    setProjects([...projects, newProject]);
  };

  const handleRemoveProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleShare = async () => {
    setShowShareDialog(true);
  };

  const handleShareConfirm = async () => {
    try {
      const shareableLink = generateShareableLink(customUsername);
      if (!shareableLink) {
        throw new Error('Failed to generate shareable link');
      }
      await navigator.clipboard.writeText(shareableLink);
      setShowShareDialog(false);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    } catch (err) {
      console.error('Failed to share:', err);
      alert('Failed to generate shareable link. Please try again.');
    }
  };

  const handleEditProject = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setEditingProject(project);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    setEditingProject(null);
  };

  const handleAddTechnologyToProject = (project: Project) => {
    if (newTechnology.trim()) {
      const updatedProject = {
        ...project,
        technologies: [...project.technologies, newTechnology.trim()]
      };
      handleUpdateProject(updatedProject);
      setNewTechnology('');
    }
  };

  const handleRemoveTechnologyFromProject = (project: Project, techIndex: number) => {
    const updatedProject = {
      ...project,
      technologies: project.technologies.filter((_, i) => i !== techIndex)
    };
    handleUpdateProject(updatedProject);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {isViewMode ? (
              <div className="text-xl font-medium">{config.name || "Ray Apollo"}</div>
            ) : (
              <EditableText
                value={config.name || "Ray Apollo"}
                onChange={(value) => updateField(['name'], value)}
                className="text-xl font-medium"
              />
            )}
            <div className="flex items-center gap-8">
              <a href="#work" className="text-white/70 hover:text-white transition-colors">Work</a>
              <a href="#resume" className="text-white/70 hover:text-white transition-colors">Resume</a>
              <a href="#contact" className="text-white/70 hover:text-white transition-colors">Contact</a>
              {!isViewMode && (
                <div className="relative">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  {showShareTooltip && (
                    <div className="absolute top-full right-0 mt-2 px-4 py-2 bg-green-500 text-white rounded-lg whitespace-nowrap">
                      Link copied!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Share Dialog */}
      {showShareDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="bg-[#0A0A0A] rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4">Share Portfolio</h3>
            <div className="mb-6">
              <label className="block text-sm text-white/70 mb-2">
                Choose a username for your portfolio URL
              </label>
              <input
                type="text"
                value={customUsername}
                onChange={(e) => setCustomUsername(e.target.value.toLowerCase())}
                placeholder="e.g., johndoe or my-portfolio"
                className="w-full bg-white/5 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowShareDialog(false)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleShareConfirm}
                className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
                disabled={!customUsername}
              >
                Generate Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            {isViewMode ? (
              <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-8">
                <img
                  src={config.avatar || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <ImageUploader
                value={config.avatar || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80"}
                onChange={(url) => updateField(['avatar'], url)}
                className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-8"
              />
            )}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {techStack.map((tech, index) => (
                <div key={index} className="group relative">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-10 h-10 transition-transform group-hover:scale-110"
                  />
                  {!isViewMode && (
                    <button
                      onClick={() => handleRemoveTech(index)}
                      className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              ))}
              {!isViewMode && (
                <button
                  onClick={() => setShowAddTech(true)}
                  className="w-10 h-10 rounded-full border-2 border-dashed border-white/20 hover:border-white/40 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {isViewMode ? (
            <>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Hi, I'm {config.firstName || "Ray"} 👋
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">
                I develop{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  {config.specialization || "Mobile Apps"}
                </span>{' '}
                and{' '}
                <span className="italic">{config.additionalSpecialization || "Web Experiences"}</span>
              </h2>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Hi, I'm <EditableText value={config.firstName || "Ray"} onChange={(value) => updateField(['firstName'], value)} className="inline" /> 👋
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">
                I develop{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  <EditableText value={config.specialization || "Mobile Apps"} onChange={(value) => updateField(['specialization'], value)} className="inline" />
                </span>{' '}
                and{' '}
                <EditableText
                  value={config.additionalSpecialization || "Web Experiences"}
                  onChange={(value) => updateField(['additionalSpecialization'], value)}
                  className="inline italic"
                />
              </h2>
            </>
          )}

          <button className="px-6 py-2 rounded-full bg-green-500/20 text-green-400 text-sm hover:bg-green-500/30 transition-colors">
            Open to Work
          </button>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="work" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            {!isViewMode && (
              <button
                onClick={handleAddProject}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
              >
                <div className="aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="mb-2 text-sm text-white/60">{project.type}</div>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-white/70 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded-full bg-white/10 text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        View Project
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
                {!isViewMode && (
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleEditProject(e, project)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveProject(project.id)}
                      className="p-2 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Get in touch</h2>
          {isViewMode ? (
            <div className="text-2xl text-white/70 hover:text-white transition-colors cursor-pointer">
              {config.email || "ray@apollo.com"}
            </div>
          ) : (
            <EditableText
              value={config.email || "ray@apollo.com"}
              onChange={(value) => updateField(['email'], value)}
              className="text-2xl text-white/70 hover:text-white transition-colors cursor-pointer"
            />
          )}
          <div className="mt-8">
            <button className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {socialLinks.map((link, index) => {
              const Icon = link.platform === 'github' ? Github : link.platform === 'linkedin' ? Linkedin : Mail;
              return (
                <a
                  key={index}
                  href={link.url}
                  className="text-white/50 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
          <div className="text-white/50">
            {config.name || "Ray Apollo"} © {new Date().getFullYear()}
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Add Tech Stack Modal */}
      {!isViewMode && showAddTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="bg-[#0A0A0A] rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add Technology</h3>
              <button
                onClick={() => setShowAddTech(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Technology Name</label>
                <input
                  type="text"
                  value={newTech.name}
                  onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
                  className="w-full bg-white/5 rounded-lg px-3 py-2 text-white"
                  placeholder="e.g., React"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Icon URL</label>
                <input
                  type="text"
                  value={newTech.icon}
                  onChange={(e) => setNewTech({ ...newTech, icon: e.target.value })}
                  className="w-full bg-white/5 rounded-lg px-3 py-2 text-white"
                  placeholder="Enter icon URL"
                />
              </div>
              <button
                onClick={handleAddTech}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition-colors"
              >
                Add Technology
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {!isViewMode && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 overflow-y-auto">
          <div className="bg-[#0A0A0A] rounded-xl w-full max-w-2xl my-8">
            <div className="sticky top-0 bg-[#0A0A0A] z-10 px-6 py-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Edit Project</h3>
                <button
                  onClick={() => setEditingProject(null)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="px-6 py-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-white/70 mb-2">Project Image</label>
                  <ImageUploader
                    value={editingProject.image}
                    onChange={(url) => handleUpdateProject({ ...editingProject, image: url })}
                    className="aspect-video rounded-lg overflow-hidden"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-2">Project Title</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => handleUpdateProject({ ...editingProject, title: e.target.value })}
                    className="w-full bg-white/5 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-2">Project Type</label>
                  <input
                    type="text"
                    value={editingProject.type}
                    onChange={(e) => handleUpdateProject({ ...editingProject, type: e.target.value })}
                    className="w-full bg-white/5 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-2">Description</label>
                  <textarea
                    value={editingProject.description}
                    onChange={(e) => handleUpdateProject({ ...editingProject, description: e.target.value })}
                    className="w-full bg-white/5 rounded-lg px-3 py-2 text-white h-32 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-2">Project Link</label>
                  <input
                    type="url"
                    value={editingProject.link}
                    onChange={(e) => handleUpdateProject({ ...editingProject, link: e.target.value })}
                    className="w-full bg-white/5 rounded-lg px-3 py-2 text-white"
                    placeholder="https://"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-2">Technologies</label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {editingProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full bg-white/10 text-xs flex items-center gap-2"
                      >
                        {tech}
                        <button
                          onClick={() => handleRemoveTechnologyFromProject(editingProject, index)}
                          className="hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-white"
                      placeholder="Add technology..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTechnologyToProject(editingProject);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleAddTechnologyToProject(editingProject)}
                      className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-[#0A0A0A] z-10 px-6 py-4 border-t border-white/10">
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateProject(editingProject)}
                  className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevelopmentTemplate;