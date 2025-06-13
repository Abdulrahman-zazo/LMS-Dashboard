import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Curriculum } from "@/types";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (Curriculum: Partial<Curriculum>) => void;
  initialData?: Partial<Curriculum>;
}

const DeleteDialog = ({ open, onClose, onSubmit, initialData }: Props) => {
  const { t, i18n } = useTranslation("translation");

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  const handleDelete = () => {
    if (initialData) {
      onSubmit(initialData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent
        title="Delete-Curriculum"
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <DialogHeader>
          <DialogTitle className=" text-sm sm:text-base text-neutral-800">
            {t("pages.curriculums.dialogs.delete_title")}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-neutral-600">
            {t("pages.curriculums.dialogs.delete_text1")}
            <span className="mx-2 underline font-semibold">
              {initialData?.name}
            </span>
            <br />
            {t("pages.curriculums.dialogs.delete_text2")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-xs sm:text-sm cursor-pointer"
          >
            {t("pages.curriculums.dialogs.cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="text-xs sm:text-sm cursor-pointer"
          >
            {t("pages.curriculums.dialogs.delete_button")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
