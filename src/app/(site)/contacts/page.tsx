import { FormComponent } from "@/components/formComponent";
import { RequestButton } from "@/components/RequestButton";
import { promises as fs } from 'fs';
import path from 'path';
import { ContactsContent } from "@/types/contacts";
import { Metadata } from "next";

// Функция для получения данных контактов
async function getContactsData(): Promise<ContactsContent> {
  const filePath = path.join(process.cwd(), 'src/data/contacts.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function generateMetadata(): Promise<Metadata> {
  const contactsData = await getContactsData();
  
  return {
    title: contactsData.seo.title,
    description: contactsData.seo.description || '',
  };
}

export default async function ContactsPage() {
  // Получаем данные
  const contactsData = await getContactsData();
  
  return (
    <>
      <FormComponent
        title={contactsData.form.title}
        description={contactsData.form.description}
        phoneNumber={contactsData.form.phoneNumber}
        email={contactsData.form.email}
        timeWork={contactsData.form.timeWork}
        center={false}
      />

      <section className="bg-main_bg py-16 text-white">
        <div className="mt-16 relative min-h-[394px]">
          <div className="flex flex-col lg:flex-row">
            <div className="container">
              <div className="lg:max-w-[464px] mt-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{contactsData.office.title}</h2>
                  <div>
                    <span className="text-color_red_second">{contactsData.office.companyName.colored}</span>{" "}
                    {contactsData.office.companyName.regular}
                  </div>
                  <p className="mt-2">
                    <span className="font-semibold">{contactsData.office.address.label} </span>
                    {contactsData.office.address.value}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mt-8">{contactsData.requisites.title}</h3>
                  <div className="space-y-2 mt-2">
                    <p>
                      <span className="font-semibold">
                        {contactsData.requisites.officialName.label}
                      </span>{" "}
                      {contactsData.requisites.officialName.value}
                    </p>
                    <p>
                      <span className="font-semibold">
                        {contactsData.requisites.director.label}
                      </span>{" "}
                      {contactsData.requisites.director.value}
                    </p>
                    <p>
                      <span className="font-semibold">{contactsData.requisites.inn.label}</span>{" "}
                      {contactsData.requisites.inn.value}
                    </p>
                    <p>
                      <span className="font-semibold">{contactsData.requisites.ogrn.label}</span>{" "}
                      {contactsData.requisites.ogrn.value}
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-main_card_bg_second rounded-3xl px-8 py-6">
                  <p className="text-lg lg:text-xl">
                    {contactsData.callback.text}
                  </p>

                  <RequestButton className="mt-4 block w-full bg-color_red hover:bg-red-700 transition-colors text-center py-3 rounded-xl cursor-pointer">
                    {contactsData.callback.buttonText}
                  </RequestButton>
                </div>
              </div>
            </div>
            <div className="px-5 lg:px-0">
              <div className="mt-8 lg:mt-0 lg:absolute lg:top-0 lg:right-0 w-full lg:w-[calc(50%-8px)] h-[300px] lg:h-full overflow-hidden rounded-3xl lg:rounded-tl-3xl lg:rounded-bl-3xl lg:rounded-tr-none lg:rounded-br-none">
                <iframe
                  src={contactsData.map.url}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
