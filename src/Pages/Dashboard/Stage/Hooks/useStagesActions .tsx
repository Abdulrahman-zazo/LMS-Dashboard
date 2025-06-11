import {
  useAddStageMutation,
  useDeleteStageMutation,
  useUpdateStageMutation,
} from "@/app/features/Curriculum/Stage/StageApi";
import type { Stage } from "@/types";
import { toast } from "sonner";

export const useStageActions = (token: string) => {
  const [addStage] = useAddStageMutation();
  const [updateStage] = useUpdateStageMutation();
  const [deleteStage] = useDeleteStageMutation();

  const handleAdd = async (Stage: Partial<Stage>) => {
    const toastId = toast.loading("جاري إضافة الدورة");
    try {
      const result = await addStage({ Stage, token }).unwrap();
      if (result.status) {
        toast.success("تمت الإضافة بنجاح", { id: toastId });
      }
    } catch (e) {
      toast.error("فشل في الإضافة", { id: toastId });
      console.error(e);
    }
  };

  const handleUpdate = async (Stage: Partial<Stage>) => {
    const toastId = toast.loading("جاري تعديل الدورة");
    try {
      const result = await updateStage({ Stage, token }).unwrap();
      if (result.status) {
        toast.success("تم التعديل بنجاح", { id: toastId });
      }
    } catch (e) {
      toast.error("فشل في التعديل", { id: toastId });
      console.error(e);
    }
  };

  const handleDelete = async (StageId: number) => {
    const toastId = toast.loading("جاري حذف الدورة");
    try {
      const result = await deleteStage({ stage_id: StageId, token });
      if (result.data.status) {
        toast.success("تم الحذف بنجاح", { id: toastId });
      }
    } catch (e) {
      toast.error("فشل في الحذف", { id: toastId });
      console.error(e);
    }
  };

  return { handleAdd, handleUpdate, handleDelete };
};
