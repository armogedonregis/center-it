'use client'

import { useState, useEffect } from 'react'
import { HomeContent } from '@/types/home'
import { AdminPanelHeader } from '@/components/admin/AdminPanelHeader'
import { InputField } from '@/components/admin/InputField'
import { TextareaField } from '@/components/admin/TextareaField'
import { AdminButton } from '@/components/admin/AdminButton'
import { AdminSection } from '@/components/admin/AdminSection'
import { InputGroup } from '@/components/admin/InputGroup'
import { toast } from 'react-toastify'

export default function AdminHomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [content, setContent] = useState<HomeContent | null>(null)
  
  useEffect(() => {
    async function fetchContent() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/home/get')
        if (!response.ok) throw new Error('Ошибка получения данных')
        const data = await response.json()
        setContent(data)
      } catch (error) {
        toast.error('Не удалось загрузить данные')
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [])

  const handleSave = async () => {
    if (!content) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/home/save', {
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

  const handleFeaturesChange = (field: string, value: string) => {
    if (!content) return
    setContent({
      ...content,
      features: {
        ...content.features,
        [field]: value
      }
    })
  }

  const handleFeatureItemChange = (index: number, field: string, value: string) => {
    if (!content) return
    const updatedItems = [...content.features.items]
    updatedItems[index] = { 
      ...updatedItems[index], 
      [field]: value 
    }

    setContent({
      ...content,
      features: {
        ...content.features,
        items: updatedItems
      }
    })
  }

  const addFeatureItem = () => {
    if (!content) return
    
    const newItem = {
      title: 'Новая особенность',
      description: 'Описание особенности',
      icon: '/assets/vector/feature_icon.svg'
    }
    
    setContent({
      ...content,
      features: {
        ...content.features,
        items: [...content.features.items, newItem]
      }
    })
  }

  const handleAdvantagesChange = (field: string, value: string) => {
    if (!content) return
    setContent({
      ...content,
      advantages: {
        ...content.advantages,
        [field]: value
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

  const addAdvantageItem = () => {
    if (!content) return

    const newItem = {
      title: 'Новое преимущество',
      subtitle: 'Подзаголовок преимущества',
      icon: '/assets/vector/advantages/advantage-icon.svg'
    }

    setContent({
      ...content,
      advantages: {
        ...content.advantages,
        items: [...content.advantages.items, newItem]
      }
    })
  }

  const handleContactsChange = (field: string, value: string) => {
    if (!content) return
    
    if (field.includes('.')) {
      const [section, subField] = field.split('.')
      
      if (section === 'workHours') {
        setContent({
          ...content,
          contacts: {
            ...content.contacts,
            workHours: {
              ...content.contacts.workHours,
              [subField]: value
            }
          }
        })
      } else if (section === 'form') {
        setContent({
          ...content,
          contacts: {
            ...content.contacts,
            form: {
              ...content.contacts.form,
              [subField]: value
            }
          }
        })
      } else if (section === 'map') {
        setContent({
          ...content,
          contacts: {
            ...content.contacts,
            map: {
              ...content.contacts.map,
              [subField]: value
            }
          }
        })
      }
    } else {
      setContent({
        ...content,
        contacts: {
          ...content.contacts,
          [field]: value
        }
      })
    }
  }

  const handleFormDescriptionChange = (index: number, value: string) => {
    if (!content) return
    const updatedDescription = [...content.contacts.form.description]
    updatedDescription[index] = value

    setContent({
      ...content,
      contacts: {
        ...content.contacts,
        form: {
          ...content.contacts.form,
          description: updatedDescription
        }
      }
    })
  }

  const addFormDescriptionItem = () => {
    if (!content) return
    
    setContent({
      ...content,
      contacts: {
        ...content.contacts,
        form: {
          ...content.contacts.form,
          description: [...content.contacts.form.description, 'Новый пункт']
        }
      }
    })
  }

  if (isLoading || !content) {
    return <div className="text-center py-10">Загрузка данных...</div>
  }

  return (
    <>
      <AdminPanelHeader title="Редактирование главной страницы" />

      <div className="mt-6 space-y-6">
        <AdminSection title="SEO">
          <InputField
            label="Заголовок страницы (title)"
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

        <AdminSection title="Главный баннер (Hero)">
          <InputField
            label="Подзаголовок"
            value={content.hero.subtitle}
            onChange={(value) => handleHeroChange('subtitle', value)}
          />
        </AdminSection>

        <AdminSection title="Особенности (Features)">
          <InputField
            label="Заголовок секции"
            value={content.features.title}
            onChange={(value) => handleFeaturesChange('title', value)}
          />
          <TextareaField
            label="Описание секции"
            value={content.features.description}
            onChange={(value) => handleFeaturesChange('description', value)}
            rows={3}
          />
          
          <div className="mb-4 flex justify-end">
            <button
              onClick={addFeatureItem}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Добавить особенность
            </button>
          </div>

          {content.features.items.map((item, index) => (
            <div key={index} className="border p-4 rounded-md mb-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Особенность #{index + 1}</h3>
              </div>
              <InputField
                label="Заголовок"
                value={item.title}
                onChange={(value) => handleFeatureItemChange(index, 'title', value)}
              />
              <TextareaField
                label="Описание"
                value={item.description}
                onChange={(value) => handleFeatureItemChange(index, 'description', value)}
                rows={3}
              />
              <InputField
                label="Иконка (путь к SVG)"
                value={item.icon}
                onChange={(value) => handleFeatureItemChange(index, 'icon', value)}
              />
            </div>
          ))}
        </AdminSection>

        <AdminSection title="Преимущества (Advantages)">
          <InputField
            label="Заголовок секции"
            value={content.advantages.title}
            onChange={(value) => handleAdvantagesChange('title', value)}
          />
          
          <div className="mb-4 flex justify-end">
            <button
              onClick={addAdvantageItem}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Добавить преимущество
            </button>
          </div>

          {content.advantages.items.map((item, index) => (
            <div key={index} className="border p-4 rounded-md mb-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Преимущество #{index + 1}</h3>
              </div>
              <InputField
                label="Заголовок"
                value={item.title}
                onChange={(value) => handleAdvantageItemChange(index, 'title', value)}
              />
              <InputField
                label="Подзаголовок"
                value={item.subtitle}
                onChange={(value) => handleAdvantageItemChange(index, 'subtitle', value)}
              />
              <InputField
                label="Иконка (путь к SVG)"
                value={item.icon}
                onChange={(value) => handleAdvantageItemChange(index, 'icon', value)}
              />
            </div>
          ))}
        </AdminSection>

        <AdminSection title="Контакты">
          <InputField
            label="Заголовок секции"
            value={content.contacts.title}
            onChange={(value) => handleContactsChange('title', value)}
          />
          
          <InputGroup title="Контактная информация">
            <InputField
              label="Телефон"
              value={content.contacts.phone}
              onChange={(value) => handleContactsChange('phone', value)}
            />
            <InputField
              label="Email"
              value={content.contacts.email}
              onChange={(value) => handleContactsChange('email', value)}
            />
            
            <InputGroup title="Режим работы">
              <InputField
                label="Дни"
                value={content.contacts.workHours.days}
                onChange={(value) => handleContactsChange('workHours.days', value)}
              />
              <InputField
                label="Часы"
                value={content.contacts.workHours.hours}
                onChange={(value) => handleContactsChange('workHours.hours', value)}
              />
            </InputGroup>
            
            <InputField
              label="Адрес"
              value={content.contacts.address}
              onChange={(value) => handleContactsChange('address', value)}
            />
          </InputGroup>
          
          <InputGroup title="Форма обратной связи">
            <div className="mb-4 flex justify-end">
              <button
                onClick={addFormDescriptionItem}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Добавить пункт описания
              </button>
            </div>
            
            {content.contacts.form.description.map((item, index) => (
              <div key={index} className="border p-4 rounded-md mb-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Пункт описания #{index + 1}</h3>
                </div>
                <TextareaField
                  label="Текст"
                  value={item}
                  onChange={(value) => handleFormDescriptionChange(index, value)}
                  rows={2}
                />
              </div>
            ))}
            
            <InputField
              label="Текст кнопки"
              value={content.contacts.form.buttonText}
              onChange={(value) => handleContactsChange('form.buttonText', value)}
            />
          </InputGroup>
          
          <InputField
            label="URL карты"
            value={content.contacts.map.url}
            onChange={(value) => handleContactsChange('map.url', value)}
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