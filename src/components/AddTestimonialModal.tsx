import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import ImageUploader from './ImageUploader';

type TestimonialFormData = {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
};

type AddTestimonialModalProps = {
  onClose: () => void;
  onSave: (testimonial: TestimonialFormData) => void;
};

const AddTestimonialModal: React.FC<AddTestimonialModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    role: '',
    company: '',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
    content: '',
    rating: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0A0A0A] rounded-2xl my-8">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold">Add New Testimonial</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Profile Image
              </label>
              <div className="w-24 h-24">
                <ImageUploader
                  value={formData.image}
                  onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                  className="rounded-full overflow-hidden"
                  isProfileImage={true}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-white/5 rounded-lg px-3 py-2 text-white"
                placeholder="Enter client name..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full bg-white/5 rounded-lg px-3 py-2 text-white"
                placeholder="Enter client role..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full bg-white/5 rounded-lg px-3 py-2 text-white"
                placeholder="Enter company name..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Testimonial
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full bg-white/5 rounded-lg px-3 py-2 text-white h-32 resize-none"
                placeholder="Enter testimonial content..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating }))}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        rating <= formData.rating
                          ? 'fill-purple-500 text-purple-500'
                          : 'text-white/20'
                      }`}
                    />
                  </button>
                ))}
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
              Add Testimonial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTestimonialModal