import { useGetAllCoursesQuery } from "@/app/features/Courses/CoursesApi";
import { DataTable } from "@/components/Data-table";
import HandelError from "@/components/HandelError";
import { cookieService } from "@/Cookies/CookiesServices";
import type { Course } from "@/types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CourseDialog from "./CourseModel";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import { useCourseActions } from "./Hooks/useCourseActions ";

const CoursesPage = () => {
  const Navigate = useNavigate();
  const { t } = useTranslation("translation");
  const token = cookieService.get("auth_token") || "";
  const { handleAdd, handleUpdate, handleDelete } = useCourseActions(token);

  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentCourse, setCurrentCourse] =
    useState<Partial<Course | undefined>>();

  const { data, isLoading, isError } = useGetAllCoursesQuery(token as string);

  const onAddClick = () => {
    setCurrentCourse(undefined);
    setIsEdit(false);
    setOpen(true);
  };

  const onEditClick = (course: Course) => {
    setCurrentCourse(course);
    setIsEdit(true);
    setOpen(true);
  };

  const onDeleteClick = (course: Course) => {
    setCurrentCourse(course);
    setOpenDeleteDialog(true);
  };
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
        onAdd={onAddClick}
        onEdit={onEditClick}
        onDelete={onDeleteClick}
        onView={(row) =>
          Navigate(`/courses/${row.id}`, { state: { row }, replace: true })
        }
      />

      <CourseDialog
        key={isEdit ? currentCourse?.id : "add-course"}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={isEdit ? handleUpdate : handleAdd}
        initialData={currentCourse}
      />

      <DeleteDialog
        key="delete-course"
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onSubmit={() => {
          if (currentCourse?.id) handleDelete(currentCourse.id);
          setOpenDeleteDialog(false);
        }}
        initialData={currentCourse}
      />
    </div>
  );
};

export default CoursesPage;
