import React from 'react';

interface AdminButtonProps {
  onClick: () => void;
  isLoading: boolean;
  text: string;
  loadingText: string;
  className?: string;
}

export const AdminButton: React.FC<AdminButtonProps> = ({
  onClick,
  isLoading,
  text,
  loadingText,
  className = 'bg-blue-600 hover:bg-blue-700 text-white'
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`px-4 py-2 rounded-md transition-colors ${className} ${
        isLoading ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {isLoading ? loadingText : text}
    </button>
  );
}; 