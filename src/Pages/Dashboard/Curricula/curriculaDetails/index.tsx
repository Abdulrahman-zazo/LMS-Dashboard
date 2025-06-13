import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";

import { useGetCurriculumsByIdQuery } from "@/app/features/Curriculum/CurriculumApi";
import HandelError from "@/components/HandelError";
import { useSubjectsActions } from "../Hooks/useSubjectActions";
import { cookieService } from "@/Cookies/CookiesServices";
import { DeleteDialog, SubjectDialog } from "./SubjectDialogs";
import type { Subject } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

interface Stage {
  id: number;
  name: string;
}

interface Pivot {
  stage: Stage;
  subject: Subject[];
}

const CurriculaDetails = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const [selectStage, setSelectStage] = useState<number>();
  const { data, isLoading, isError } = useGetCurriculumsByIdQuery(Number(id), {
    refetchOnMountOrArgChange: true,
  });
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentSubject, setCurrentSubject] =
    useState<Partial<Subject | undefined>>();

  const token = cookieService.get("auth_token") || "";

  const { handleAdd, handleUpdate, handleDelete } = useSubjectsActions(
    token as string
  );
  const { t, i18n } = useTranslation("translation");

  const pivots = data?.Curriculum.pivot;
  useEffect(() => {
    if (!selectStage && pivots?.length) {
      setSelectStage(pivots[0].stage.id);
    }
  }, [pivots]);
  const onAddClick = () => {
    setCurrentSubject({
      curricula_id: Number(id),
      stage_id: selectStage,
    });
    setIsEdit(false);
    setOpen(true);
  };

  const onEditClick = (Subject: Subject) => {
    setCurrentSubject({
      ...Subject,
      curricula_id: Number(id),
      stage_id: selectStage,
    });
    setIsEdit(true);
    setOpen(true);
  };

  const onDeleteClick = (Subject: Subject) => {
    setCurrentSubject(Subject);
    setOpenDeleteDialog(true);
  };
  if (isLoading)
    return (
      <div>
        <div className="m-2 h-8 w-1/2 bg-neutral-100 animate-pulse"></div>
        <div className="m-2 h-8 w-1/3 bg-neutral-100 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-b animate-pulse border-neutral-200">
              <div className="p-2">
                <Skeleton className="h-42 w-full mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  if (isError || !data) return <HandelError />;
  return (
    <div className="p-2">
      <Tabs
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        defaultValue={
          selectStage ? String(selectStage) : String(pivots[0].stage.id)
        }
        className="w-full"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img
              src={location?.state.row.image}
              alt={location.state.row.name}
              className="w-6 sm:w-8 h-6 sm:h-8 rounded-full object-cover"
            />
            <h2 className="text-sm font-semibold">
              <span className="text-sm mx-2">
                {t("pages.curriculums.curriculum")}
              </span>
              {location?.state.row.name}
            </h2>
          </div>
          <TabsList>
            {pivots.map((el: Pivot) => (
              <TabsTrigger
                key={el.stage.id}
                value={String(el.stage.id)}
                onClick={() => setSelectStage(el.stage.id)}
              >
                {el.stage.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {pivots.map((pivot: Pivot) => (
          <TabsContent key={pivot.stage.id} value={String(pivot.stage.id)}>
            {pivot.subject.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                <div
                  onClick={onAddClick}
                  className="border cursor-pointer hover:shadow-md hover:bg-primary/5 rounded-xl flex flex-col items-center justify-center p-4 bg-white text-primary shadow-sm relative"
                >
                  <Plus className="w-24" />

                  <span className="font-medium text-primary text-xs sm:text-sm">
                    {" "}
                    {t("pages.curriculums.add_subject")}
                  </span>
                </div>
                {pivot.subject.map((subj) => (
                  <div
                    key={subj.id}
                    className="border rounded-xl p-2 bg-white shadow-sm relative"
                  >
                    <img
                      src={subj.image}
                      alt={subj.name}
                      className=" w-full h-auto object-cover rounded-md"
                    />
                    <div className="flex p-2 justify-between items-center mt-4">
                      <h3 className="text-sm sm:text-base font-medium">
                        {subj.name}
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => onEditClick(subj)}
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => onDeleteClick(subj)}
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer   hover:bg-red-500/10 "
                        >
                          <Trash2 className="w-4 h-4 text-red-500/80" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {pivot.subject.length === 0 && (
              <div className="flex flex-col gap-6 justify-center my-24 ">
                <p className="text-xs sm:text-sm text-neutral-600 mx-auto">
                  {t("pages.curriculums.noSubject")}
                </p>

                <Button
                  variant={"default"}
                  className="mx-auto cursor-pointer text-xs sm:text-sm"
                >
                  <Plus size={40} />
                  <span
                    className="font-medium  text-white"
                    onClick={onAddClick}
                  >
                    {t("pages.curriculums.add_subject")}
                  </span>
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <SubjectDialog
        key={isEdit ? currentSubject?.id : "add-SubcurrentSubject"}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={isEdit ? handleUpdate : handleAdd}
        initialData={currentSubject}
      />

      <DeleteDialog
        key="delete-Subject"
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onSubmit={() => {
          if (currentSubject?.id) handleDelete(currentSubject.id);
          setOpenDeleteDialog(false);
        }}
        initialData={currentSubject}
      />
    </div>
  );
};

export default CurriculaDetails;
