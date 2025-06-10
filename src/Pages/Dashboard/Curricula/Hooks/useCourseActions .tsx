import {
  useAddCurriculumMutation,
  useDeleteCurriculumMutation,
  useUpdateCurriculumMutation,
} from "@/app/features/Curriculum/CurriculumApi";
import type { Curriculum } from "@/types";
import { toast } from "sonner";

export const useCurriculumActions = (token: string) => {
  const [addCurriculum] = useAddCurriculumMutation();
  const [updateCurriculum] = useUpdateCurriculumMutation();
  const [deleteCurriculum] = useDeleteCurriculumMutation();

  const handleAdd = async (Curriculum: Partial<Curriculum>) => {
    const toastId = toast.loading("جاري إضافة الدورة");
    try {
      const result = await addCurriculum({ Curriculum, token }).unwrap();
      if (result.status) {
        toast.success("تمت الإضافة بنجاح", { id: toastId });
      }
    } catch (e) {
      toast.error("فشل في الإضافة", { id: toastId });
      console.error(e);
    }
  };

  const handleUpdate = async (Curriculum: Partial<Curriculum>) => {
    const toastId = toast.loading("جاري تعديل الدورة");
    try {
      const result = await updateCurriculum({ Curriculum, token }).unwrap();
      if (result.status) {
        toast.success("تم التعديل بنجاح", { id: toastId });
      }
    } catch (e) {
      toast.error("فشل في التعديل", { id: toastId });
      console.error(e);
    }
  };

  const handleDelete = async (CurriculmID: number) => {
    const toastId = toast.loading("جاري حذف الدورة");
    try {
      const result = await deleteCurriculum({
        curriculum_id: CurriculmID,
        token,
      });
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
