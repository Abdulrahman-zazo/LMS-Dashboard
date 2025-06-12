import {
  useDeleteUserMutation,
  useMakeAdminMutation,
} from "@/app/features/Users/usersApi";
import { toast } from "sonner";

export const useUsersActions = (token: string) => {
  const [makeAdmin] = useMakeAdminMutation();
  const [deleteUsers] = useDeleteUserMutation();

  const handleMakeAmin = async (UsersId: number) => {
    const toastId = toast.loading("جاري حذف الدورة");
    try {
      const result = await makeAdmin({ user_id: UsersId, token });
      if (result.data.status) {
        toast.success("تم الحذف بنجاح", { id: toastId });
      }
    } catch (e) {
      toast.error("فشل في الحذف", { id: toastId });
      console.error(e);
    }
  };

  const handleDelete = async (UsersId: number) => {
    const toastId = toast.loading("جاري حذف الدورة");
    try {
      const result = await deleteUsers({ user_id: UsersId, token });
      if (result.data.status) {
        toast.success("تم الحذف بنجاح", { id: toastId });
      }
    } catch (e) {
      toast.error("فشل في الحذف", { id: toastId });
      console.error(e);
    }
  };

  return { handleMakeAmin, handleDelete };
};
