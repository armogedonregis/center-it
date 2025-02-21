'use client';

import { useEffect } from 'react';
import { useModal } from './providers/ModalProvider';

export const FormModal = () => {
  const { isOpen, closeModal } = useModal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-in-out]"
      onClick={closeModal}
    >
      <div 
        className="bg-main_card_bg max-w-[472px] w-full rounded-3xl p-6 animate-[scaleIn_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-base text-white">
            <span className="font-semibold">Заполните форму заявки, </span>
            и наши специалисты<br /> свяжутся с вами в ближайшее время
          </h5>
          <button 
            onClick={closeModal}
            className="text-white hover:opacity-80 transition-opacity"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <form>
          <div className="flex flex-col gap-2">
            <input
              className="bg-color_input focus:outline-none rounded-xl px-2 py-3 w-full text-color_gray text-sm placeholder:text-color_gray"
              type="text"
              placeholder="Имя"
            />
            <input
              className="bg-color_input focus:outline-none rounded-xl px-2 py-3 w-full text-color_gray text-sm placeholder:text-color_gray"
              type="text"
              placeholder="Телефон"
            />
            <input
              className="bg-color_input focus:outline-none rounded-xl px-2 py-3 w-full text-color_gray text-sm placeholder:text-color_gray"
              type="text"
              placeholder="Email"
            />
            <textarea
              className="bg-color_input resize-none focus:outline-none rounded-xl min-h-[116px] px-2 py-3 w-full text-color_gray text-sm placeholder:text-color_gray"
              placeholder="Описание задачи"
            />
          </div>
          <button className="bg-button_red hover:opacity-80 transition-opacity duration-200 focus:outline-none mt-4 py-3 text-white font-semibold text-base w-full rounded-xl">
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  );
}; 