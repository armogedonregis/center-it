'use client'

import { useState, useEffect } from 'react'
import { AdminPanelHeader } from '@/components/admin/AdminPanelHeader'
import { InputField } from '@/components/admin/InputField'
import { TextareaField } from '@/components/admin/TextareaField'
import { AdminButton } from '@/components/admin/AdminButton'
import { AdminSection } from '@/components/admin/AdminSection'
import { InputGroup } from '@/components/admin/InputGroup'
import { toast } from 'react-toastify'

// Расширяем типы для соответствия структуре JSON
interface SimplifiedSolutionItem {
  id: number;
  title: string;
  description: string;
  icon?: string;
  footer?: string;
}

interface SimplifiedSolutionsContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    description: string;
  };
  solutions: SimplifiedSolutionItem[];
  footer?: {
    text: string;
  };
}

export default function AdminSolutionsPage() {
  const [content, setContent] = useState<SimplifiedSolutionsContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  useEffect(() => {
    async function fetchContent() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/solutions/get')
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

  const handleFooterChange = (field: string, value: string) => {
    if (!content || !content.footer) return
    setContent({
      ...content,
      footer: {
        ...content.footer,
        [field]: value
      }
    })
  }

  const handleSolutionChange = (index: number, field: string, value: string) => {
    if (!content) return
    
    const newSolutions = [...content.solutions]
    newSolutions[index] = {
      ...newSolutions[index],
      [field]: value
    }
    
    setContent({
      ...content,
      solutions: newSolutions
    })
  }

  const handleSave = async () => {
    if (!content) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/solutions/save', {
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
      <AdminPanelHeader title="Редактирование страницы решений" />

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
            value={content.hero.description}
            onChange={(value) => handleHeroChange('description', value)}
            rows={3}
          />
        </AdminSection>

        <AdminSection title="Решения">
          {content.solutions.map((solution, index) => (
            <div key={solution.id} className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Решение #{index + 1}: {solution.title}</h3>
              </div>
              
              <InputField
                label="Название"
                value={solution.title}
                onChange={(value) => handleSolutionChange(index, 'title', value)}
              />
              <TextareaField
                label="Описание"
                value={solution.description}
                onChange={(value) => handleSolutionChange(index, 'description', value)}
                rows={3}
              />
              <InputField
                label="Иконка (путь к изображению)"
                value={solution.icon || ''}
                onChange={(value) => handleSolutionChange(index, 'icon', value)}
              />
            </div>
          ))}
        </AdminSection>

        {content.footer && (
          <AdminSection title="Подвал раздела">
            <TextareaField
              label="Текст"
              value={content.footer.text}
              onChange={(value) => handleFooterChange('text', value)}
              rows={3}
            />
          </AdminSection>
        )}

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