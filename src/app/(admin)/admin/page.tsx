'use client'

import { AdminPanelHeader } from '@/components/admin/AdminPanelHeader'
import Link from 'next/link'

export default function AdminDashboard() {
  const adminSections = [
    {
      title: 'Страницы сайта',
      description: 'Редактирование контента на страницах сайта',
      items: [
        { title: 'Главная страница', href: '/admin/home', description: 'Управление содержимым главной страницы' },
        { title: 'О компании', href: '/admin/about-company', description: 'Информация о компании, история и ценности' },
        { title: 'Услуги', href: '/admin/services', description: 'Перечень и описание предоставляемых услуг' },
        { title: 'Решения', href: '/admin/solutions', description: 'Описание отраслевых IT-решений' },
        { title: 'Цены', href: '/admin/prices', description: 'Тарифы и стоимость услуг' },
        { title: 'Контакты', href: '/admin/contacts', description: 'Контактная информация и форма обратной связи' },
      ]
    },
  ]
  
  return (
    <>
      <AdminPanelHeader title="Панель управления" />
      
      <div className="mt-6">
        <p className="text-gray-600 mb-8">
          Добро пожаловать в панель управления. Выберите раздел для редактирования содержимого сайта.
        </p>
        
        <div className="space-y-10">
          {adminSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <p className="text-gray-600 mb-6">{section.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item, itemIndex) => (
                  <Link 
                    href={item.href} 
                    key={itemIndex}
                    className="block p-4 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all bg-gray-50"
                  >
                    <h3 className="font-medium text-blue-600 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
} 