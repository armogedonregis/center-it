"use client";

import { useEffect } from "react";
import Image from "next/image";

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const ImageModal = ({ src, alt, onClose }: ImageModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-[fadeIn_0.2s_ease-in-out]"
      onClick={onClose}
    >
      <div className="relative w-full h-screen bg-[#050C26] animate-[slideIn_0.3s_ease-out]">
        <div
          className="absolute right-4 md:right-8 top-4 md:top-8 flex items-center gap-2 text-white cursor-pointer hover:opacity-80 transition-opacity z-50 animate-[fadeIn_0.4s_ease-in-out]"
          onClick={onClose}
        >
          <span className="hidden md:inline">Закрыть</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="w-full h-full flex items-center justify-center px-4 md:px-16">
          <div className="relative w-full h-[300px] md:h-[629px] animate-[scaleIn_0.3s_ease-out]">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 90vw"
              onClick={(e) => e.stopPropagation()}
              quality={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
