type FormComponentProps = {
  title: string;
  description: string;
  phoneNumber: string;
  email: string;
  timeWork: string;
  center?: boolean;
};

export const FormComponent = ({
  title,
  description,
  phoneNumber,
  email,
  timeWork,
  center = true,
}: FormComponentProps) => {
  return (
    <section className="bg-second_bg py-16">
      <div className="container">
        <div
          className={`flex lg:flex-row flex-col gap-6 ${
            center ? "items-center" : "items-start"
          }`}
        >
          <div className="text-color_black">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-base mt-4">{description}</p>
            <div className="flex items-center gap-8 mt-4 text-xl font-semibold">
              <a
                href={`tel:${phoneNumber.replace(/[^\d+]/g, "")}`}
                className="hover:opacity-80 transition-opacity"
              >
                {phoneNumber}
              </a>
              <a
                href={`mailto:${email}`}
                className="hover:opacity-80 transition-opacity"
              >
                {email}
              </a>
            </div>
            <div className="mt-4 text-base whitespace-pre-line">{timeWork}</div>
          </div>
          <div className="bg-main_card_bg lg:min-w-[472px] rounded-3xl p-6">
            <form>
              <h5 className="text-base text-white">
                <span className="font-semibold ">Заполните форму заявки, </span>
                и наши специалисты
                <br /> свяжутся с вами в ближайшее время
              </h5>
              <div className="flex mt-4 flex-col gap-2">
                <input
                  className="bg-color_input focus:outline-none rounded-xl px-2 py-3 w-full text-color_gray text-sm placeholder:text-color_gray"
                  type="text"
                  placeholder="Имя"
                />
                <input
                  className="bg-color_input focus:outline-none rounded-xl px-2 py-3 w-full text-color_gray text-sm placeholder:text-color_gray"
                  type="text"
                  placeholder="Телефон"
                />
                <input
                  className="bg-color_input focus:outline-none rounded-xl px-2 py-3 w-full text-color_gray text-sm placeholder:text-color_gray"
                  type="text"
                  placeholder="Email"
                />
                <textarea
                  className="bg-color_input resize-none focus:outline-none rounded-xl min-h-[116px] px-2 py-3 w-full text-color_gray text-sm placeholder:text-color_gray"
                  placeholder="Описание задачи"
                />
              </div>
              <button className="bg-button_red focus:outline-none hover:opacity-80 transition-opacity duration-200 mt-4 py-3 text-white font-semibold text-base w-full rounded-xl">
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
