import { RequestButton } from "@/components/RequestButton";

const Array = [
  {
    id: 1,
    title: "Разработка комплексных решений 1С",
    description:
      "Мы создаем и адаптируем решения на платформе 1С:Предприятие с учетом специфики бизнеса. Наша команда разрабатывает индивидуальные конфигурации, а также дорабатывает стандартные модули 1С, адаптируя их под нужды клиентов.",
    icon: "/assets/vector/services_icon_1.svg",
    list: [
      "Настройка учетных систем и автоматизация бизнес-процессов.",
      "Интеграция с внешними сервисами и базами данных.",
      "Оптимизация стандартных конфигураций под индивидуальные требования.",
      "Разработка специализированных отчетов и интерфейсов.",
    ],
  },
  {
    id: 2,
    title: "Внедрение 1С:Предприятие",
    description:
      "Автоматизация среднего и крупного бизнеса на базе платформы 1С:Предприятие.",
    icon: "/assets/vector/services_icon_1.svg",
    list: [
      "Анализ бизнес-процессов и подбор оптимального решения.",
      "Внедрение систем управления финансами, складом, производством и логистикой.",
      "Повышение эффективности работы предприятия за счет оптимизации процессов.",
      "Обучение персонала и техническая поддержка.",
    ],
  },
  {
    id: 3,
    title: "Разработка специализированных приложений на C++",
    description:
      "Создаем мощные и гибкие программные решения для различных отраслей.",
    icon: "/assets/vector/services_icon_2.svg",
    list: [
      "Разработка высокопроизводительных приложений для управления и анализа данных.",
      "Интеграция с промышленными и корпоративными системами.",
      "Оптимизация вычислительных процессов и автоматизация задач.",
    ],
  },
  {
    id: 4,
    title: "Интеграция программных продуктов",
    description:
      "Наши специалисты обеспечивают бесшовную интеграцию различных IT-систем для повышения эффективности бизнеса.",
    icon: "/assets/vector/services_icon_3.svg",
    list: [
      "Синхронизация данных между системами различных производителей.",
      "Автоматизация обмена информацией и устранение дублирующих операций.",
      "Объединение корпоративных решений в единую экосистему.",
      "Настройка API и разработка коннекторов между различными платформами.",
    ],
  },
];

export default function ServicesPage() {
  return (
    <section className="bg-main_bg_with_noise bg-blend-soft-light bg-repeat text-white py-16">
      <div className="container">
        <h2 className="text-3xl font-medium">Услуги</h2>
        <p className="mt-2 text-base max-w-[750px]">
          ЦЕНТР IT-РЕШЕНИЙ предоставляет полный спектр IT-услуг, направленных на
          автоматизацию бизнес-процессов, разработку программного обеспечения и
          интеграцию IT-решений. Наши решения позволяют оптимизировать работу
          предприятий, повысить их эффективность и сократить издержки.
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {Array.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-main_card_bg rounded-3xl p-6 text-white flex flex-col"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.icon}
                    alt=""
                    className="w-16 h-10 object-contain"
                  />
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>

                <p className="text-base mt-2">{item.description}</p>

                {item.list.length > 0 && (
                  <ul className="space-y-2 mb-8 mt-2">
                    {item.list.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-white"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <RequestButton className="bg-color_red hover:bg-red-700 transition-colors duration-200 text-white px-6 h-10 rounded-xl mt-auto w-fit">
                  Оставить заявку
                </RequestButton>
              </div>
            );
          })}
        </div>
        <div className="mt-6 lg:mt-8 bg-circle_bg rounded-3xl p-6 text-white">
          <p className="text-base lg:text-xl">
            Наши IT-решения направлены на повышение удобства работы с
            информацией, устранение ручных операций и сокращение издержек
            бизнеса. Мы гарантируем надежность, безопасность и высокий уровень
            поддержки наших клиентов.
          </p>
        </div>
      </div>
    </section>
  );
}
