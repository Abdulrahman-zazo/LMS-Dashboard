import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Icourse {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
  summary: string;
  btnType?: "link" | "button";
}
const CourseCard = (course: Icourse) => {
  const { btnType = "button", image, title, id, link, summary } = course;
  const Navigate = useNavigate();
  const { t } = useTranslation("translation");

  return (
    <div
      key={id}
      className="bg-bg-purple shadow-sm rounded-xl overflow-hidden flex flex-col h-full"
    >
      <img
        loading="lazy"
        src={image}
        alt={title}
        className="h-36 w-full object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm lg:text-base ">{title}</h3>

        <div className="text-xs my-2 sm:my-4 sm:text-sm text-neutral-700">
          {summary?.slice(0, 150)}..
        </div>

        <button
          title="buttons btn-details"
          onClick={() => Navigate(`${link}/${id}`)}
          className={`mt-auto w-full text-sm sm:text-sm ${
            btnType === "button" ? "bg-primary text-white" : "text-primary"
          } border border-primary px-4 py-2 shadow-md rounded hover:bg-primary/80 hover:text-white transition`}
        >
          {t("Courses_card.btn-details")}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
