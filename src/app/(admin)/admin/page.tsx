'use client'

import { useState, useEffect } from 'react'
import { HomeContent } from '@/types/home'

export default function AdminPage() {
  const [content, setContent] = useState<HomeContent | null>(null)
  
  useEffect(() => {
    fetch('/api/home/get')
      .then(res => res.json())
      .then(data => setContent(data))
  }, [])

  if (!content) return <div>Загрузка...</div>

  const handleSeoChange = (value: string) => {
    setContent(prev => prev && ({
      ...prev,
      seo: { ...prev.seo, title: value }
    }))
  }

  const handleHeroChange = (field: 'colored' | 'regular' | 'subtitle', value: string) => {
    setContent(prev => prev && ({
      ...prev,
      hero: {
        ...prev.hero,
        title: field === 'subtitle' 
          ? prev.hero.title 
          : { ...prev.hero.title, [field]: value },
        ...(field === 'subtitle' && { subtitle: value })
      }
    }))
  }

  const handleMainPathChange = (field: string, value: string) => {
    setContent(prev => prev && ({
      ...prev,
      mainPath: {
        ...prev.mainPath,
        [field]: value
      }
    }))
  }

  const handleFeatureChange = (index: number, field: string, value: string) => {
    setContent(prev => prev && ({
      ...prev,
      mainPath: {
        ...prev.mainPath,
        features: prev.mainPath.features.map((feature, i) => 
          i === index ? { ...feature, [field]: value } : feature
        )
      }
    }))
  }

  const handleAdvantagesChange = (field: string, value: string) => {
    setContent(prev => prev && ({
      ...prev,
      advantages: {
        ...prev.advantages,
        [field]: value
      }
    }))
  }

  const handleAdvantageItemChange = (index: number, field: string, value: string) => {
    setContent(prev => prev && ({
      ...prev,
      advantages: {
        ...prev.advantages,
        items: prev.advantages.items.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }))
  }

  const handleContactsChange = (field: string, value: string) => {
    setContent(prev => prev && ({
      ...prev,
      contacts: {
        ...prev.contacts,
        [field]: value
      }
    }))
  }

  const handleWorkHoursChange = (field: string, value: string) => {
    setContent(prev => prev && ({
      ...prev,
      contacts: {
        ...prev.contacts,
        workHours: {
          ...prev.contacts.workHours,
          [field]: value
        }
      }
    }))
  }

  const handleFormTextChange = (field: string, value: string) => {
    setContent(prev => prev && ({
      ...prev,
      contacts: {
        ...prev.contacts,
        formText: {
          ...prev.contacts.formText,
          [field]: value
        }
      }
    }))
  }

  const handleSave = async () => {
    try {
      await fetch('/api/home/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      })
      alert('Сохранено!')
    } catch (error) {
      alert('Ошибка сохранения')
    }
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Редактирование главной страницы</h1>
      
      <div className="space-y-6">
        {/* SEO */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">SEO</h2>
          <div>
            <label className="block mb-2">Title страницы</label>
            <input
              type="text"
              value={content.seo.title}
              onChange={(e) => handleSeoChange(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Hero */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Главный экран</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Заголовок (красная часть)</label>
              <input
                type="text"
                value={content.hero.title.colored}
                onChange={(e) => handleHeroChange('colored', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Заголовок (обычная часть)</label>
              <input
                type="text"
                value={content.hero.title.regular}
                onChange={(e) => handleHeroChange('regular', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Подзаголовок</label>
              <input
                type="text"
                value={content.hero.subtitle}
                onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Направления */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Направления</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Заголовок секции</label>
              <input
                type="text"
                value={content.mainPath.title}
                onChange={(e) => handleMainPathChange('title', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Описание секции</label>
              <textarea
                value={content.mainPath.description}
                onChange={(e) => handleMainPathChange('description', e.target.value)}
                className="w-full p-2 border rounded h-24"
              />
            </div>
            {content.mainPath.features.map((feature, index) => (
              <div key={feature.id} className="p-4 border rounded">
                <h3 className="font-semibold mb-2">Направление {index + 1}</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Заголовок"
                  />
                  <textarea
                    value={feature.description}
                    onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Описание"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Преимущества */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Преимущества</h2>
          <div>
            <label className="block mb-2">Заголовок секции</label>
            <input
              type="text"
              value={content.advantages.title}
              onChange={(e) => handleAdvantagesChange('title', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          {content.advantages.items.map((item, index) => (
            <div key={item.id} className="mt-4 p-4 border rounded">
              <h3 className="font-semibold mb-2">Преимущество {index + 1}</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleAdvantageItemChange(index, 'title', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Заголовок"
                />
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleAdvantageItemChange(index, 'description', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Описание"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Контакты */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Контакты</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Телефон</label>
              <input
                type="text"
                value={content.contacts.phone}
                onChange={(e) => handleContactsChange('phone', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="text"
                value={content.contacts.email}
                onChange={(e) => handleContactsChange('email', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Рабочие дни</label>
              <input
                type="text"
                value={content.contacts.workHours.days}
                onChange={(e) => handleWorkHoursChange('days', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Рабочее время</label>
              <input
                type="text"
                value={content.contacts.workHours.time}
                onChange={(e) => handleWorkHoursChange('time', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Адрес</label>
              <textarea
                value={content.contacts.address}
                onChange={(e) => handleContactsChange('address', e.target.value)}
                className="w-full p-2 border rounded h-24"
              />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Текст формы</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  value={content.contacts.formText.line1}
                  onChange={(e) => handleFormTextChange('line1', e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={content.contacts.formText.line2}
                  onChange={(e) => handleFormTextChange('line2', e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={content.contacts.formText.line3}
                  onChange={(e) => handleFormTextChange('line3', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  )
} 