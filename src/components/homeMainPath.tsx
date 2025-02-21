const features = [
  {
    title: "Автоматизация бизнес-процессов",
    description: "Ускорьте работу вашей компании с передовыми IT-решениями",
    icon: "/assets/vector/home_feature_1.svg"
  },
  {
    title: "Разработка и внедрение 1С",
    description: "Оптимизация учёта и управления на платформе 1С",
    icon: "/assets/vector/home_feature_2.svg"
  },
  {
    title: "Разработка программного обеспечения",
    description: "Создание индивидуальных решений для бизнеса",
    icon: "/assets/vector/home_feature_3.svg"
  },
  {
    title: "Информационная безопасность",
    description: "Защитите свои данные и процессы",
    icon: "/assets/vector/home_feature_4.svg"
  },
];

export const HomeMainPath = () => {
  return (
    <section className="bg-main_feature_bg text-black py-16">
      <div className="container">
        <h2>Ключевые IT-направлениями компании</h2>
        <p>
          Мы разрабатываем, внедряем и сопровождаем передовые IT-решения для
          бизнеса
        </p>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 text-white">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-main_card_bg rounded-3xl px-6 py-11 flex lg:flex-row flex-col items-center gap-8"
            >
              <div className="w-12 h-12">
                <img src={feature.icon} alt="" className="w-12 h-12" aria-hidden="true" />
              </div>
              <div>
                <h5 className="text-xl font-semibold">{feature.title}</h5>
                <p className="text-base mt-1">{feature.description}</p>
                <div className="text-color_red_second mt-1 flex items-center gap-2">
                  Подробнее
                  <img
                    src="/assets/vector/arrow_right.svg"
                    alt=""
                    className="w-6 h-6"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
