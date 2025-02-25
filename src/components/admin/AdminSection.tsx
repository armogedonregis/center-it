import React from 'react';

interface AdminSectionProps {
  children: React.ReactNode;
  title: string;
}

export const AdminSection: React.FC<AdminSectionProps> = ({ children, title }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-5">
      <h2 className="text-xl font-semibold mb-4 pb-2 border-b">{title}</h2>
      <div>{children}</div>
    </div>
  );
}; 