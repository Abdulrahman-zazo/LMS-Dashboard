import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Stage } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (Stage: Partial<Stage>) => void;
  initialData?: Partial<Stage>;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (Stage: Partial<Stage>) => void;
  initialData?: Partial<Stage>;
}

export const DeleteDialog = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) => {
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
    <div dir="rtl">
      <Dialog open={open} onOpenChange={handleDialogChange}>
        <DialogContent
          title="Delete-Stage"
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          <DialogHeader>
            <DialogTitle className="text-base text-neutral-800">
              {t("pages.Stages.dialogs.delete_title")}
            </DialogTitle>
            <DialogDescription className="text-sm text-neutral-600">
              {t("pages.Stages.dialogs.delete_text1")}
              <span className="mx-2 underline font-semibold">
                {initialData?.name}
              </span>
              <br />
              <span className="text-xs">
                {t("pages.Stages.dialogs.delete_text2")}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="text-xs sm:text-sm cursor-pointer"
            >
              {t("pages.Stages.dialogs.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="text-xs sm:text-sm cursor-pointer"
            >
              {t("pages.Stages.dialogs.delete_button")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export function StageDialog({ open, onClose, onSubmit, initialData }: Props) {
  const [formData, setFormData] = useState<Partial<Stage>>({});
  useEffect(() => {
    setFormData({ ...initialData });
  }, [initialData]);
  const { t } = useTranslation("translation");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "name" && value.length > 100) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData });
    setFormData({});
    onClose();
  };

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFormData({});
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent
        title={initialData ? " edit Stage" : "add Stage"}
        className="p-6 sm:rounded-2xl space-y-0 max-w-3xl"
      >
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-primary">
            {initialData
              ? t("pages.Stages.dialogs.edit")
              : t("pages.Stages.dialogs.add")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs pb-4 border-b border-neutral-200">
            {t("pages.Stages.dialogs.note")}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="space-y-2 col-span-2 ">
            <Label htmlFor="name" className="text-xs">
              {" "}
              {t("pages.Stages.dialogs.name")}
            </Label>
            <Input
              id="name"
              name="name"
              className="text-xs sm:text-sm"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end col-span-2  gap-2 pt-4 border-t">
            <Button
              type="button"
              className="text-xs sm:text-sm"
              variant="outline"
              onClick={onClose}
            >
              {t("pages.Stages.dialogs.cancel")}
            </Button>
            <Button className="text-xs sm:text-sm" type="submit">
              {initialData
                ? t("pages.Stages.dialogs.edit_button")
                : t("pages.Stages.dialogs.add_button")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
