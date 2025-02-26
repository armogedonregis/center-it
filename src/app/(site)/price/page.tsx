import { FormComponent } from "@/components/formComponent";
import { RequestButton } from "@/components/RequestButton";
import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";

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

export async function generateMetadata(): Promise<Metadata> {
  const pricesData = await getPricesData();

  return {
    title: pricesData.seo.title,
    description: pricesData.seo.description || "",
  };
}

export default async function PricePage() {
  // Получаем данные
  const pricesData = await getPricesData();

  return (
    <>
      <section className="bg-main_bg_with_noise bg-blend-soft-light bg-repeat text-white py-16">
        <div className="container">
          <h2 className="text-xl lg:text-[28px] font-medium">
            {pricesData.hero.title}
          </h2>
          <p className="mt-2 text-sm lg:text-base max-w-[750px]">
            {pricesData.hero.description}
          </p>

          <h3 className="text-sm lg:text-xl mt-6 lg:mt-8 font-medium">
            {pricesData.factors.title}
          </h3>
          <p className="mt-2 text-sm lg:text-base max-w-[750px]">
            {pricesData.factors.description}
          </p>
          <div className="mt-4 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {pricesData.factors.items.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`${
                    item.tarif ? "bg-circle_bg" : "bg-main_card_bg"
                  } rounded-3xl p-4 lg:p-6 text-white flex flex-col lg:min-h-[200px]`}
                >
                  <h5 className="text-sm lg:text-xl font-semibold">
                    {!item.tarif ? (
                      <span className="text-color_red font-black text-base lg:text-2xl">
                        {item.id}.{" "}
                      </span>
                    ) : null}
                    {item.title}
                  </h5>
                  <p className="mt-1 lg:mt-2 text-xs lg:text-base">
                    {item.description}
                  </p>
                  {item.postDescription && (
                    <p className="mt-1 lg:mt-2 text-xs lg:text-base">
                      {item.tarif ? (
                        <>
                          {item.postDescription
                            .split(/(\d+)/)
                            .map((part, index) =>
                              /^\d+$/.test(part) ? (
                                <span key={index} className="text-2xl font-bold">
                                  {part}
                                </span>
                              ) : (
                                part
                              )
                            )}
                        </>
                      ) : (
                        item.postDescription
                      )}
                    </p>
                  )}
                  {item.tarif ? (
                    <div className="mt-4 lg:mt-2">
                      <RequestButton className="bg-main_card_bg hover:opacity-80 transition-opacity duration-200 text-sm lg:text-base py-2 lg:h-[46px] px-6 rounded-xl">
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
