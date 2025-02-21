'use client';

import { useModal } from './providers/ModalProvider';

interface RequestButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const RequestButton = ({ 
  className = "bg-color_red hover:bg-red-700 transition-colors duration-200 text-white px-6 py-3.5 mt-8 rounded-xl font-bold text-base",
  children = "Оставить заявку"
}: RequestButtonProps) => {
  const { openModal } = useModal();

  return (
    <button 
      onClick={openModal} 
      className={className}
    >
      {children}
    </button>
  );
};