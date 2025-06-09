import { useGetAllCoursesQuery } from "@/app/features/Courses/CoursesApi";
import { DataTable } from "@/components/Data-table";
import HandelError from "@/components/HandelError";
import { cookieService } from "@/Cookies/CookiesServices";
import type { Course } from "@/types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CourseDialog from "./CourseModel";
import { useState } from "react";

const CoursesPage = () => {
  const Navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dataEdit, setdataEdit] = useState<Partial<Course> | undefined>({});

  const token = cookieService.get("auth_token") || "";
  const { data, isLoading, isError } = useGetAllCoursesQuery(token as string);
  const { t } = useTranslation("translation");
  if (isError) {
    return <HandelError />;
  }
  return (
    <div>
      <DataTable<Course>
        data={data?.course}
        isloading={isLoading}
        buttonAdd={t("buttons.courses.add")}
        title={t("buttons.courses.title")}
        description={t("buttons.courses.text")}
        columns={[
          { key: "image", header: t("buttons.courses.table.image") },
          { key: "name", header: t("buttons.courses.table.name") },
          { key: "summary", header: t("buttons.courses.table.summary") },
        ]}
        onAdd={() => {
          setdataEdit(undefined);
          setIsEdit(false);
          setOpen(true);
        }}
        onEdit={(row) => {
          setdataEdit(row);
          setIsEdit(true);
          setOpen(true);
        }}
        onDelete={(row) => console.log("حذف", row)}
        onView={(row) =>
          Navigate(`/courses/${row.id}`, { state: { row }, replace: true })
        }
      />

      <CourseDialog
        key={isEdit ? dataEdit?.id : "add-course"} // لإجبار إعادة الإنشاء عند التبديل بين الإضافة والتعديل
        open={open}
        onClose={() => {
          setOpen(false);
          setdataEdit(undefined);
          setIsEdit(false);
        }}
        onSubmit={(data) => {
          if (isEdit) {
            console.log("تحديث", data);
            // updateCourse(data);
          } else {
            console.log("إضافة", data);
            // addCourse(data);
          }
        }}
        initialData={isEdit ? dataEdit : undefined}
      />
    </div>
  );
};

export default CoursesPage;
