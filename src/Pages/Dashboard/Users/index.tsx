import { useGetAllUsersQuery } from "@/app/features/Users/usersApi";
import { DataTable } from "@/components/Data-table";
import HandelError from "@/components/HandelError";
import { cookieService } from "@/Cookies/CookiesServices";
import type { Users } from "@/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import DeleteDialog from "./DeleteDialog";
import { useUsersActions } from "./Hooks/useCourseActions ";

const UsersPage = () => {
  const { t } = useTranslation("translation");
  const token = cookieService.get("auth_token") || "";
  const { handleMakeAmin, handleDelete } = useUsersActions(token);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [MakeAdmin, setMakeAdmin] = useState(false);
  // const [openMakeAdminDialog, setOpenMakeAdminDialog] = useState(false);

  const [currentusers, setCurrentusers] =
    useState<Partial<Users | undefined>>();

  const { data, isLoading, isError } = useGetAllUsersQuery(token as string);
  console.log(data);
  const onDeleteClick = (users: Users) => {
    setCurrentusers(users);
    setOpenDeleteDialog(true);
  };
  const onMakeAdminClick = (users: Users) => {
    setMakeAdmin(true);
    setCurrentusers(users);
    setOpenDeleteDialog(true);
  };
  if (isError) {
    return <HandelError />;
  }
  return (
    <div>
      <div>
        <DataTable<Users>
          data={data?.user}
          ImageType="circle"
          isloading={isLoading}
          buttonAdd={t("buttons.userss.add")}
          title={t("buttons.userss.title")}
          description={t("buttons.userss.text")}
          columns={[
            { key: "image", header: "الصورة المصغرة" },
            { key: "name", header: "الاسم " },
            { key: "phone", header: "الهاتف" },
            { key: "email", header: "البريد الالكتروني" },
          ]}
          onMakeAdmin={onMakeAdminClick}
          onDelete={onDeleteClick}
        />

        <DeleteDialog
          key="delete-users"
          type={MakeAdmin ? "Admin" : "Delete"}
          open={openDeleteDialog}
          onClose={() => {
            setOpenDeleteDialog(false);
            setMakeAdmin(false);
          }}
          onSubmit={() => {
            if (MakeAdmin) {
              if (currentusers?.id) handleMakeAmin(currentusers.id);
              setOpenDeleteDialog(false);
              setMakeAdmin(false);
            } else {
              if (currentusers?.id) handleDelete(currentusers.id);
              setOpenDeleteDialog(false);
              setMakeAdmin(false);
            }
          }}
          initialData={currentusers}
        />
      </div>
    </div>
  );
};

export default UsersPage;
