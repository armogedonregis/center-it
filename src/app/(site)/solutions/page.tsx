import { FormComponent } from "@/components/formComponent";
import SolutionList from "@/components/solutionList";


export default function SolutionsPage() {
  return (
    <>
      <section className="bg-main_bg_with_noise bg-blend-soft-light bg-repeat text-white py-16">
        <div className="container">
          <h2 className="text-2xl lg:text-3xl font-medium">Решения</h2>
          <p className="mt-2 text-sm lg:text-base max-w-[750px]">
            ЦЕНТР IT-РЕШЕНИЙ разрабатывает комплексные IT-решения, направленные
            на автоматизацию и цифровизацию бизнеса. Мы предлагаем
            индивидуальные технологические решения, способствующие повышению
            эффективности и оптимизации бизнес-процессов.
          </p>

          <SolutionList />
        </div>
      </section>

      <FormComponent
        title="Оставить заявку на консультацию"
        description="Если вас интересует одно из решений, мы готовы провести бесплатную консультацию и предложить наиболее подходящий вариант автоматизации для вашего бизнеса."
        phoneNumber="8 (952) 202-77-30"
        email="main@citr-spb.ru"
        timeWork={`Понедельник - Пятница
          09:30 - 18:00`}
      />
    </>
  );
}
