import React from 'react';
import { X } from 'lucide-react';
import { PortfolioConfig } from '../config/portfolioConfig';

type EditModalProps = {
  section: keyof PortfolioConfig;
  data: any;
  onClose: () => void;
  onSave: (data: any) => void;
};

const EditModal: React.FC<EditModalProps> = ({ section, data, onClose, onSave }) => {
  const [editedData, setEditedData] = React.useState(data);

  const handleSave = () => {
    onSave(editedData);
    onClose();
  };

  const renderField = (key: string, value: any, path: string[] = []) => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return (
        <div key={key} className="space-y-4 p-4 bg-white/5 rounded-lg">
          <h3 className="font-semibold text-lg">{key}</h3>
          {Object.entries(value).map(([k, v]) => renderField(k, v, [...path, key]))}
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div key={key} className="space-y-4">
          <h3 className="font-semibold text-lg">{key}</h3>
          {value.map((item, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg">
              {typeof item === 'object' ? (
                Object.entries(item).map(([k, v]) => renderField(k, v, [...path, key, index.toString()]))
              ) : (
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newData = [...value];
                    newData[index] = e.target.value;
                    setEditedData((prev: any) => {
                      const updated = { ...prev };
                      let current = updated;
                      path.forEach((p, i) => {
                        if (i === path.length - 1) {
                          current[p] = newData;
                        } else {
                          current = current[p];
                        }
                      });
                      return updated;
                    });
                  }}
                  className="w-full bg-white/10 rounded px-3 py-2 text-white"
                />
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div key={key} className="space-y-2">
        <label className="block text-sm font-medium text-white/70">{key}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setEditedData((prev: any) => {
              const updated = { ...prev };
              let current = updated;
              path.forEach((p, i) => {
                if (i === path.length - 1) {
                  current[p] = { ...current[p], [key]: e.target.value };
                } else {
                  current = current[p];
                }
              });
              return updated;
            });
          }}
          className="w-full bg-white/10 rounded px-3 py-2 text-white"
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <div className="relative w-full max-w-4xl bg-[#0A0A0A] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold">Edit {section}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-6">
            {Object.entries(editedData).map(([key, value]) => renderField(key, value))}
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal