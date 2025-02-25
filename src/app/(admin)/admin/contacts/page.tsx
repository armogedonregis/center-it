'use client'

import { useState, useEffect } from 'react'
import { ContactsContent } from '@/types/contacts'
import { AdminPanelHeader } from '@/components/admin/AdminPanelHeader'
import { InputField } from '@/components/admin/InputField'
import { TextareaField } from '@/components/admin/TextareaField'
import { AdminButton } from '@/components/admin/AdminButton'
import { AdminSection } from '@/components/admin/AdminSection'
import { InputGroup } from '@/components/admin/InputGroup'
import { toast } from 'react-toastify'

export default function AdminContactsPage() {
  const [content, setContent] = useState<ContactsContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  useEffect(() => {
    async function fetchContent() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/contacts/get')
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

  const handleFormChange = (field: string, value: string) => {
    if (!content) return
    setContent({
      ...content,
      form: {
        ...content.form,
        [field]: value
      }
    })
  }

  const handleOfficeChange = (field: string, value: string) => {
    if (!content) return
    setContent({
      ...content,
      office: {
        ...content.office,
        [field]: value
      }
    })
  }

  const handleOfficeCompanyNameChange = (field: string, value: string) => {
    if (!content) return
    setContent({
      ...content,
      office: {
        ...content.office,
        companyName: {
          ...content.office.companyName,
          [field]: value
        }
      }
    })
  }

  const handleOfficeAddressChange = (field: string, value: string) => {
    if (!content) return
    setContent({
      ...content,
      office: {
        ...content.office,
        address: {
          ...content.office.address,
          [field]: value
        }
      }
    })
  }

  const handleRequisitesChange = (field: string, value: string) => {
    if (!content) return
    setContent({
      ...content,
      requisites: {
        ...content.requisites,
        [field]: value
      }
    })
  }

  const handleRequisiteDetailChange = (section: keyof ContactsContent['requisites'], field: string, value: string) => {
    if (!content) return

    const sectionObj = content.requisites[section]
    if (!sectionObj || typeof sectionObj !== 'object') return

    setContent({
      ...content,
      requisites: {
        ...content.requisites,
        [section]: {
          ...sectionObj,
          [field]: value
        }
      }
    })
  }

  const handleCallbackChange = (field: string, value: string) => {
    if (!content) return
    setContent({
      ...content,
      callback: {
        ...content.callback,
        [field]: value
      }
    })
  }

  const handleMapChange = (field: string, value: string) => {
    if (!content) return
    setContent({
      ...content,
      map: {
        ...content.map,
        [field]: value
      }
    })
  }

  const handleSave = async () => {
    if (!content) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/contacts/save', {
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
      <AdminPanelHeader title="Редактирование страницы контактов" />

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

        <AdminSection title="Форма контакта">
          <InputField
            label="Заголовок формы"
            value={content.form.title}
            onChange={(value) => handleFormChange('title', value)}
          />
          <TextareaField
            label="Описание"
            value={content.form.description}
            onChange={(value) => handleFormChange('description', value)}
            rows={3}
          />
          <InputField
            label="Телефон"
            value={content.form.phoneNumber}
            onChange={(value) => handleFormChange('phoneNumber', value)}
          />
          <InputField
            label="Email"
            value={content.form.email}
            onChange={(value) => handleFormChange('email', value)}
          />
          <TextareaField
            label="Рабочее время"
            value={content.form.timeWork}
            onChange={(value) => handleFormChange('timeWork', value)}
            rows={2}
          />
        </AdminSection>

        <AdminSection title="Информация об офисе">
          <InputField
            label="Заголовок раздела"
            value={content.office.title}
            onChange={(value) => handleOfficeChange('title', value)}
          />
          <InputGroup title="Название компании">
            <InputField
              label="Выделенная часть"
              value={content.office.companyName.colored}
              onChange={(value) => handleOfficeCompanyNameChange('colored', value)}
            />
            <InputField
              label="Обычная часть"
              value={content.office.companyName.regular}
              onChange={(value) => handleOfficeCompanyNameChange('regular', value)}
            />
          </InputGroup>
          <InputGroup title="Адрес">
            <InputField
              label="Подпись"
              value={content.office.address.label}
              onChange={(value) => handleOfficeAddressChange('label', value)}
            />
            <TextareaField
              label="Значение"
              value={content.office.address.value}
              onChange={(value) => handleOfficeAddressChange('value', value)}
              rows={3}
            />
          </InputGroup>
        </AdminSection>

        <AdminSection title="Реквизиты компании">
          <InputField
            label="Заголовок раздела"
            value={content.requisites.title}
            onChange={(value) => handleRequisitesChange('title', value)}
          />
          <InputGroup title="Официальное наименование">
            <InputField
              label="Подпись"
              value={content.requisites.officialName.label}
              onChange={(value) => handleRequisiteDetailChange('officialName', 'label', value)}
            />
            <InputField
              label="Значение"
              value={content.requisites.officialName.value}
              onChange={(value) => handleRequisiteDetailChange('officialName', 'value', value)}
            />
          </InputGroup>
          <InputGroup title="Генеральный директор">
            <InputField
              label="Подпись"
              value={content.requisites.director.label}
              onChange={(value) => handleRequisiteDetailChange('director', 'label', value)}
            />
            <InputField
              label="Значение"
              value={content.requisites.director.value}
              onChange={(value) => handleRequisiteDetailChange('director', 'value', value)}
            />
          </InputGroup>
          <InputGroup title="ИНН">
            <InputField
              label="Подпись"
              value={content.requisites.inn.label}
              onChange={(value) => handleRequisiteDetailChange('inn', 'label', value)}
            />
            <InputField
              label="Значение"
              value={content.requisites.inn.value}
              onChange={(value) => handleRequisiteDetailChange('inn', 'value', value)}
            />
          </InputGroup>
          <InputGroup title="ОГРН">
            <InputField
              label="Подпись"
              value={content.requisites.ogrn.label}
              onChange={(value) => handleRequisiteDetailChange('ogrn', 'label', value)}
            />
            <InputField
              label="Значение"
              value={content.requisites.ogrn.value}
              onChange={(value) => handleRequisiteDetailChange('ogrn', 'value', value)}
            />
          </InputGroup>
        </AdminSection>

        <AdminSection title="Блок обратной связи">
          <TextareaField
            label="Текст блока"
            value={content.callback.text}
            onChange={(value) => handleCallbackChange('text', value)}
            rows={3}
          />
          <InputField
            label="Текст кнопки"
            value={content.callback.buttonText}
            onChange={(value) => handleCallbackChange('buttonText', value)}
          />
        </AdminSection>

        <AdminSection title="Карта">
          <InputField
            label="URL для iframe карты"
            value={content.map.url}
            onChange={(value) => handleMapChange('url', value)}
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