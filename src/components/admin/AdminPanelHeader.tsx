import React from 'react';

interface AdminPanelHeaderProps {
  title: string;
}

export const AdminPanelHeader: React.FC<AdminPanelHeaderProps> = ({ title }) => {
  return (
    <div className="border-b pb-4">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}; 