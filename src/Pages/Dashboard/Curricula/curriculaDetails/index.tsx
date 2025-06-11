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
  if (isLoading) return <h4>Loading...</h4>;
  if (isError || !data) return <HandelError />;
  return (
    <div className="p-4">
      <Tabs
        defaultValue={
          selectStage ? String(selectStage) : String(pivots[0].stage.id)
        }
        className="w-full"
      >
        <div className="flex items-center justify-between mb-6">
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
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">
              {location?.state.row.name}
            </h2>
            <img
              src={location?.state.row.image}
              alt={location.state.row.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>

        {pivots.map((pivot: Pivot) => (
          <TabsContent key={pivot.stage.id} value={String(pivot.stage.id)}>
            <div className="flex justify-between items-center mb-4">
              {/* <h2 className="text-xl font-semibold">{pivot.stage.name}</h2> */}
            </div>
            {pivot.subject.length > 0 && (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                dir="rtl"
              >
                <div
                  onClick={onAddClick}
                  className="border cursor-pointer hover:shadow-md hover:bg-primary/5 rounded-xl flex flex-col items-center justify-center p-4 bg-white text-primary shadow-sm relative"
                >
                  <Plus size={40} />

                  <span className="font-medium text-primary"> إضافة مادة</span>
                </div>
                {pivot.subject.map((subj) => (
                  <div
                    key={subj.id}
                    className="border rounded-xl p-4 bg-white shadow-sm relative"
                  >
                    <img
                      src={subj.image}
                      alt={subj.name}
                      className="h-40 w-full object-cover rounded-md"
                    />
                    <div className="flex justify-between items-center mt-4">
                      <h3 className="text-lg font-medium">{subj.name}</h3>
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
                <p className="mx-auto">لا توجد مواد لعرضها في هذه المرحلة </p>

                <Button variant={"default"} className="mx-auto cursor-pointer">
                  <Plus size={40} />
                  <span className="font-medium text-white" onClick={onAddClick}>
                    {" "}
                    إضافة مادة
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
