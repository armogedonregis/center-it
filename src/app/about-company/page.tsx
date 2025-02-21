const values = [
  {
    id: 1,
    title: "Инновации",
    description:
      "Мы постоянно следим за новейшими IT-подходами и внедряем передовые технологии в наши решения.",
  },
  {
    id: 2,
    title: "Качество",
    description:
      "Каждый проект проходит строгий контроль качества, чтобы гарантировать стабильность, надежность и удобство использования.",
  },
  {
    id: 3,
    title: "Индивидуальный подход",
    description:
      "Мы исследуем особенности каждого бизнеса и предлагаем персонализированные решения, учитывающие пожелания его бизнеса.",
  },
  {
    id: 4,
    title: "Прозрачность",
    description:
      "Открытость в работе, четкие сроки выполнения и понятное ценообразование.",
  },
  {
    id: 5,
    title: "Долгосрочное партнерство",
    description:
      "Мы стремимся к долгосрочному сотрудничеству, обеспечивая поддержку и развитие IT-решений на протяжении всего жизненного цикла.",
  },
];

const advantages = [
  {
    id: 1,
    title: "Комплексный подход",
    description:
      "От анализа бизнес-процессов до внедрения и поддержки IT-решений.",
  },
  {
    id: 2,
    title: "Гибкость и масштабируемость",
    description: "Адаптируемся под ваши меняющиеся потребности.",
  },
  {
    id: 3,
    title: "Надежность и безопасность",
    description: "Обеспечиваем надежную информационную безопасность.",
  },
  {
    id: 4,
    title: "Экспертная команда",
    description: "Сертифицированные специалисты с многолетним опытом в IT.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-main_bg_with_noise bg-blend-soft-light bg-repeat text-white py-16">
        <div className="container">
          <h2 className="text-3xl font-medium">О компании</h2>

          <div className="grid lg:grid-cols-2 gap-6 mt-16">
            <div className="bg-main_card_bg rounded-3xl p-6">
              <h3 className="text-xl font-semibold">Кто мы</h3>
              <p className="text-sm mt-2">
                ЦЕНТР IT-РЕШЕНИЙ – это инновационная IT-компания,
                предоставляющая комплексные цифровые решения для бизнеса. Мы
                специализируемся на разработке программного обеспечения,
                автоматизации бизнес-процессов и внедрении передовых
                IT-технологий, помогая нашим клиентам повышать эффективность и
                достигать новых высот в цифровой трансформации. Наш подход
                основан на сочетании многолетнего опыта, передовых технологий и
                глубокой экспертизы в IT-сфере. Мы работаем с компаниями разных
                отраслей, создавая индивидуальные решения, полностью
                адаптированные под их бизнес-задачи.
              </p>
            </div>

            <div className="bg-main_card_bg rounded-3xl relative p-6">
              <h3 className="text-xl font-semibold">Наша миссия</h3>
              <p className="text-sm mt-2 relative z-10">
                Создавать высокотехнологичные, надежные и удобные цифровые
                решения, которые упрощают управление бизнесом, повышают его
                конкурентоспособность и обеспечивают безопасную работу в
                современном цифровом пространстве.
              </p>
              <img
                src="/assets/vector/about_flag.svg"
                alt=""
                className="w-[143px] h-[143px] z-[1] absolute bottom-0 right-2"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="mt-10 lg:mt-16">
            <h3 className="text-2xl font-medium">Наши ценности</h3>
            <div className="mt-4 grid gap-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {values.slice(0, 2).map((value) => (
                  <div
                    key={value.id}
                    className="bg-main_card_bg rounded-2xl p-6"
                  >
                    <h4 className="text-xl font-semibold">{value.title}</h4>
                    <p className="text-sm mt-2">{value.description}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {values.slice(2, 5).map((value) => (
                  <div
                    key={value.id}
                    className="bg-main_card_bg rounded-2xl p-6"
                  >
                    <h4 className="text-xl font-semibold">{value.title}</h4>
                    <p className="text-sm mt-2">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 lg:mt-16">
            <h3 className="text-2xl font-medium">Почему выбирают нас</h3>
            <div className="grid lg:grid-cols-2 mt-4 gap-6">
              {advantages.map((advantage) => (
                <div
                  key={advantage.id}
                  className="bg-main_card_bg rounded-2xl p-6"
                >
                  <h4 className="text-xl font-semibold">{advantage.title}</h4>
                  <p className="text-sm mt-2">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 bg-circle_bg rounded-3xl py-4 px-6">
            <p className="text-base lg:text-xl lg:pr-20">
              Мы стремимся быть не просто подрядчиком, а надежным партнером в
              цифровом развитии вашего бизнеса.
            </p>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-semibold">Юридическая информация</h3>
            <div className="grid lg:grid-cols-2 mt-4 gap-4">
              <div>
                <div>
                  <span className="text-base font-medium">
                    Официальное наименование:{" "}
                  </span>
                  <span className="text-sm">
                    Общество с ограниченной ответственностью «ЦЕНТР АЙТИ
                    РЕШЕНИЙ»
                  </span>
                </div>

                <div className="mt-2">
                  <span className="text-base font-medium">
                    Юридический адрес:{" "}
                  </span>
                  <span className="text-sm">
                    188961, Ленинградская обл., м. р-н Выборгский, г.п.
                    Светогорское, ГП Лесогорский, ш. Ленинградское, д. 32,
                    помещ. 1
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div>
                  <span className="text-base font-medium">ИНН: </span>
                  <span className="text-sm">4704117700</span>
                </div>

                <div>
                  <span className="text-base font-medium">ОГРН: </span>
                  <span className="text-sm">1244700036492</span>
                </div>

                <div>
                  <span className="text-base font-medium">
                    Генеральный директор:
                  </span>
                  <div className="text-sm">Стрельцов Алексей Александрович</div>
                </div>

                <div>
                  <span className="text-base font-medium">Контакты:</span>
                  <div className="text-sm">
                    телефон: 8 (952) 202-77-30; email: main@citr-spb.ru
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
