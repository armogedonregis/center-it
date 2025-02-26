'use client';

import { useState } from 'react';
import { IMaskInput } from 'react-imask';

interface FormComponentProps {
  title: string;
  description: string;
  phoneNumber: string;
  email: string;
  timeWork: string;
  center?: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export const FormComponent = ({
  title,
  description,
  phoneNumber,
  email,
  timeWork,
  center = true,
}: FormComponentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
    }

    const phoneDigits = formData.phone.replace(/[^\d]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (phoneDigits.length !== 11) {
      newErrors.phone = 'Неверный формат телефона';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при отправке формы');
      }

      setSuccess(true);
      setFormData({ name: '', phone: '', email: '', description: '' });
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <section className="bg-second_bg py-16">
      <div className="container">
        <div className={`flex lg:flex-row flex-col gap-6 ${center ? "items-center" : "items-start"}`}>
          <div className="text-color_black">
            <h2 className={`${center ? "text-base lg:text-xl" : "text-xl lg:text-[28px]"} font-semibold`}>{title}</h2>
            <p className="text-sm lg:text-base mt-4">{description}</p>
            <div className="flex flex-col gap-2 lg:gap-4 mt-2 lg:mt-4 text-sm lg:text-base font-semibold">
              <a href={`tel:${phoneNumber.replace(/[^\d+]/g, '')}`} className="hover:opacity-80 transition-opacity">
                {phoneNumber}
              </a>
              <a href={`mailto:${email}`} className="hover:opacity-80 transition-opacity">
                {email}
              </a>
            </div>
            <div className="mt-2 lg:mt-4 text-sm lg:text-base whitespace-pre-line">{timeWork}</div>
          </div>

          <div className="bg-main_card_bg lg:min-w-[472px] rounded-3xl p-6">
            <form onSubmit={handleSubmit} noValidate>
              <h5 className="text-sm lg:text-base text-white">
                <span className="font-semibold">Заполните форму заявки, </span>
                и наши специалисты<br /> свяжутся с вами в ближайшее время
              </h5>
              <div className="flex mt-4 flex-col gap-2">
                <div>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`bg-color_input focus:outline-none rounded-xl px-2 py-3 w-full text-color_gray text-sm placeholder:text-color_gray ${
                      errors.name ? 'border border-red-500' : ''
                    }`}
                    type="text"
                    placeholder="Имя"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <IMaskInput
                    mask="+{7} (000) 000-00-00"
                    value={formData.phone}
                    unmask={false}
                    onAccept={(value) => {
                      setFormData(prev => ({
                        ...prev,
                        phone: value
                      }));
                      if (errors.phone) {
                        setErrors(prev => ({
                          ...prev,
                          phone: undefined
                        }));
                      }
                    }}
                    placeholder="Телефон"
                    className={`bg-color_input focus:outline-none rounded-xl px-2 py-3 w-full text-color_gray text-sm placeholder:text-color_gray ${
                      errors.phone ? 'border border-red-500' : ''
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-color_input focus:outline-none rounded-xl px-2 py-3 w-full text-color_gray text-sm placeholder:text-color_gray ${
                      errors.email ? 'border border-red-500' : ''
                    }`}
                    type="email"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-color_input resize-none focus:outline-none rounded-xl min-h-[116px] px-2 py-3 w-full text-color_gray text-sm placeholder:text-color_gray"
                  placeholder="Описание задачи"
                />
              </div>

              {submitError && (
                <div className="text-red-500 text-sm mt-2">{submitError}</div>
              )}

              {success && (
                <div className="text-green-500 text-sm mt-2">
                  Заявка успешно отправлена!
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`bg-button_red hover:opacity-80 transition-opacity duration-200 focus:outline-none mt-2 lg:mt-4 py-3 text-white font-semibold text-sm lg:text-base w-full rounded-xl ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Отправка...' : 'Отправить заявку'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};