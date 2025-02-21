import HomeFeature from "@/components/homeFeature";
import { HomeMainPath } from "@/components/homeMainPath";
import { RequestButton } from "@/components/RequestButton";

export default function HomePage() {
  return (
    <>
      <section className="bg-main_bg_with_noise bg-blend-soft-light bg-repeat h-[563px] relative overflow-hidden text-white">
        <div className="container h-full">
          <div className="flex flex-col justify-center -mt-5 lg:mt-0 h-full items-start">
            <h2 className="uppercase font-extrabold text-xl lg:text-2xl">
              <span className="text-color_red_second">Центр</span> IT-РЕШЕНИЙ
            </h2>
            <h1 className="text-2xl lg:text-4xl font-bold block mt-4 lg:w-5/12">
              Ваш надежный партнер в цифровом мире
            </h1>
            <RequestButton />
          </div>
        </div>
        <img
          src="/assets/vector/main_bg_line.svg"
          alt=""
          className="absolute top-0 right-0 lg:w-1/2 h-full object-cover"
          aria-hidden="true"
        />
      </section>

      <HomeMainPath />
      <HomeFeature />
    </>
  );
}
