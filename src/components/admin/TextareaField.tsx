import React from 'react';

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  rows = 4,
}) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>
  );
}; 