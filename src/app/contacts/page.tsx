import { FormComponent } from "@/components/formComponent";
import { RequestButton } from "@/components/RequestButton";

export default function ContactsPage() {
  return (
    <>
      <FormComponent
        title="Контакты"
        description="Свяжитесь с нами, чтобы обсудить ваши задачи и найти оптимальное IT-решение для вашего бизнеса.
Мы готовы ответить на все вопросы и предложить индивидуальный подход."
        phoneNumber="8 (952) 202-77-30"
        email="main@citr-spb.ru"
        timeWork={`Понедельник - Пятница
          09:30 - 18:00`}
        center={false}
      />

      <section className="bg-main_bg py-16 text-white">
        <div className="mt-16 relative min-h-[394px]">
          <div className="flex flex-col lg:flex-row">
            <div className="container relative z-10">
              <div className="lg:max-w-[464px] mt-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Наш офис</h2>
                  <div>
                    <span className="text-color_red_second">ЦЕНТР</span>{" "}
                    IT-РЕШЕНИЙ
                  </div>
                  <p className="mt-2">
                    <span className="font-semibold">Юридический адрес: </span>
                    188961, Ленинградская обл., м. р-н Выборгский, г.п.
                    Светогорское, ГП Лесогорский, ш. Ленинградское, д. 32,
                    помещ. 1
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mt-8">Реквизиты компании</h3>
                  <div className="space-y-2 mt-2">
                    <p>
                      <span className="font-semibold">
                        Официальное наименование:
                      </span>{" "}
                      Общество с ограниченной ответственностью «ЦЕНТР АЙТИ
                      РЕШЕНИЙ»
                    </p>
                    <p>
                      <span className="font-semibold">
                        Генеральный директор:
                      </span>{" "}
                      Стрельцов Алексей Александрович
                    </p>
                    <p>
                      <span className="font-semibold">ИНН:</span> 4704117700
                    </p>
                    <p>
                      <span className="font-semibold">ОГРН:</span> 1244700036492
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-main_card_bg_second rounded-3xl px-8 py-6">
                  <p className="text-lg lg:text-xl">
                    Мы всегда на связи и готовы помочь вам реализовать самые
                    амбициозные IT-проекты!
                  </p>

                  <RequestButton className="mt-4 block w-full bg-color_red hover:bg-red-700 transition-colors text-center py-3 rounded-xl cursor-pointer">
                    Отправить заявку
                  </RequestButton>
                </div>
              </div>
            </div>
            <div className="px-5 lg:px-0">
              <div className="mt-8 lg:mt-0 lg:absolute lg:top-0 lg:right-0 w-full lg:w-[calc(50%-8px)] h-[300px] lg:h-full overflow-hidden rounded-3xl lg:rounded-tl-3xl lg:rounded-bl-3xl lg:rounded-tr-none lg:rounded-br-none">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=28.857744%2C61.119496&mode=search&oid=192146271777&ol=biz&z=17&theme=dark"
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
