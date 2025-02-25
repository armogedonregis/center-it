import { promises as fs } from 'fs';
import path from 'path';

// Интерфейс для данных о компании
interface ValueItem {
  id: number;
  title: string;
  description: string;
}

interface AboutCompanyContent {
  seo: {
    title: string;
  };
  hero: {
    title: string;
    description: string;
  };
  whoWeAre?: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
  values: {
    title: string;
    items: ValueItem[];
  };
  advantages: {
    title: string;
    items: ValueItem[];
  };
  partnership: {
    text: string;
  };
  legalInfo: {
    title: string;
    officialName: {
      label: string;
      value: string;
    };
    legalAddress: {
      label: string;
      value: string;
    };
    inn: {
      label: string;
      value: string;
    };
    ogrn: {
      label: string;
      value: string;
    };
    director: {
      label: string;
      value: string;
    };
    contacts: {
      label: string;
      phone: string;
      email: string;
    };
  };
}

// Функция для получения данных о компании
async function getAboutCompanyData(): Promise<AboutCompanyContent> {
  const filePath = path.join(process.cwd(), 'src/data/about.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function AboutPage() {
  // Получаем данные
  const aboutData = await getAboutCompanyData();
  
  return (
    <>
      <section className="bg-main_bg_with_noise bg-blend-soft-light bg-repeat text-white py-16">
        <div className="container">
          <h2 className="text-3xl font-medium">{aboutData.hero.title}</h2>

          <div className="grid lg:grid-cols-2 gap-6 mt-16">
            <div className="bg-main_card_bg rounded-3xl p-6">
              <h3 className="text-xl font-semibold">Кто мы</h3>
              <p className="text-sm mt-2">
                {aboutData.hero.description}
              </p>
            </div>

            <div className="bg-main_card_bg rounded-3xl relative p-6">
              <h3 className="text-xl font-semibold">{aboutData.mission.title}</h3>
              <p className="text-sm mt-2 relative z-10">
                {aboutData.mission.description}
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
            <h3 className="text-2xl font-medium">{aboutData.values.title}</h3>
            <div className="mt-4 grid gap-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {aboutData.values.items.slice(0, 2).map((value) => (
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
                {aboutData.values.items.slice(2, 5).map((value) => (
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
            <h3 className="text-2xl font-medium">{aboutData.advantages.title}</h3>
            <div className="grid lg:grid-cols-2 mt-4 gap-6">
              {aboutData.advantages.items.map((advantage) => (
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
              {aboutData.partnership.text}
            </p>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-semibold">{aboutData.legalInfo.title}</h3>
            <div className="grid lg:grid-cols-2 mt-4 gap-4">
              <div>
                <div>
                  <span className="text-base font-medium">
                    {aboutData.legalInfo.officialName.label}{" "}
                  </span>
                  <span className="text-sm">
                    {aboutData.legalInfo.officialName.value}
                  </span>
                </div>

                <div className="mt-2">
                  <span className="text-base font-medium">
                    {aboutData.legalInfo.legalAddress.label}{" "}
                  </span>
                  <span className="text-sm">
                    {aboutData.legalInfo.legalAddress.value}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div>
                  <span className="text-base font-medium">{aboutData.legalInfo.inn.label} </span>
                  <span className="text-sm">{aboutData.legalInfo.inn.value}</span>
                </div>

                <div>
                  <span className="text-base font-medium">{aboutData.legalInfo.ogrn.label} </span>
                  <span className="text-sm">{aboutData.legalInfo.ogrn.value}</span>
                </div>

                <div>
                  <span className="text-base font-medium">
                    {aboutData.legalInfo.director.label}
                  </span>
                  <div className="text-sm">{aboutData.legalInfo.director.value}</div>
                </div>

                <div>
                  <span className="text-base font-medium">{aboutData.legalInfo.contacts.label}</span>
                  <div className="text-sm">
                    телефон:{" "}
                    <a
                      href={`tel:${aboutData.legalInfo.contacts.phone}`}
                      className="hover:opacity-80 transition-opacity"
                    >
                      {aboutData.legalInfo.contacts.phone}
                    </a>
                    ; email:{" "}
                    <a
                      href={`mailto:${aboutData.legalInfo.contacts.email}`}
                      className="hover:opacity-80 transition-opacity"
                    >
                      {aboutData.legalInfo.contacts.email}
                    </a>
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

