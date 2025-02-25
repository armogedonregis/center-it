'use client'

import { useState, useEffect } from 'react'
import { ServicesContent, ServiceItem } from '@/types/services'
import { AdminPanelHeader } from '@/components/admin/AdminPanelHeader'
import { InputField } from '@/components/admin/InputField'
import { TextareaField } from '@/components/admin/TextareaField'
import { AdminButton } from '@/components/admin/AdminButton'
import { AdminSection } from '@/components/admin/AdminSection'
import { InputGroup } from '@/components/admin/InputGroup'
import { toast } from 'react-toastify'

export default function AdminServicesPage() {
  const [content, setContent] = useState<ServicesContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  useEffect(() => {
    async function fetchContent() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/services/get')
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
    if (!content) return
    setContent({
      ...content,
      footer: {
        ...content.footer,
        [field]: value
      }
    })
  }

  const handleServiceChange = (index: number, field: string, value: string) => {
    if (!content) return
    const newServices = [...content.services]
    newServices[index] = {
      ...newServices[index],
      [field]: value
    }
    setContent({
      ...content,
      services: newServices
    })
  }

  const handleServiceListChange = (serviceIndex: number, listIndex: number, value: string) => {
    if (!content) return
    const newServices = [...content.services]
    const newList = [...newServices[serviceIndex].list]
    newList[listIndex] = value
    
    newServices[serviceIndex] = {
      ...newServices[serviceIndex],
      list: newList
    }
    
    setContent({
      ...content,
      services: newServices
    })
  }

  const handleSave = async () => {
    if (!content) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/services/save', {
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
      <AdminPanelHeader title="Редактирование страницы услуг" />

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

        <AdminSection title="Баннер (Hero)">
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

        <AdminSection title="Услуги">
          {content.services.map((service, serviceIndex) => (
            <div key={service.id} className="mb-8 pb-8 border-b border-gray-200 last:border-b-0">
              <InputGroup title={`Услуга ${serviceIndex + 1}`}>
                <div className="flex justify-between mb-2">
                  <h4 className="text-lg font-medium">{service.title}</h4>
                </div>
                
                <InputField
                  label="Название услуги"
                  value={service.title}
                  onChange={(value) => handleServiceChange(serviceIndex, 'title', value)}
                />
                <TextareaField
                  label="Описание услуги"
                  value={service.description}
                  onChange={(value) => handleServiceChange(serviceIndex, 'description', value)}
                  rows={3}
                />
                
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium">Список преимуществ:</h5>
                  </div>
                  
                  {service.list.map((item, listIndex) => (
                    <div key={listIndex} className="flex items-start gap-2 mb-2">
                      <TextareaField
                        label={`Пункт ${listIndex + 1}`}
                        value={item}
                        onChange={(value) => handleServiceListChange(serviceIndex, listIndex, value)}
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </InputGroup>
            </div>
          ))}
        </AdminSection>

        <AdminSection title="Нижний блок">
          <TextareaField
            label="Текст нижнего блока"
            value={content.footer.text}
            onChange={(value) => handleFooterChange('text', value)}
            rows={4}
          />
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