import {
  useAddcourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} from "@/app/features/Courses/CoursesApi";
import type { Course } from "@/types";
import { toast } from "sonner";

export const useCourseActions = (token: string) => {
  const [addcourse] = useAddcourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  const handleAdd = async (course: Partial<Course>) => {
    const toastId = toast.loading("جاري إضافة الدورة");
    try {
      const result = await addcourse({ course, token }).unwrap();
      if (result.status) {
        toast.success("تمت الإضافة بنجاح", { id: toastId });
      }
    } catch (e) {
      toast.error("فشل في الإضافة", { id: toastId });
      console.error(e);
    }
  };

  const handleUpdate = async (course: Partial<Course>) => {
    const toastId = toast.loading("جاري تعديل الدورة");
    try {
      const result = await updateCourse({ course, token }).unwrap();
      if (result.status) {
        toast.success("تم التعديل بنجاح", { id: toastId });
      }
    } catch (e) {
      toast.error("فشل في التعديل", { id: toastId });
      console.error(e);
    }
  };

  const handleDelete = async (courseId: number) => {
    const toastId = toast.loading("جاري حذف الدورة");
    try {
      const result = await deleteCourse({ course_id: courseId, token });
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
