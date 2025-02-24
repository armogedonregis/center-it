'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
}

const pages: NavItem[] = [
  { title: "Главная", href: "/admin/home" },
  { title: "О компании", href: "/admin/about" },
  { title: "Услуги", href: "/admin/services" },
  { title: "Решения", href: "/admin/solutions" },
  { title: "Цены", href: "/admin/price" },
  { title: "Контакты", href: "/admin/contacts" },
];

const components: NavItem[] = [
  { title: "Хедер", href: "/admin/header" },
  { title: "Футер", href: "/admin/footer" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isActive 
            ? "bg-blue-500 text-white" 
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <span>{item.title}</span>
      </Link>
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Админ панель</h1>
      </div>
      
      <div className="p-4 space-y-8">
        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Страницы
          </h2>
          <nav className="space-y-1">
            {pages.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Компоненты
          </h2>
          <nav className="space-y-1">
            {components.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
} 