"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageModal } from "./ImageModal";

const Array = [
  {
    id: 1,
    title: "Автоматизация производственных процессов",
    description:
      "Автоматизация производства на базе 1С:ERP позволяет предприятиям значительно повысить эффективность работы, снизить затраты и минимизировать ошибки при выпуске продукции.",
    image: "/assets/images/contact_info_1.png",
    functionality: "Функциональные возможности",
    functionality_array: [
      {
        title: "Создание цифровых карт производственногопроцесса",
        description:
          "Система автоматически определяет порядок выполнения операций, учитывая специфику производства.",
      },
      {
        title: "Автоматическое формирование производственных документов",
        description:
          "Интеграция с 1С позволяет генерировать необходимые отчеты и накладные.",
      },
      {
        title: "Оптимизация загрузки оборудования",
        description:
          "Интеллектуальный алгоритм распределяет загрузку производственных линий.",
      },
      {
        title: "Контроль качества на каждом этапе",
        description:
          "Интеграция с системами мониторинга позволяет фиксировать отклонения от норм и предотвращать брак.",
      },
    ],
    advantages: "Преимущества",
    advantages_array: [
      "Сокращение времени на выпуск продукции.",
      "Минимизация ручного труда и человеческих ошибок.",
      "Увеличение прозрачности процессов за счет цифрового контроля.",
    ],
  },
  {
    id: 2,
    title: "Автоматизация складского учета",
    description:
      "Современные решения для складской логистики позволяют компаниям повысить скорость обработки грузов, минимизировать ошибки учета и сократить издержки.",
    image: "/assets/images/contact_info_2.png",
    functionality: "Функциональные возможности",
    functionality_array: [
      {
        title: "Адресное хранение",
        description:
          "Чёткая структура складского учёта с привязкой к местоположению товара.",
      },
      {
        title: "Автоматизация приемки и отгрузки",
        description:
          "Интеграция с системами штрих-кодирования и RFID позволяет ускорить операции.",
      },
      {
        title: "Контроль запасов в режиме реального времени",
        description: "Динамическое отслеживание остатков.",
      },
      {
        title: "Интеллектуальная система размещения товаров",
        description: "оптимальное распределение грузов по складу.",
      },
    ],
    advantages: "Результаты внедрения:",
    advantages_array: [
      "Снижение ошибок в учете до 90%.",
      "Снижение количества логистических ошибок.",
      "Повышение прозрачности логистических процессов.",
    ],
  },
  {
    id: 3,
    title: "Автоматизация управления доставкой и отгрузкой",
    description:
      "Разработанная система управления логистикой позволяет сократить время обработки заказов и повысить эффективность доставки.",
    image: "/assets/images/contact_info_3.png",
    functionality: "Функциональные возможности",
    functionality_array: [
      {
        title: "Формирование маршрутов доставки",
        description: "Оптимизация транспортных потоков для сокращения затрат.",
      },
      {
        title: "Автоматизация документооборота",
        description:
          "Печать необходимых документов (накладные, транспортные листы) нажатием одной кнопки.",
      },
      {
        title: "Отслеживание грузов в реальном времени",
        description: "Интеграция с GPS и системами контроля транспорта",
      },
      {
        title: "Контроль загрузки машин",
        description:
          "Алгоритм распределяет заказы с учётом габаритов и вместимости транспорта.",
      },
    ],
    advantages: "Результаты внедрения:",
    advantages_array: [
      "Сокращение времени на обработку заказов на 30%.",
      "Снижение количества логистических ошибок.",
      "Повышение прозрачности логистических процессов.",
    ],
  },
  {
    id: 4,
    title: "Управление заказами",
    description:
      "Разработанное программное обеспечение на базе C++ позволяет предприятиям повысить точность учета заказов и автоматизировать их обработку.",
    image: "/assets/images/contact_info_4.png",
    functionality: "Функциональные возможности",
    functionality_array: [
      {
        title: "Гибкая настройка бизнес-логики",
        description:
          "Возможность адаптации системы под специфику работы компании.",
      },
      {
        title: "Автоматическое распределение заказов",
        description: "Алгоритмы прогнозирования нагрузки на производство.",
      },
      {
        title: "Контроль выполнения заказов",
        description:
          "Система мониторинга отслеживает выполнение задач на каждом этапе.",
      },
      {
        title: "Формирование аналитических отчетов",
        description: "Генерация детальных отчетов по производительности.",
      },
    ],
    advantages: "Результаты внедрения:",
    advantages_array: [
      "Оптимизация загрузки производства.",
      "Уменьшение сроков согласования заказов в 1,5 раза.",
      "Улучшение контроля за выполнением заказов.",
    ],
  },
];

export default function SolutionList() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div>
      {Array.map((item) => {
        return (
          <div
            key={item.id}
            className="flex lg:flex-row flex-col items-start gap-6 mt-16 lg:mt-[129px]"
          >
            <div className="bg-main_card_bg lg:w-1/2 rounded-3xl p-6 text-white">
              <h5 className="text-3xl font-bold">{item.title}</h5>
              <p className="mt-2 text-base">{item.description}</p>
              <div
                className="mt-2 relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(item.image)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-main_card_bg rounded-3xl p-6 text-white">
                <h5>{item.functionality}</h5>
                <div className="space-y-4">
                  {item.functionality_array.map((item) => {
                    return (
                      <div
                        key={item.title.toString()}
                        className="flex items-start gap-2.5"
                      >
                        <div className="w-3 h-3 rounded-full bg-circle_bg mt-2 flex-shrink-0"></div>
                        <div>
                          <h6 className="font-semibold text-lg">
                            {item.title}
                          </h6>
                          <p className="">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 bg-circle_bg rounded-3xl p-6 text-white">
                <h5>{item.advantages}</h5>
                <div className="space-y-4">
                  {item.advantages_array.map((x) => {
                    return (
                      <div
                        key={x.toString()}
                        className="flex items-start gap-2.5"
                      >
                        <div className="w-3 h-3 rounded-full bg-white mt-2 flex-shrink-0"></div>
                        <p className="">{x}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Увеличенное изображение"
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
