import { FormComponent } from "@/components/formComponent";
import { RequestButton } from "@/components/RequestButton";

const Array = [
  {
    id: 1,
    title: "Сложность и масштаб проекта",
    description:
      "Разработка типового решения с минимальной кастомизацией будет стоить дешевле, чем создание индивидуального, сложного продукта с уникальной логикой.",
    postDescription:
      "Чем больше число модулей и сервисов в составе системы, тем выше конечная стоимость.",
  },
  {
    id: 2,
    title: "Необходимые интеграции",
    description:
      "Интеграция с CRM, ERP, бухгалтерскими системами и другими платформами требует дополнительных ресурсов на настройку API и тестирование.",
    postDescription:
      "Подключение облачных сервисов, баз данных и платежных систем также увеличивает бюджет разработки.",
  },
  {
    id: 3,
    title: "Персонализация интерфейса и UX/UI",
    description:
      "Разработка уникального дизайна и индивидуального пользовательского опыта требует участия UX/UI-дизайнеров, что отражается на стоимости.",
    postDescription:
      "Адаптивность под мобильные устройства и мультиязычная поддержка также могут потребовать дополнительных затрат.",
  },
  {
    id: 4,
    title: "Сроки выполнения",
    description:
      "Если проект требуется реализовать в сжатые сроки, привлечение дополнительных специалистов и ресурсов повлияет на стоимость.",
    postDescription:
      "Оптимальный баланс между скоростью выполнения и затратами обсуждается индивидуально.",
  },
  {
    id: 5,
    title: "Поддержка и сопровождение",
    description:
      "Гарантийное сопровождение после сдачи проекта включено в стандартную стоимость.",
    postDescription:
      "Долгосрочная техническая поддержка, обновления и развитие проекта рассчитываются отдельно.",
  },
  {
    id: 6,
    title: "Базовые тарифы",
    description: "Минимальная ставка наших специалистов",
    postDescription: "3500 руб/час.",
    tarif: true,
  },
];

export default function PricePage() {
  return (
    <>
      <section className="bg-main_bg_with_noise bg-blend-soft-light bg-repeat text-white py-16">
        <div className="container">
          <h2 className="text-2xl lg:text-3xl font-medium">Стоимость услуг</h2>
          <p className="mt-2 text-sm lg:text-base max-w-[750px]">
            ЦЕНТР IT-РЕШЕНИЙ предоставляет полный спектр IT-услуг, направленных
            на автоматизацию бизнес-процессов, разработку программного
            обеспечения и интеграцию IT-решений. Наши решения позволяют
            оптимизировать работу предприятий, повысить их эффективность и
            сократить издержки.
          </p>

          <h3 className="text-2xl lg:text-3xl mt-8 font-medium">
            Факторы, влияющие на стоимость:
          </h3>
          <p className="mt-2 text-sm lg:text-base max-w-[750px]">
            Создавать высокотехнологичные, надежные и удобные цифровые решения,
            которые упрощают управление бизнесом, повышают его
            конкурентоспособность и обеспечивают безопасную работу в современном
            цифровом пространстве.
          </p>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`${
                    item.tarif ? "bg-circle_bg" : "bg-main_card_bg"
                  } rounded-3xl p-6 text-white flex flex-col lg:min-h-[200px]`}
                >
                  <h5 className="text-xl font-semibold">
                    {!item.tarif ? (
                      <span className="text-color_red font-black text-2xl">
                        {item.id}.{" "}
                      </span>
                    ) : null}
                    {item.title}
                  </h5>
                  <p className="mt-2 text-base">{item.description}</p>
                  <p className="mt-2 text-base">{item.postDescription}</p>
                  {item.tarif ? (
                    <div className="mt-4 lg:mt-auto">
                      <RequestButton className="bg-main_card_bg hover:opacity-80 transition-opacity duration-200 h-[46px] px-6 rounded-xl">
                        Отправить заявку
                      </RequestButton>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FormComponent
        title="Как получить точный расчет?"
        description="Для получения персонального расчета стоимости заполните форму заявки или свяжитесь с нашими специалистами. Мы предложим оптимальное решение для вашего бизнеса, учитывая все технические и бюджетные ограничения"
        phoneNumber="8 (952) 202-77-30"
        email="main@citr-spb.ru"
        timeWork={`Понедельник - Пятница
          09:30 - 18:00`}
      />
    </>
  );
}
