import {
  useAddSubjectMutation,
  useDeleteSubjectMutation,
  useUpdateSubjectMutation,
} from "@/app/features/Curriculum/Subject/SubjectApi";
import type { Subject } from "@/types";
import { toast } from "sonner";

export const useSubjectsActions = (token: string) => {
  const [addSubject] = useAddSubjectMutation();
  const [updateSubject] = useUpdateSubjectMutation();
  const [deleteSubject] = useDeleteSubjectMutation();

  const handleAdd = async (Subject: Partial<Subject>) => {
    const toastId = toast.loading("جاري إضافة الدورة");

    try {
      const result = await addSubject({ Subject, token }).unwrap();
      if (result.status) {
        toast.success("تمت الإضافة بنجاح", { id: toastId });
      }
    } catch (e) {
      toast.error("فشل في الإضافة", { id: toastId });
      console.error(e);
    }
  };

  const handleUpdate = async (Subject: Partial<Subject>) => {
    const toastId = toast.loading("جاري تعديل الدورة");
    try {
      const result = await updateSubject({ Subject, token }).unwrap();
      if (result.status) {
        toast.success("تم التعديل بنجاح", { id: toastId });
      }
    } catch (e) {
      toast.error("فشل في التعديل", { id: toastId });
      console.error(e);
    }
  };

  const handleDelete = async (SubjectID: number) => {
    const toastId = toast.loading("جاري حذف الدورة");
    try {
      const result = await deleteSubject({
        subject_id: SubjectID,
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
