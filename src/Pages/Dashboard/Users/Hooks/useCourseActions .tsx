import {
  useDeleteUserMutation,
  useMakeAdminMutation,
} from "@/app/features/Users/usersApi";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useUsersActions = (token: string) => {
  const [makeAdmin] = useMakeAdminMutation();
  const [deleteUsers] = useDeleteUserMutation();
  const { t } = useTranslation("translation");
  const handleMakeAmin = async (UsersId: number) => {
    const toastId = toast.loading(t("pages.users.messages.loading2"));
    try {
      const result = await makeAdmin({ user_id: UsersId, token });
      if (result.data.status) {
        toast.success(t("pages.users.messages.success2"), { id: toastId });
      }
    } catch (e) {
      toast.error(t("pages.users.messages.error2"), { id: toastId });
      console.error(e);
    }
  };

  const handleDelete = async (UsersId: number) => {
    const toastId = toast.loading(t("pages.users.messages.loading1"));
    try {
      const result = await deleteUsers({ user_id: UsersId, token });
      if (result.data.status) {
        toast.success(t("pages.users.messages.success1"), { id: toastId });
      }
    } catch (e) {
      toast.error(t("pages.users.messages.error1"), { id: toastId });
      console.error(e);
    }
  };

  return { handleMakeAmin, handleDelete };
};
