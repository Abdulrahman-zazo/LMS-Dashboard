import { useGetAllCoursesQuery } from "@/app/features/Courses/CoursesApi";
import { DataTable } from "@/components/Data-table";
import { cookieService } from "@/Cookies/CookiesServices";
import type { Course } from "@/types";
import { useTranslation } from "react-i18next";

const CoursesPage = () => {
  const token = cookieService.get("auth_token") || "";

  const { data, isloading, isError } = useGetAllCoursesQuery(token as string);
  console.log(data);
  const { t } = useTranslation("translation");

  return (
    <div>
      <DataTable<Course>
        data={data?.course}
        buttonAdd={t("buttons.courses.add")}
        title={t("buttons.courses.title")}
        description={t("buttons.courses.text")}
        columns={[
          { key: "image", header: t("buttons.courses.table.image") },
          { key: "name", header: t("buttons.courses.table.name") },
          { key: "summary", header: t("buttons.courses.table.summary") },
        ]}
        onAdd={() => console.log("أضف مستخدم")}
        onEdit={(row) => console.log("تعديل", row)}
        onDelete={(row) => console.log("حذف", row)}
        onView={(row) => console.log("حذف", row)}
      />
    </div>
  );
};

export default CoursesPage;
