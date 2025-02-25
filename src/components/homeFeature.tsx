import { RequestButton } from "./RequestButton";
import { HomeContent } from "@/types/home";

interface HomeFeatureProps {
  advantages: HomeContent['advantages'];
  contacts: HomeContent['contacts'];
}

export default function HomeFeature({ advantages, contacts }: HomeFeatureProps) {
  return (
    <section className="bg-main_bg_with_noise bg-blend-soft-light bg-repeat text-white py-16">
      <div className="container">
        <h2 className="font-bold text-2xl lg:text-3xl">
          {advantages.title}
        </h2>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            {advantages.items.slice(0, 2).map((item, index) => (
              <div 
                key={index} 
                className="bg-main_card_bg_second h-[180px] lg:h-[117px] overflow-hidden rounded-3xl py-4 px-6 relative mt-4 first:mt-0"
              >
                <h5 className="font-semibold text-xl">{item.title}</h5>
                <p className="font-bold text-base mt-2">
                  {item.subtitle}
                </p>
                <img
                  src={item.icon}
                  alt=""
                  className={`w-[100px] lg:w-[158px] h-[88px] absolute -bottom-4 ${index === 1 ? 'lg:bottom-0 -bottom-12 right-3' : 'lg:bottom-0 right-16'}`}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
          {advantages.items.length > 2 && (
            <div className="bg-main_card_bg_second h-[180px] lg:h-[250px] overflow-hidden rounded-3xl py-4 px-6 relative">
              <h5 className="font-semibold text-xl">
                {advantages.items[2].title}
              </h5>
              <p className="font-bold text-base mt-2">{advantages.items[2].subtitle}</p>
              <img
                src={advantages.items[2].icon}
                alt=""
                className="lg:w-[186px] w-[100px] lg:h-[186px] h-[100px] absolute -bottom-2 right-6"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 relative min-h-[394px]">
        <div className="flex flex-col lg:flex-row">
          <div className="container">
            <h2 className="font-bold text-2xl lg:text-3xl">{contacts.title}</h2>
            <div className="lg:max-w-[50%] pr-5 mt-4">
              <a
                href={`tel:${contacts.phone.replace(/\s/g, '')}`}
                className="text-lg lg:text-xl hover:opacity-80 transition-opacity block"
              >
                {contacts.phone}
              </a>
              <a
                href={`mailto:${contacts.email}`}
                className="text-lg lg:text-xl hover:opacity-80 transition-opacity block"
              >
                {contacts.email}
              </a>

              <div className="mt-4">
                <p>{contacts.workHours.days}</p>
                <p>{contacts.workHours.hours}</p>
              </div>

              <p className="mt-2">
                {contacts.address}
              </p>

              <div className="mt-4 bg-main_card_bg_second rounded-3xl px-8 py-6">
                {contacts.form.description.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}

                <RequestButton className="mt-4 block w-full bg-color_red hover:bg-red-700 transition-colors text-center py-3 rounded-xl cursor-pointer">
                  {contacts.form.buttonText}
                </RequestButton>
              </div>
            </div>
          </div>
          <div className="px-5 lg:px-0">
            <div className="mt-8 lg:mt-0 lg:absolute lg:top-0 lg:right-0 w-full lg:w-[calc(50%-8px)] h-[300px] lg:h-full overflow-hidden rounded-3xl lg:rounded-tl-3xl lg:rounded-bl-3xl lg:rounded-tr-none lg:rounded-br-none">
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
