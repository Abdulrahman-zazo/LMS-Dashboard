import { useTranslation } from "react-i18next";

// src/components/CourseInfo.tsx
interface IDescription {
  description: string;
}
export const CourseInfo = ({ description }: IDescription) => {
  const { t } = useTranslation("translation");
  return (
    <div>
      <h2 className=" text-base sm:text-xl font-medium text-text mb-4">
        {t("Courses_card.description")}
      </h2>
      <p className="text-paragraph text-sm sm:text-base  leading-relaxed sm:mb-4">
        {description}
      </p>
    </div>
  );
};
