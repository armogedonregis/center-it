import Link from "next/link";
import { HomeContent } from "@/types/home";

interface HomeMainPathProps {
  features: HomeContent['features'];
}

export const HomeMainPath = ({ features }: HomeMainPathProps) => {
  return (
    <section className="bg-main_feature_bg text-black py-16">
      <div className="container">
        <h2 className="text-color_black text-xl font-medium lg:text-3xl">{features.title}</h2>
        <p className="text-color_black text-base lg:text-xl">
          {features.description}
        </p>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 text-white">
          {features.items.map((feature) => (
            <div
              key={feature.title}
              className="bg-main_card_bg rounded-3xl px-6 py-11 flex lg:flex-row flex-col items-center gap-8"
            >
              <div className="w-12 h-12">
                <img
                  src={feature.icon}
                  alt=""
                  className="w-12 h-12"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h5 className="text-xl font-semibold">{feature.title}</h5>
                <p className="text-base mt-1">{feature.description}</p>
                <Link
                  href="/solutions"
                  className="text-color_red_second mt-1 flex items-center gap-2"
                >
                  Подробнее
                  <img
                    src="/assets/vector/arrow_right.svg"
                    alt=""
                    className="w-6 h-6"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
