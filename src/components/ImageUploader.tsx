import React, { useState, useRef } from 'react';
import { ImageIcon, Upload } from 'lucide-react';

type ImageUploaderProps = {
  value: string;
  onChange: (url: string) => void;
  className?: string;
  isProfileImage?: boolean;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  className = '',
  isProfileImage = false
}) => {
  const [error, setError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageError = () => setError(true);
  const handleImageLoad = () => setError(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (isProfileImage) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div 
      className={`relative group cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/10">
          <ImageIcon className="w-12 h-12 text-white/50" />
        </div>
      ) : null}
      <img
        src={value}
        alt="Preview"
        onError={handleImageError}
        onLoad={handleImageLoad}
        className="w-full h-full object-cover"
      />
      
      {isProfileImage ? (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <Upload className="w-4 h-4" />
            <span className="text-sm">Upload Photo</span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <Upload className="w-4 h-4" />
            <span className="text-sm">Change Image</span>
          </div>
        </button>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader