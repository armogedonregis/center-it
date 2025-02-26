import { RequestButton } from "./RequestButton";
import { HomeContent } from "@/types/home";

interface HomeFeatureProps {
  advantages: HomeContent["advantages"];
  contacts: HomeContent["contacts"];
}

export default function HomeFeature({
  advantages,
  contacts,
}: HomeFeatureProps) {
  return (
    <section className="bg-main_bg_with_noise bg-blend-soft-light bg-repeat text-white py-8 lg:py-16">
      <div className="container">
        <h2 className="font-bold text-base lg:text-xl">{advantages.title}</h2>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            {advantages.items.slice(0, 2).map((item, index) => (
              <div
                key={index}
                className="bg-main_card_bg_second h-[100px] lg:h-[117px] overflow-hidden rounded-3xl py-4 px-6 relative mt-4 first:mt-0"
              >
                <h5 className="font-semibold text-sm lg:text-xl">{item.title}</h5>
                <p className="font-bold text-sm lg:text-base mt-2">{item.subtitle}</p>
                <img
                  src={item.icon}
                  alt=""
                  className={`w-[100px] lg:w-[158px] h-[88px] absolute -bottom-4 ${
                    index === 1
                      ? "lg:bottom-0 -bottom-12 right-3"
                      : "lg:bottom-0 right-16"
                  }`}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
          {advantages.items.length > 2 && (
            <div className="bg-main_card_bg_second h-[120px] lg:h-[250px] overflow-hidden rounded-3xl py-4 px-6 relative">
              <h5 className="font-semibold text-sm lg:text-xl">
                {advantages.items[2].title}
              </h5>
              <p className="font-bold text-sm lg:text-base mt-2">
                {advantages.items[2].subtitle}
              </p>
              <img
                src={advantages.items[2].icon}
                alt=""
                className="lg:w-[186px] w-[100px] lg:h-[186px] h-[100px] absolute -bottom-2 right-6"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        <div className="mt-16">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:gap-8">
            <div>
              <h2 className="font-bold text-base lg:text-xl">
                {contacts.title}
              </h2>
              <div className="mt-4">
                <a
                  href={`tel:${contacts.phone.replace(/\s/g, "")}`}
                  className="text-sm lg:text-base font-semibold hover:opacity-80 transition-opacity block"
                >
                  {contacts.phone}
                </a>
                <a
                  href={`mailto:${contacts.email}`}
                  className="text-sm lg:text-base font-semibold hover:opacity-80 transition-opacity block"
                >
                  {contacts.email}
                </a>

                <div className="mt-4 text-sm lg:text-base font-bold">
                  <p>{contacts.workHours.days}</p>
                  <p>{contacts.workHours.hours}</p>
                </div>

                <p className="mt-2 text-bold text-sm lg:text-base">{contacts.address}</p>

                <div className="mt-4 bg-main_card_bg_second rounded-3xl px-6 py-3 lg:px-8 lg:py-6">
                  {contacts.form.description.map((line, index) => (
                    <p className="text-sm lg:text-xl font-bold" key={index}>{line}</p>
                  ))}

                  <RequestButton className="mt-4 block w-full bg-color_red hover:bg-red-700 text-sm lg:text-xl font-semibold transition-colors text-center py-2 lg:py-3 rounded-xl cursor-pointer">
                    {contacts.form.buttonText}
                  </RequestButton>
                </div>
              </div>
            </div>
            <div className="w-full h-[300px] lg:h-full overflow-hidden rounded-3xl">
              <iframe
                src={contacts.map.url}
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
