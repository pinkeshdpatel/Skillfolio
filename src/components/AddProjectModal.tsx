import React, { useState } from 'react';
import { X, Plus, Trash } from 'lucide-react';
import ImageUploader from './ImageUploader';

type ProjectFormData = {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  link: string;
  fullDescription: string;
  additionalImages: string[];
};

type AddProjectModalProps = {
  onClose: () => void;
  onSave: (project: ProjectFormData) => void;
};

const AddProjectModal: React.FC<AddProjectModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&q=80',
    category: 'Design',
    link: '',
    fullDescription: '',
    additionalImages: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addAdditionalImage = () => {
    setFormData(prev => ({
      ...prev,
      additionalImages: [...prev.additionalImages, '']
    }));
  };

  const removeAdditionalImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
  };

  const updateAdditionalImage = (index: number, url: string) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.map((img, i) => i === index ? url : img)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <div className="relative w-full max-w-4xl bg-[#0A0A0A] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold">Add New Project</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Main Image
                </label>
                <ImageUploader
                  value={formData.imageUrl}
                  onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                  className="aspect-square"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-white/70">
                  Additional Images
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {formData.additionalImages.map((img, index) => (
                    <div key={index} className="relative">
                      <ImageUploader
                        value={img}
                        onChange={(url) => updateAdditionalImage(index, url)}
                        className="aspect-square"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addAdditionalImage}
                    className="aspect-square rounded-lg border-2 border-dashed border-white/20 hover:border-purple-500 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-white/5 rounded-lg px-3 py-2 text-white"
                  placeholder="Enter project title..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Short Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-white/5 rounded-lg px-3 py-2 text-white h-24 resize-none"
                  placeholder="Enter a brief description..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Full Description
                </label>
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
                  className="w-full bg-white/5 rounded-lg px-3 py-2 text-white h-32 resize-none"
                  placeholder="Enter detailed description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-white/5 rounded-lg px-3 py-2 text-white"
                  placeholder="e.g., Design, Development, Branding..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Project Link
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                  className="w-full bg-white/5 rounded-lg px-3 py-2 text-white"
                  placeholder="https://..."
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal