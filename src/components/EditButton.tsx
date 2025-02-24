import React from 'react';
import { Pencil } from 'lucide-react';

type EditButtonProps = {
  onClick: () => void;
};

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
    >
      <Pencil className="w-4 h-4" />
    </button>
  );
};

export default EditButton