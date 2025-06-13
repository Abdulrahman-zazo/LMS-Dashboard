import {
  useAddStageMutation,
  useDeleteStageMutation,
  useUpdateStageMutation,
} from "@/app/features/Curriculum/Stage/StageApi";
import type { Stage } from "@/types";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useStageActions = (token: string) => {
  const [addStage] = useAddStageMutation();
  const [updateStage] = useUpdateStageMutation();
  const [deleteStage] = useDeleteStageMutation();
  const { t } = useTranslation("translation");

  const handleAdd = async (Stage: Partial<Stage>) => {
    const toastId = toast.loading(t("pages.Stages.messages.loading1"));
    try {
      const result = await addStage({ Stage, token }).unwrap();
      console.log(result);
      if (result.status) {
        toast.success(t("pages.Stages.messages.success1"), { id: toastId });
      } else {
        toast.error(result.msg, { id: toastId });
      }
    } catch (e) {
      toast.error(t("pages.Stages.messages.error1"), { id: toastId });
      console.error(e);
    }
  };

  const handleUpdate = async (Stage: Partial<Stage>) => {
    const toastId = toast.loading(t("pages.Stages.messages.loading2"));
    try {
      const result = await updateStage({ Stage, token }).unwrap();
      if (result.status) {
        toast.success(t("pages.Stages.messages.success2"), { id: toastId });
      } else {
        toast.error(result.msg, { id: toastId });
      }
    } catch (e) {
      toast.error(t("pages.Stages.messages.error2"), { id: toastId });
      console.error(e);
    }
  };

  const handleDelete = async (StageId: number) => {
    const toastId = toast.loading(t("pages.Stages.messages.loading3"));
    try {
      const result = await deleteStage({ stage_id: StageId, token });
      if (result.data.status) {
        toast.success(t("pages.Stages.messages.success3"), { id: toastId });
      }
    } catch (e) {
      toast.error(t("pages.Stages.messages.error3"), { id: toastId });
      console.error(e);
    }
  };

  return { handleAdd, handleUpdate, handleDelete };
};
