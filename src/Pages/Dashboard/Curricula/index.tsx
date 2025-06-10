import { useGetAllCurriculumsQuery } from "@/app/features/Curriculum/CurriculumApi";
import { DataTable } from "@/components/Data-table";
import HandelError from "@/components/HandelError";
import { cookieService } from "@/Cookies/CookiesServices";
import type { Curriculum } from "@/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurriculumActions } from "./Hooks/useCourseActions ";
import CurriculumDialog from "./CurriculumDialog";
import DeleteDialog from "./DeleteDialog";

const CurriculasPage = () => {
  const { t } = useTranslation("translation");
  const token = cookieService.get("auth_token") || "";
  const { data, isLoading, isError } = useGetAllCurriculumsQuery(
    token as string
  );

  const { handleAdd, handleUpdate, handleDelete } = useCurriculumActions(token);

  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentCourse, setCurrentCourse] =
    useState<Partial<Curriculum | undefined>>();

  const onAddClick = () => {
    setCurrentCourse(undefined);
    setIsEdit(false);
    setOpen(true);
  };

  const onEditClick = (course: Curriculum) => {
    setCurrentCourse(course);
    setIsEdit(true);
    setOpen(true);
  };

  const onDeleteClick = (course: Curriculum) => {
    setCurrentCourse(course);
    setOpenDeleteDialog(true);
  };
  if (isError) {
    return <HandelError />;
  }
  return (
    <div>
      <DataTable<Curriculum>
        data={data?.curriculums}
        isloading={isLoading}
        buttonAdd={t("buttons.courses.add")}
        title={t("buttons.courses.title")}
        description={t("buttons.courses.text")}
        columns={[
          { key: "image", header: t("buttons.courses.table.image") },
          { key: "name", header: "المنهاج" },
        ]}
        onAdd={onAddClick}
        onEdit={onEditClick}
        onDelete={onDeleteClick}
        onView={
          (row) => console.log(row)
          // Navigate(`/courses/${row.id}`, { state: { row }, replace: true })
        }
      />

      <CurriculumDialog
        key={isEdit ? currentCourse?.id : "add-course"}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={isEdit ? handleUpdate : handleAdd}
        initialData={currentCourse}
      />

      <DeleteDialog
        key="delete-Curriculum"
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

export default CurriculasPage;
