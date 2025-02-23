import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';

type EditableImageProps = {
  src: string;
  alt: string;
  onChange: (url: string) => void;
  className?: string;
};

const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  onChange,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [url, setUrl] = useState(src);
  const [error, setError] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (!error) {
      onChange(url);
    }
  };

  const handleImageError = () => {
    setError(true);
  };

  const handleImageLoad = () => {
    setError(false);
  };

  if (isEditing) {
    return (
      <div className={`relative ${className}`}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onBlur={handleBlur}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm p-4 text-white"
          autoFocus
        />
      </div>
    );
  }

  return (
    <div 
      className={`relative group cursor-pointer ${className}`}
      onDoubleClick={handleDoubleClick}
    >
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/10">
          <ImageIcon className="w-12 h-12 text-white/50" />
        </div>
      ) : null}
      <img
        src={src}
        alt={alt}
        onError={handleImageError}
        onLoad={handleImageLoad}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-white text-sm">Double click to edit</span>
      </div>
    </div>
  );
};

export default EditableImage