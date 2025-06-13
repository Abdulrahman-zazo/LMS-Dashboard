import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Users } from "@/types";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  type?: "Delete" | "Admin";
  onClose: () => void;
  onSubmit: (user: Partial<Users>) => void;
  initialData?: Partial<Users>;
}

const DeleteDialog = ({
  open,
  onClose,
  onSubmit,
  initialData,
  type = "Delete",
}: Props) => {
  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  const handleAction = () => {
    if (initialData) {
      onSubmit(initialData);
    }
  };

  const { t, i18n } = useTranslation("translation");

  const isDelete = type === "Delete";

  const titleText = isDelete
    ? t("pages.users.dialogs.delete_title")
    : t("pages.users.dialogs.Make_admin_title");

  const descriptionText = isDelete
    ? `${t("pages.users.dialogs.delete_text1")}"${initialData?.name}"${t(
        "pages.users.dialogs.delete_title2"
      )}`
    : `${t("pages.users.dialogs.Make_admin_text1")}"${initialData?.name}"${t(
        "pages.users.dialogs.Make_admin_text2"
      )}`;

  const confirmButtonText = isDelete
    ? t("pages.users.dialogs.delete_button")
    : t("pages.users.dialogs.save");
  const confirmButtonVariant = isDelete ? "destructive" : "secondary";

  return (
    <div dir="rtl">
      <Dialog open={open} onOpenChange={handleDialogChange}>
        <DialogContent
          title={type === "Delete" ? "Delete-course" : "Make-admin"}
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          <DialogHeader>
            <DialogTitle className="text-base text-neutral-800">
              {titleText}
            </DialogTitle>
            <DialogDescription className="text-sm text-neutral-600">
              {descriptionText}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              className="text-xs sm:text-sm cursor-pointer"
              onClick={onClose}
            >
              {t("pages.users.dialogs.cancel")}
            </Button>
            <Button
              variant={confirmButtonVariant}
              className="text-xs sm:text-sm cursor-pointer"
              onClick={handleAction}
            >
              {confirmButtonText}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
