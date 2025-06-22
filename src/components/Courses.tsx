import CourseCard from "./courseCard";
import { useTranslation } from "react-i18next";

import { useGetAllCoursesQuery } from "@/app/features/Courses/CoursesApi";
import HandelError from "./HandelError";
import { cookieService } from "@/Cookies/CookiesServices";

interface IcourseMax {
  max?: number;
}
interface IcourseCard {
  id: number;
  name: string;
  description: string;
  image: string;
  summary: string;
}

const CoursesComponent = ({ max }: IcourseMax) => {
  const { t } = useTranslation("translation");
  const token = cookieService.get("auth_token") || "";
  const { data, isLoading, isError } = useGetAllCoursesQuery(token as string, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return (
      <div className="mx-auto w-[100%] max-w-[1440px] my-10 px-4">
        <div>
          <div className="w-[50%] h-4 bg-neutral-200 my-4 rounded " />
          <div className="w-[40%] h-4 bg-neutral-200 rounded my-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              className="border rounded-md border-neutral-200 p-4 space-y-3 animate-pulse"
              key={index}
            >
              <div className="w-full h-36 bg-neutral-200 rounded" />

              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-4 bg-neutral-200 rounded w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (isError) {
    return <HandelError />;
  }

  const Courses = !isLoading && data ? [...data.course].reverse() : [];
  return (
    <section className=" px-2 sm:px-6 py-6 sm:py-6 ">
      <div className=" mx-auto w-[100%] max-w-[1440px] ">
        {/* Header */}
        <div className=" mb-4 sm:mb-5">
          <h2 className=" text-xl sm:text-2xl lg:text-3xl font-semibold sm:mb-2 leading-10 sm:leading-12">
            {t("Courses.title")}

            <span className="mx-2 text-primary">{t("Courses.slogan")} </span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-700 max-w-2xl ">
            {t("Courses.description")}
          </p>
        </div>

        {/* Course Cards */}

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 mb-0">
          {data &&
            Courses.slice(0, max).map((course: IcourseCard) => {
              const { description, id, name, image, summary } = course;
              return (
                <CourseCard
                  description={description}
                  summary={summary}
                  id={id}
                  title={name}
                  image={image}
                  key={id}
                  link="/courses"
                />
              );
            })}
        </div>

        {Courses?.length === 0 && (
          <div className="flex justify-center py-12">
            <p className="text-xs sm:text-sm text-neutral-400">
              {t("Courses.Nocourse")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesComponent;
