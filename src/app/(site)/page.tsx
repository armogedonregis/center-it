import HomeFeature from "@/components/homeFeature";
import { HomeMainPath } from "@/components/homeMainPath";
import { RequestButton } from "@/components/RequestButton";
import { promises as fs } from "fs";
import path from "path";
import { HomeContent } from "@/types/home";
import { Metadata } from "next";

// Функция для получения данных с сервера
async function getHomeData(): Promise<HomeContent> {
  const filePath = path.join(process.cwd(), "src/data/home.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

export async function generateMetadata(): Promise<Metadata> {
  const homeData = await getHomeData();
  
  return {
    title: homeData.seo.title,
    description: homeData.seo.description || '',
  };
}

export default async function HomePage() {
  // Получаем данные
  const homeData = await getHomeData();

  return (
    <>
      <section className="bg-main_bg_with_noise bg-blend-soft-light bg-repeat h-[563px] relative overflow-hidden text-white">
        <div className="container h-full relative z-10">
          <div className="flex flex-col justify-center -mt-5 lg:mt-0 h-full items-start">
            <h2 className="uppercase font-extrabold text-xl lg:text-2xl">
              <span className="text-color_red_second">
                Центр
              </span>
              IT-
              <span className="font-normal">РЕШЕНИЙ</span>
            </h2>
            <h1 className="text-2xl lg:text-4xl font-bold block mt-4 lg:w-5/12">
              {homeData.hero.subtitle}
            </h1>
            <RequestButton />
          </div>
        </div>
        <img
          src="/assets/vector/main_bg_line.svg"
          alt=""
          className="absolute top-0 right-0 lg:w-1/2 h-full object-cover z-0"
          aria-hidden="true"
        />
      </section>

      <HomeMainPath features={homeData.features} />
      <HomeFeature
        advantages={homeData.advantages}
        contacts={homeData.contacts}
      />
    </>
  );
}
