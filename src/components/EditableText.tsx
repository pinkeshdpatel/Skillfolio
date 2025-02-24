import React, { useState, useEffect, useRef } from 'react';

type EditableTextProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
};

const EditableText: React.FC<EditableTextProps> = ({ 
  value, 
  onChange, 
  className = '', 
  as = 'p' 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChange(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
  };

  const Element = as;

  if (isEditing) {
    return (
      <textarea
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`bg-transparent outline-none resize-none w-full ${className}`}
        style={{ 
          minHeight: '1em',
          height: 'auto'
        }}
      />
    );
  }

  return (
    <Element
      onDoubleClick={handleDoubleClick}
      className={`cursor-text ${className}`}
    >
      {text}
    </Element>
  );
};

export default EditableText