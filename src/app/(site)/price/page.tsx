import { FormComponent } from "@/components/formComponent";
import { RequestButton } from "@/components/RequestButton";
import { promises as fs } from "fs";
import path from "path";

// Интерфейс для данных цен
interface PriceItem {
  id: number;
  title: string;
  description: string;
  postDescription: string;
  tarif?: boolean;
}

interface PricesContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    description: string;
  };
  factors: {
    title: string;
    description: string;
    items: PriceItem[];
  };
  form: {
    title: string;
    description: string;
    phoneNumber: string;
    email: string;
    timeWork: string;
  };
}

// Функция для получения данных цен
async function getPricesData(): Promise<PricesContent> {
  const filePath = path.join(process.cwd(), "src/data/prices.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

export default async function PricePage() {
  // Получаем данные
  const pricesData = await getPricesData();

  return (
    <>
      <section className="bg-main_bg_with_noise bg-blend-soft-light bg-repeat text-white py-16">
        <div className="container">
          <h2 className="text-2xl lg:text-3xl font-medium">
            {pricesData.hero.title}
          </h2>
          <p className="mt-2 text-sm lg:text-base max-w-[750px]">
            {pricesData.hero.description}
          </p>

          <h3 className="text-2xl lg:text-3xl mt-8 font-medium">
            {pricesData.factors.title}
          </h3>
          <p className="mt-2 text-sm lg:text-base max-w-[750px]">
            {pricesData.factors.description}
          </p>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pricesData.factors.items.map((item) => {
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
                  {item.postDescription && (
                    <p className="mt-2 text-base">
                      {item.tarif ? (
                        <>
                          {item.postDescription.replace(
                            /(\d+)/,
                            '<span class="text-xl font-bold">$1</span>'
                          )}
                        </>
                      ) : (
                        item.postDescription
                      )}
                    </p>
                  )}
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
        title={pricesData.form.title}
        description={pricesData.form.description}
        phoneNumber={pricesData.form.phoneNumber}
        email={pricesData.form.email}
        timeWork={pricesData.form.timeWork}
      />
    </>
  );
}
