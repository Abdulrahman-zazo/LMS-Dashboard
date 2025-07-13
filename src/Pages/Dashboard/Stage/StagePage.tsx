import { DataTable } from "@/components/Data-table";
import HandelError from "@/components/HandelError";
import { cookieService } from "@/Cookies/CookiesServices";
import type { Stage } from "@/types";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import { useStageActions } from "./Hooks/useStagesActions ";
import { DeleteDialog, StageDialog } from "./SubjectDialogs";
import { useGetAllStagesQuery } from "@/app/features/Curriculum/Stage/StageApi";

const StagePage = () => {
  const { t } = useTranslation("translation");
  const token = cookieService.get("auth_token") || "";
  const { handleAdd, handleUpdate, handleDelete } = useStageActions(token);

  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentStage, setCurrentStage] =
    useState<Partial<Stage | undefined>>();

  const { data, isLoading, isError } = useGetAllStagesQuery(token as string);

  const onAddClick = () => {
    setCurrentStage(undefined);
    setIsEdit(false);
    setOpen(true);
  };

  const onEditClick = (Stage: Stage) => {
    setCurrentStage(Stage);
    setIsEdit(true);
    setOpen(true);
  };

  const onDeleteClick = (Stage: Stage) => {
    setCurrentStage(Stage);
    setOpenDeleteDialog(true);
  };
  if (isError) {
    return <HandelError />;
  }
  return (
    <div>
      <DataTable<Stage>
        data={data?.stages}
        isloading={isLoading}
        buttonAdd={t("pages.Stages.add")}
        title={t("pages.Stages.title")}
        description={t("pages.Stages.text")}
        columns={[{ key: "name", header: t("pages.Stages.table.name") }]}
        onAdd={onAddClick}
        onEdit={onEditClick}
        onDelete={onDeleteClick}
      />

      <StageDialog
        key={isEdit ? currentStage?.id : "add-Stage"}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={isEdit ? handleUpdate : handleAdd}
        initialData={currentStage}
      />

      <DeleteDialog
        key="delete-Stage"
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onSubmit={() => {
          if (currentStage?.id) handleDelete(currentStage.id);
          setOpenDeleteDialog(false);
        }}
        initialData={currentStage}
      />
      {/* {data?.stages.length === 0 && (
        <div className="flex items-center justify-center h-40">
          <p className="text-xs   sm:text-sm text-neutral-400 text-center">
            لا يوجد مراحل دراسية
          </p>
        </div>
      )} */}
    </div>
  );
};

export default StagePage;
