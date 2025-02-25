'use client'

import { useState, useEffect } from 'react'
import { AdminPanelHeader } from '@/components/admin/AdminPanelHeader'
import { InputField } from '@/components/admin/InputField'
import { TextareaField } from '@/components/admin/TextareaField'
import { AdminButton } from '@/components/admin/AdminButton'
import { AdminSection } from '@/components/admin/AdminSection'
import { InputGroup } from '@/components/admin/InputGroup'
import { toast } from 'react-toastify'

// Упрощенный тип для страницы "О компании"
interface SimplifiedAboutCompanyContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
  advantages: {
    title: string;
    items: Array<{
      id: number;
      title: string;
      description: string;
    }>;
  };
}

export default function AdminAboutCompanyPage() {
  const [content, setContent] = useState<SimplifiedAboutCompanyContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  useEffect(() => {
    async function fetchContent() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/about-company/get')
        if (!response.ok) throw new Error('Ошибка получения данных')
        const data = await response.json()
        setContent(data)
      } catch (error) {
        toast.error('Не удалось загрузить данные')
        console.error('Ошибка загрузки данных:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [])

  const handleSeoChange = (field: string, value: string) => {
    if (!content) return
    setContent({
      ...content,
      seo: {
        ...content.seo,
        [field]: value
      }
    })
  }

  const handleHeroChange = (field: string, value: string) => {
    if (!content) return
    setContent({
      ...content,
      hero: {
        ...content.hero,
        [field]: value
      }
    })
  }

  const handleMissionChange = (field: string, value: string) => {
    if (!content) return
    setContent({
      ...content,
      mission: {
        ...content.mission,
        [field]: value
      }
    })
  }

  const handleAdvantagesTitleChange = (value: string) => {
    if (!content) return
    setContent({
      ...content,
      advantages: {
        ...content.advantages,
        title: value
      }
    })
  }

  const handleAdvantageItemChange = (index: number, field: string, value: string) => {
    if (!content) return
    const updatedItems = [...content.advantages.items]
    updatedItems[index] = { 
      ...updatedItems[index], 
      [field]: value 
    }

    setContent({
      ...content,
      advantages: {
        ...content.advantages,
        items: updatedItems
      }
    })
  }

  const handleSave = async () => {
    if (!content) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/about-company/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      })

      if (!response.ok) throw new Error('Ошибка сохранения')
      toast.success('Данные успешно сохранены')
    } catch (error) {
      toast.error('Не удалось сохранить данные')
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading || !content) {
    return <div className="text-center py-10">Загрузка данных...</div>
  }

  return (
    <>
      <AdminPanelHeader title="Редактирование страницы о компании" />

      <div className="mt-6 space-y-6">
        <AdminSection title="SEO">
          <InputField
            label="Заголовок страницы (тег title)"
            value={content.seo.title}
            onChange={(value) => handleSeoChange('title', value)}
          />
          <TextareaField
            label="Описание страницы (meta description)"
            value={content.seo.description || ''}
            onChange={(value) => handleSeoChange('description', value)}
            rows={3}
          />
        </AdminSection>

        <AdminSection title="Главный баннер">
          <InputField
            label="Заголовок"
            value={content.hero.title}
            onChange={(value) => handleHeroChange('title', value)}
          />
          <TextareaField
            label="Описание"
            value={content.hero.description || ''}
            onChange={(value) => handleHeroChange('description', value)}
            rows={3}
          />
        </AdminSection>

        <AdminSection title="Миссия компании">
          <InputField
            label="Заголовок"
            value={content.mission.title}
            onChange={(value) => handleMissionChange('title', value)}
          />
          <TextareaField
            label="Описание"
            value={content.mission.description}
            onChange={(value) => handleMissionChange('description', value)}
            rows={4}
          />
        </AdminSection>

        <AdminSection title="Преимущества">
          <InputField
            label="Заголовок раздела"
            value={content.advantages.title}
            onChange={handleAdvantagesTitleChange}
          />
          
          {content.advantages.items.map((item, index) => (
            <div key={item.id} className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Преимущество #{index + 1}</h3>
              </div>
              
              <InputField
                label="Заголовок"
                value={item.title}
                onChange={(value) => handleAdvantageItemChange(index, 'title', value)}
              />
              <TextareaField
                label="Описание"
                value={item.description}
                onChange={(value) => handleAdvantageItemChange(index, 'description', value)}
                rows={3}
              />
            </div>
          ))}
        </AdminSection>

        <div className="flex justify-end mt-6">
          <AdminButton
            onClick={handleSave}
            isLoading={isSaving}
            text="Сохранить изменения"
            loadingText="Сохранение..."
          />
        </div>
      </div>
    </>
  )
} 