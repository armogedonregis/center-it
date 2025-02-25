'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        toast.success('Выход успешно выполнен');
        router.push('/login');
      } else {
        toast.error('Ошибка при выходе из системы');
      }
    } catch (error) {
      toast.error('Произошла ошибка при попытке выхода');
    }
  };

  const navigationGroups: NavGroup[] = [
    {
      title: "Общее",
      items: [
        { title: "Панель управления", href: "/admin" },
      ]
    },
    {
      title: "Страницы сайта",
      items: [
        { title: "Главная страница", href: "/admin/home" },
        { title: "О компании", href: "/admin/about-company" },
        { title: "Услуги", href: "/admin/services" },
        { title: "Решения", href: "/admin/solutions" },
        { title: "Цены", href: "/admin/prices" },
        { title: "Контакты", href: "/admin/contacts" },
      ]
    }
  ];

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href;

    return (
      <Link
        href={item.href}
        className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
          isActive
            ? "bg-blue-100 text-blue-900"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        {item.icon}
        <span className={isActive ? "font-medium" : ""}>{item.title}</span>
      </Link>
    );
  };

  return (
    <div className="w-64 h-screen bg-white border-r overflow-y-auto sticky top-0 left-0">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Админ-панель</h2>
      </div>

      <div className="p-4">
        {navigationGroups.map((group, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
              {group.title}
            </h3>
            <nav className="space-y-1">
              {group.items.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </nav>
          </div>
        ))}

        <div className="mt-8 pt-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-sm rounded-md transition-colors w-full text-red-700 hover:bg-red-50"
          >
            Выйти из системы
          </button>
        </div>
      </div>
    </div>
  );
} 