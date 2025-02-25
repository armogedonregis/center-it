import { RequestButton } from "@/components/RequestButton";
import { promises as fs } from 'fs';
import path from 'path';
import { Metadata } from "next";

// Создаем интерфейс для данных услуг
interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  list: string[];
}

interface ServicesContent {
  seo: {
    title: string;
    description?: string;
  };
  hero: {
    title: string;
    description: string;
  };
  services: ServiceItem[];
  footer: {
    text: string;
  };
}

// Функция для получения данных услуг
async function getServicesData(): Promise<ServicesContent> {
  const filePath = path.join(process.cwd(), 'src/data/services.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function generateMetadata(): Promise<Metadata> {
  const servicesData = await getServicesData();
  
  return {
    title: servicesData.seo.title,
    description: servicesData.seo.description || '',
  };
}

export default async function ServicesPage() {
  // Получаем данные
  const servicesData = await getServicesData();
  
  return (
    <section className="bg-main_bg_with_noise bg-blend-soft-light bg-repeat text-white py-16">
      <div className="container">
        <h2 className="text-3xl font-medium">{servicesData.hero.title}</h2>
        <p className="mt-2 text-base max-w-[750px]">
          {servicesData.hero.description}
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {servicesData.services.map((item) => {
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
            {servicesData.footer.text}
          </p>
        </div>
      </div>
    </section>
  );
}
