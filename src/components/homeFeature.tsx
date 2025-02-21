export default function HomeFeature() {
  return (
    <section className="bg-main_bg_with_noise bg-blend-soft-light bg-repeat text-white py-16">
      <div className="container">
        <h2 className="font-bold text-3xl">Преимущества работы с нами</h2>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="bg-main_card_bg_second h-[180px] lg:h-[117px] overflow-hidden rounded-3xl py-4 px-6 relative">
              <h5 className="font-semibold text-xl">Опыт и экспертиза</h5>
              <p className="font-bold text-base mt-2">
                Более 10 лет в сфере IT
              </p>
              <img
                src="/assets/vector/home_exp_1.svg"
                alt=""
                className="w-[100px] lg:w-[158px] h-[88px] absolute -bottom-4 lg:bottom-0 right-16"
                aria-hidden="true"
              />
            </div>
            <div className="bg-main_card_bg_second mt-4 h-[180px] lg:h-[117px] overflow-hidden rounded-3xl py-4 px-6 z-10 relative">
              <h5 className="font-semibold text-xl">
                Гибкость и индивидуальный подход
              </h5>
              <p className="font-bold text-base mt-2">Решения под ваш бизнес</p>
              <img
                src="/assets/vector/home_exp_2.svg"
                alt=""
                className="lg:w-[166px] w-[100px] lg:h-[200px] h-[100px] absolute bottom-0 lg:-bottom-12 right-3"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="bg-main_card_bg_second h-[180px] lg:h-[250px] overflow-hidden rounded-3xl py-4 px-6 relative">
            <h5 className="font-semibold text-xl">
              Сертифицированные специалисты
            </h5>
            <p className="font-bold text-base mt-2">Команда профессионалов</p>
            <img
              src="/assets/vector/home_exp_3.svg"
              alt=""
              className="lg:w-[186px] w-[100px] lg:h-[186px] h-[100px] absolute -bottom-2 right-6"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 relative min-h-[394px]">
        <div className="flex flex-col lg:flex-row">
          <div className="container relative z-10">
            <h2 className="font-bold text-3xl">Контакты</h2>
            <div className="lg:max-w-[50%] pr-5 mt-4">
              <div className="text-xl">8 (952) 202-77-30</div>
              <div className="text-xl">main@citr-spb.ru</div>

              <div className="mt-4">
                <p>Понедельник - Пятница</p>
                <p>9:30 - 18:00</p>
              </div>

              <p className="mt-2">
                188961, Ленинградская обл., м. р-н Выборгский, г.п.
                Светогорское, ГП Лесогорский, ш. Ленинградское, д. 32, помещ. 1
              </p>

              <div className="mt-4 bg-main_card_bg_second rounded-3xl px-8 py-6">
                <p>Заполните форму заявки на нашем сайте,</p>
                <p>и наши специалисты свяжутся с вами</p>
                <p>в ближайшее время</p>

                <div className="mt-4 block w-full bg-color_red hover:bg-red-700 transition-colors text-center py-3 rounded-xl cursor-pointer">
                  Отправить заявку
                </div>
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
  );
}
