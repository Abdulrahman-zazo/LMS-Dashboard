import {
  useAddCurriculumMutation,
  useDeleteCurriculumMutation,
  useUpdateCurriculumMutation,
} from "@/app/features/Curriculum/CurriculumApi";
import type { Curriculum } from "@/types";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useCurriculumActions = (token: string) => {
  const [addCurriculum] = useAddCurriculumMutation();
  const [updateCurriculum] = useUpdateCurriculumMutation();
  const [deleteCurriculum] = useDeleteCurriculumMutation();
  const { t } = useTranslation("translation");

  const handleAdd = async (Curriculum: Partial<Curriculum>) => {
    const toastId = toast.loading(t("pages.curriculums.messages.loading1"));
    try {
      const result = await addCurriculum({ Curriculum, token }).unwrap();
      if (result.status) {
        toast.success(t("pages.curriculums.messages.success1"), {
          id: toastId,
        });
      }
    } catch (e) {
      toast.error(t("pages.curriculums.messages.error1"), { id: toastId });
      console.error(e);
    }
  };

  const handleUpdate = async (Curriculum: Partial<Curriculum>) => {
    const toastId = toast.loading(t("pages.curriculums.messages.loading2"));
    try {
      const result = await updateCurriculum({ Curriculum, token }).unwrap();
      if (result.status) {
        toast.success(t("pages.curriculums.messages.success2"), {
          id: toastId,
        });
      }
    } catch (e) {
      toast.error(t("pages.curriculums.messages.error2"), { id: toastId });
      console.error(e);
    }
  };

  const handleDelete = async (CurriculmID: number) => {
    const toastId = toast.loading(t("pages.curriculums.messages.loading3"));
    try {
      const result = await deleteCurriculum({
        curriculum_id: CurriculmID,
        token,
      });
      if (result.data.status) {
        toast.success(t("pages.curriculums.messages.success3"), {
          id: toastId,
        });
      }
    } catch (e) {
      toast.error(t("pages.curriculums.messages.error3"), { id: toastId });
      console.error(e);
    }
  };

  return { handleAdd, handleUpdate, handleDelete };
};
