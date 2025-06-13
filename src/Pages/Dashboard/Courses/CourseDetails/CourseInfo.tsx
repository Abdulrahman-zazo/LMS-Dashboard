import { useTranslation } from "react-i18next";

// src/components/CourseInfo.tsx
interface IDescription {
  description: string;
}
export const CourseInfo = ({ description }: IDescription) => {
  const { t } = useTranslation("translation");
  return (
    <div>
      <h2 className=" text-sm font-semibold text-primary  mb-4">
        {t("Courses_card.description")}
      </h2>
      <p className="text-neutral-800 text-sm   leading-relaxed sm:mb-4">
        {description}
      </p>
    </div>
  );
};
