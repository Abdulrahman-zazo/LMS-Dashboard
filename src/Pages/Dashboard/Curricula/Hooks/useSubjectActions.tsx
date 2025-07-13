import {
  useAddSubjectMutation,
  useDeleteSubjectMutation,
  useUpdateSubjectMutation,
} from "@/app/features/Curriculum/Subject/SubjectApi";
import type { Subject } from "@/types";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export const useSubjectsActions = (token: string) => {
  const [addSubject] = useAddSubjectMutation();
  const [updateSubject] = useUpdateSubjectMutation();
  const [deleteSubject] = useDeleteSubjectMutation();
  const { t } = useTranslation("translation");

  const handleAdd = async (Subject: Partial<Subject>) => {
    const toastId = toast.loading(t("pages.subject.messages.loading1"));

    try {
      const result = await addSubject({ Subject, token }).unwrap();
      if (result.status) {
        toast.success(t("pages.subject.messages.success1"), { id: toastId });
      }
    } catch (e) {
      toast.error(t("pages.subject.messages.error1"), { id: toastId });
      console.error(e);
    }
  };

  const handleUpdate = async (Subject: Partial<Subject>) => {
    const toastId = toast.loading(t("pages.subject.messages.loading2"));
    try {
      const result = await updateSubject({ Subject, token }).unwrap();
      if (result.status) {
        toast.success(t("pages.subject.messages.success2"), { id: toastId });
      }
    } catch (e) {
      toast.error(t("pages.subject.messages.error2"), { id: toastId });
      console.error(e);
    }
  };

  const handleDelete = async (SubjectID: number) => {
    const toastId = toast.loading(t("pages.subject.messages.loading3"));
    try {
      const result = await deleteSubject({
        subject_id: SubjectID,
        token,
      });
      if (result.data.status) {
        toast.success(t("pages.subject.messages.success3"), { id: toastId });
      }
    } catch (e) {
      toast.error(t("pages.subject.messages.error3"), { id: toastId });
      console.error(e);
    }
  };

  return { handleAdd, handleUpdate, handleDelete };
};
