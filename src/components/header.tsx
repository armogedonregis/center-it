"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <header className="bg-header_bg text-white">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="uppercase font-extrabold text-base">
          <span className="text-color_red_second">Центр</span> IT-РЕШЕНИЙ
        </Link>

        <button
          className="lg:hidden z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div
            className={`w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ease-in-out ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></div>
        </button>

        <div
          className={`
            fixed inset-0 bg-header_bg pt-20 z-40 transition-all duration-300 ease-in-out
            lg:block lg:relative lg:inset-auto lg:bg-transparent lg:pt-0 lg:transition-none
            ${
              isMenuOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full lg:opacity-100 lg:translate-x-0"
            }
            `}
        >
          <ul
            className={`
              flex flex-col items-center gap-4 transition-all duration-500 delay-100
              lg:flex-row lg:transition-none
              ${
                isMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10 lg:opacity-100 lg:translate-y-0"
              }
            `}
          >
            <li
              className={`transition-all duration-200 ${
                pathname === "/about-company"
                  ? "text-color_red"
                  : "hover:text-color_red"
              }`}
            >
              <Link href="/about-company">О компании</Link>
            </li>
            <li
              className={`transition-all duration-200 ${
                pathname === "/services"
                  ? "text-color_red"
                  : "hover:text-color_red"
              }`}
            >
              <Link href="/services">Услуги</Link>
            </li>
            <li
              className={`transition-all duration-200 ${
                pathname === "/price"
                  ? "text-color_red"
                  : "hover:text-color_red"
              }`}
            >
              <Link href="/price">Стоимость услуг</Link>
            </li>
            <li
              className={`transition-all duration-200 ${
                pathname === "/solutions"
                  ? "text-color_red"
                  : "hover:text-color_red"
              }`}
            >
              <Link href="/solutions">Решения</Link>
            </li>
            <li
              className={`transition-all duration-200 ${
                pathname === "/contacts"
                  ? "text-color_red"
                  : "hover:text-color_red"
              }`}
            >
              <Link href="/contacts">Контакты</Link>
            </li>
            <li>
              <div
                className={`
            transition-opacity duration-300 lg:hidden
          `}
              >
                <button className="bg-color_red text-white px-4 py-2 rounded-md font-bold text-xs hover:bg-red-700 transition-colors duration-200">
                  Оставить заявку
                </button>
              </div>
            </li>
          </ul>
        </div>

        <div
          className={`
            transition-opacity duration-300 hidden
            lg:block
          `}
        >
          <button className="bg-color_red text-white px-4 py-2 rounded-md font-bold text-xs hover:bg-red-700 transition-colors duration-200">
            Оставить заявку
          </button>
        </div>
      </div>
    </header>
  );
};
