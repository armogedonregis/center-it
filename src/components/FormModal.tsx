"use client";

import { useEffect, useState } from "react";
import { useModal } from "./providers/ModalProvider";
import { IMaskInput } from "react-imask";

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export const FormModal = () => {
  const { isOpen, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Введите имя";
    }

    const phoneDigits = formData.phone.replace(/[^\d]/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Введите номер телефона";
    } else if (phoneDigits.length !== 11) {
      newErrors.phone = "Неверный формат телефона";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Введите email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Неверный формат email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при отправке формы");
      }

      setSuccess(true);
      setFormData({ name: "", phone: "", email: "", description: "" });
      setTimeout(() => {
        closeModal();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-in-out]"
      onClick={closeModal}
    >
      <div
        className="bg-main_card_bg max-w-[472px] w-full rounded-3xl p-6 animate-[scaleIn_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-base text-white">
            <span className="font-semibold">Заполните форму заявки, </span>
            и наши специалисты
            <br /> свяжутся с вами в ближайшее время
          </h5>
          <button
            onClick={closeModal}
            className="text-white hover:opacity-80 transition-opacity"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-2">
            <div>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`bg-color_input focus:outline-none rounded-xl px-2 py-3 w-full text-color_gray text-sm placeholder:text-color_gray ${
                  errors.name ? "border border-red-500" : ""
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
                  setFormData((prev) => ({
                    ...prev,
                    phone: value,
                  }));
                  if (errors.phone) {
                    setErrors((prev) => ({
                      ...prev,
                      phone: undefined,
                    }));
                  }
                }}
                placeholder="+7 (___) ___-__-__"
                className={`bg-color_input focus:outline-none rounded-xl px-2 py-3 w-full text-color_gray text-sm placeholder:text-color_gray ${
                  errors.phone ? "border border-red-500" : ""
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
                  errors.email ? "border border-red-500" : ""
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
            className={`bg-button_red hover:opacity-80 transition-opacity duration-200 focus:outline-none mt-4 py-3 text-white font-semibold text-base w-full rounded-xl ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Отправка..." : "Отправить заявку"}
          </button>
        </form>
      </div>
    </div>
  );
};
