import { FormComponent } from "@/components/formComponent";
import { RequestButton } from "@/components/RequestButton";
import { promises as fs } from "fs";
import path from "path";
import { ContactsContent } from "@/types/contacts";
import { Metadata } from "next";

// Функция для получения данных контактов
async function getContactsData(): Promise<ContactsContent> {
  const filePath = path.join(process.cwd(), "src/data/contacts.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

export async function generateMetadata(): Promise<Metadata> {
  const contactsData = await getContactsData();

  return {
    title: contactsData.seo.title,
    description: contactsData.seo.description || "",
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

      <section className="bg-main_bg py-10 lg:py-16 text-white">
        <div className="lg:mt-16 container">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:gap-8">
            <div>
              <h2 className="text-xl font-bold mb-2">
                {contactsData.office.title}
              </h2>
              <div className="font-semibold">
                <span className="text-color_red_second">
                  {contactsData.office.companyName.colored}
                </span>{" "}
                {contactsData.office.companyName.regular}
              </div>
              <p className="mt-2">
                <span className="font-semibold">
                  {contactsData.office.address.label}{" "}
                </span>
                {contactsData.office.address.value}
              </p>
              <h3 className="text-xl font-bold mt-8">
                {contactsData.requisites.title}
              </h3>
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
                  <span className="font-semibold">
                    {contactsData.requisites.inn.label}
                  </span>{" "}
                  {contactsData.requisites.inn.value}
                </p>
                <p>
                  <span className="font-semibold">
                    {contactsData.requisites.ogrn.label}
                  </span>{" "}
                  {contactsData.requisites.ogrn.value}
                </p>
              </div>

              <div className="mt-8 bg-main_card_bg_second rounded-3xl px-6 py-4 lg:px-8 lg:py-6">
                <p className="text-base lg:text-xl">
                  {contactsData.callback.text}
                </p>

                <RequestButton className="mt-4 block w-full bg-color_red hover:bg-red-700 text-sm lg:text-xl transition-colors text-center py-3 rounded-xl cursor-pointer">
                  {contactsData.callback.buttonText}
                </RequestButton>
              </div>
            </div>

            <div className="w-full h-[300px] lg:h-full overflow-hidden rounded-3xl">
              <iframe
                src={contactsData.map.url}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
