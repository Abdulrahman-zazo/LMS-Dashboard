import { useGetAllCurriculumsQuery } from "@/app/features/Curriculum/CurriculumApi";
import HandelError from "@/components/HandelError";
import { cookieService } from "@/Cookies/CookiesServices";
import type { Curriculum } from "@/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurriculumActions } from "./Hooks/useCurriculumActions ";
import CurriculumDialog from "./CurriculumDialog";
import DeleteDialog from "./DeleteDialog";
import { CurriculumCards } from "./CurriculumCards";
import { useNavigate } from "react-router-dom";

const CurriculasPage = () => {
  const { t } = useTranslation("translation");
  const token = cookieService.get("auth_token") || "";
  const { data, isLoading, isError } = useGetAllCurriculumsQuery(
    token as string
  );
  const Navigate = useNavigate();

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
    console.log(course);
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
      <CurriculumCards
        data={data?.curriculums}
        isloading={isLoading}
        buttonAdd={t("pages.curriculums.add")}
        title={t("pages.curriculums.title")}
        description={t("pages.curriculums.text")}
        onAdd={onAddClick}
        onEdit={onEditClick}
        onDelete={onDeleteClick}
        onView={(row) =>
          Navigate(`/curricula/${row.id}`, { state: { row }, replace: true })
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
