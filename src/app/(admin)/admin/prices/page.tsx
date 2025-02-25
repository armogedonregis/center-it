'use client';

import { useState, useEffect } from 'react';
import { PricesContent, PriceFactorItem } from '@/types/prices';
import { AdminPanelHeader } from '@/components/admin/AdminPanelHeader';
import { InputField } from '@/components/admin/InputField';
import { TextareaField } from '@/components/admin/TextareaField';
import { InputGroup } from '@/components/admin/InputGroup';
import { AdminButton } from '@/components/admin/AdminButton';
import { AdminSection } from '@/components/admin/AdminSection';
import { notFound } from 'next/navigation';
import { toast } from 'react-toastify';

export default function AdminPricesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState<PricesContent | null>(null);

  useEffect(() => {
    async function fetchContent() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/prices/get');
        if (!response.ok) throw new Error('Failed to fetch prices data');
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error('Error loading prices data:', error);
        toast.error('Ошибка при загрузке данных');
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, []);

  const handleSave = async () => {
    if (!content) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/prices/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error('Failed to save prices data');
      }

      toast.success('Данные успешно сохранены');
    } catch (error) {
      console.error('Error saving prices data:', error);
      toast.error('Ошибка при сохранении данных');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFactorChange = (index: number, field: keyof PriceFactorItem, value: string | boolean) => {
    if (!content) return;

    const updatedFactors = [...content.factors.items];
    updatedFactors[index] = {
      ...updatedFactors[index],
      [field]: value,
    };

    setContent({
      ...content,
      factors: {
        ...content.factors,
        items: updatedFactors,
      },
    });
  };

  const addFactor = () => {
    if (!content) return;

    const newId = content.factors.items.length > 0
      ? Math.max(...content.factors.items.map(item => item.id)) + 1
      : 1;

    const newFactor: PriceFactorItem = {
      id: newId,
      title: 'Новый фактор',
      description: 'Описание нового фактора',
      postDescription: 'Дополнительное описание',
      tarif: false,
    };

    setContent({
      ...content,
      factors: {
        ...content.factors,
        items: [...content.factors.items, newFactor],
      },
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <AdminPanelHeader title="Загрузка..." />
        <div className="mt-6">Загрузка данных...</div>
      </div>
    );
  }

  if (!content) {
    return notFound();
  }

  return (
    <div className="p-6">
      <AdminPanelHeader title="Редактирование страницы цен" />

      <div className="space-y-6 mt-6">
        <AdminSection title="SEO">
          <InputField
            label="Заголовок страницы (SEO)"
            value={content.seo.title}
            onChange={(value) => setContent({ ...content, seo: { ...content.seo, title: value } })}
          />
        </AdminSection>

        <AdminSection title="Шапка страницы">
          <InputField
            label="Заголовок"
            value={content.hero.title}
            onChange={(value) => setContent({ ...content, hero: { ...content.hero, title: value } })}
          />
          <TextareaField
            label="Описание"
            value={content.hero.description}
            onChange={(value) => setContent({ ...content, hero: { ...content.hero, description: value } })}
          />
        </AdminSection>

        <AdminSection title="Факторы, влияющие на стоимость">
          <InputField
            label="Заголовок секции"
            value={content.factors.title}
            onChange={(value) => setContent({ ...content, factors: { ...content.factors, title: value } })}
          />
          <TextareaField
            label="Описание секции"
            value={content.factors.description}
            onChange={(value) => setContent({ ...content, factors: { ...content.factors, description: value } })}
          />

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Список факторов</h3>
            {content.factors.items.map((factor, index) => (
              <div key={factor.id} className="mb-8 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-lg">Фактор #{factor.id}</h4>
                </div>

                <InputField
                  label="Заголовок"
                  value={factor.title}
                  onChange={(value) => handleFactorChange(index, 'title', value)}
                />
                <TextareaField
                  label="Описание"
                  value={factor.description}
                  onChange={(value) => handleFactorChange(index, 'description', value)}
                />
                <TextareaField
                  label="Дополнительное описание"
                  value={factor.postDescription}
                  onChange={(value) => handleFactorChange(index, 'postDescription', value)}
                />
                <div className="mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={factor.tarif || false}
                      onChange={(e) => handleFactorChange(index, 'tarif', e.target.checked)}
                      className="h-4 w-4"
                    />
                    <span>Отобразить как тариф (с кнопкой заявки)</span>
                  </label>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <button
                onClick={addFactor}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Добавить фактор
              </button>
            </div>
          </div>
        </AdminSection>

        <AdminSection title="Форма обратной связи">
          <InputField
            label="Заголовок формы"
            value={content.form.title}
            onChange={(value) => setContent({ ...content, form: { ...content.form, title: value } })}
          />
          <TextareaField
            label="Описание формы"
            value={content.form.description}
            onChange={(value) => setContent({ ...content, form: { ...content.form, description: value } })}
          />
          <InputField
            label="Номер телефона"
            value={content.form.phoneNumber}
            onChange={(value) => setContent({ ...content, form: { ...content.form, phoneNumber: value } })}
          />
          <InputField
            label="Email"
            value={content.form.email}
            onChange={(value) => setContent({ ...content, form: { ...content.form, email: value } })}
          />
          <TextareaField
            label="Часы работы"
            value={content.form.timeWork}
            onChange={(value) => setContent({ ...content, form: { ...content.form, timeWork: value } })}
          />
        </AdminSection>

        <div className="mt-6 flex justify-end">
          <AdminButton
            onClick={handleSave}
            isLoading={isSaving}
            text="Сохранить изменения"
            loadingText="Сохранение..."
          />
        </div>
      </div>
    </div>
  );
} 