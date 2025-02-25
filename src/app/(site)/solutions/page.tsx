import { FormComponent } from "@/components/formComponent";
import SolutionList from "@/components/solutionList";
import { promises as fs } from 'fs';
import path from 'path';
import { SolutionsContent } from "@/types/solutions";
import { Metadata } from "next";

// Функция для получения данных решений
async function getSolutionsData(): Promise<SolutionsContent> {
  const filePath = path.join(process.cwd(), 'src/data/solutions.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function generateMetadata(): Promise<Metadata> {
  const solutionsData = await getSolutionsData();
  
  return {
    title: solutionsData.seo.title,
    description: solutionsData.seo.description || '',
  };
}

export default async function SolutionsPage() {
  // Получаем данные
  const solutionsData = await getSolutionsData();
  
  return (
    <>
      <section className="bg-main_bg_with_noise bg-blend-soft-light bg-repeat text-white py-16">
        <div className="container">
          <h2 className="text-2xl lg:text-3xl font-medium">{solutionsData.hero.title}</h2>
          <p className="mt-2 text-sm lg:text-base max-w-[750px]">
            {solutionsData.hero.description}
          </p>

          <SolutionList solutions={solutionsData.solutions} />
        </div>
      </section>

      <FormComponent
        title={solutionsData.form.title}
        description={solutionsData.form.description}
        phoneNumber={solutionsData.form.phoneNumber}
        email={solutionsData.form.email}
        timeWork={solutionsData.form.timeWork}
      />
    </>
  );
}
