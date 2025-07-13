import {
  useAddcourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} from "@/app/features/Courses/CoursesApi";
import type { Course } from "@/types";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export const useCourseActions = (token: string) => {
  const [addcourse] = useAddcourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();
  const { t } = useTranslation("translation");

  const handleAdd = async (course: Partial<Course>) => {
    const toastId = toast.loading(t("pages.courses.messages.loading1"));
    try {
      const result = await addcourse({ course, token }).unwrap();
      if (result.status) {
        toast.success(t("pages.courses.messages.success1"), { id: toastId });
      } else {
        toast.error(result.msg, { id: toastId });
      }
    } catch (e) {
      toast.error(t("pages.courses.messages.error1"), { id: toastId });
      console.error(e);
    }
  };

  const handleUpdate = async (course: Partial<Course>) => {
    const toastId = toast.loading(t("pages.courses.messages.loading2"));
    try {
      const result = await updateCourse({ course, token }).unwrap();
      if (result.status) {
        toast.success(t("pages.courses.messages.success2"), { id: toastId });
      } else {
        toast.error(result.msg, { id: toastId });
      }
    } catch (e) {
      toast.error(t("pages.courses.messages.error2"), { id: toastId });
      console.error(e);
    }
  };

  const handleDelete = async (courseId: number) => {
    const toastId = toast.loading(t("pages.courses.messages.loading3"));
    try {
      const result = await deleteCourse({ course_id: courseId, token });
      if (result.data.status) {
        toast.success(t("pages.courses.messages.success3"), { id: toastId });
      }
    } catch (e) {
      toast.error(t("pages.courses.messages.error2"), { id: toastId });
      console.error(e);
    }
  };

  return { handleAdd, handleUpdate, handleDelete };
};
