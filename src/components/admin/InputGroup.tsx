import React from 'react';

interface InputGroupProps {
  children: React.ReactNode;
  title?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({ children, title }) => {
  return (
    <div className="mb-6">
      {title && <h3 className="text-lg font-medium mb-3">{title}</h3>}
      <div className="bg-gray-50 p-4 rounded-lg">{children}</div>
    </div>
  );
}; 