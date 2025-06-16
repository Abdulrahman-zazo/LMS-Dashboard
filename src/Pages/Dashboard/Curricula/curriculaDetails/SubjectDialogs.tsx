import ImageCropper from "@/components/ImageUploaderWithCrop";
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
import type { Subject } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (Subject: Partial<Subject>) => void;
  initialData?: Partial<Subject>;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (Subject: Partial<Subject>) => void;
  initialData?: Partial<Subject>;
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
          title="Delete-subject"
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          <DialogHeader>
            <DialogTitle className="text-base text-neutral-800">
              {t("pages.subject.dialogs.delete_title")}
            </DialogTitle>
            <DialogDescription className="text-sm text-neutral-600">
              {t("pages.subject.dialogs.delete_text1")}
              <span className="mx-2 underline font-semibold">
                {initialData?.name}
              </span>
              <br />
              <span className="text-xs">
                {t("pages.subject.dialogs.delete_text2")}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="text-xs sm:text-sm cursor-pointer"
            >
              {t("pages.subject.dialogs.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="text-xs sm:text-sm cursor-pointer"
            >
              {t("pages.subject.dialogs.delete_button")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export function SubjectDialog({ open, onClose, onSubmit, initialData }: Props) {
  const [formData, setFormData] = useState<Partial<Subject>>({});
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>(
    initialData?.image
  );
  const { t } = useTranslation("translation");

  const [showCropper, setShowCropper] = useState(false);
  useEffect(() => {
    setFormData({ ...initialData });
    setPreview(initialData?.image);
  }, [initialData]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (file: File) => {
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "name" && value.length > 100) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, imageFile });
    setFormData({});
    setImageFile(undefined);
    setPreview(undefined);
    onClose();
  };

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFormData({});
      setImageFile(undefined);
      setPreview(undefined);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent
        title={initialData ? " edit subject" : "add subject"}
        className="p-6 sm:rounded-2xl space-y-0 max-w-3xl"
      >
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-primary">
            {initialData
              ? t("pages.subject.dialogs.edit")
              : t("pages.subject.dialogs.add")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs pb-4 border-b border-neutral-200 ">
            {t("pages.subject.dialogs.note")}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="space-y-2 col-span-2 ">
            <Label htmlFor="name" className="text-xs sm:text-sm">
              {" "}
              {t("pages.subject.dialogs.name")}
            </Label>
            <Input
              id="name"
              name="name"
              className="text-xs sm:text-sm"
              disabled={initialData?.name ? true : false}
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="image" className="text-xs sm:text-sm">
              {" "}
              {t("pages.subject.dialogs.image")}
            </Label>
            <Input
              ref={fileInputRef}
              type="file"
              className="cursor-pointer bg-neutral-200 shadow-sm text-xs sm:text-sm"
              accept="image/*"
              onChange={handleFileChange}
            />
            {preview && (
              <img src={preview} alt="Preview" className="w-1/4 mt-2 rounded" />
            )}
            {showCropper && preview && (
              <div className="w-1/4">
                <ImageCropper
                  aspect={16 / 9}
                  imageSrc={preview}
                  onClose={() => setShowCropper(false)}
                  onCropComplete={handleCropComplete}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end col-span-2 gap-2 pt-4 border-t">
            <Button
              type="button"
              className="text-xs sm:text-sm"
              variant="outline"
              onClick={onClose}
            >
              {t("pages.subject.dialogs.cancel")}
            </Button>
            <Button className="text-xs sm:text-sm" type="submit">
              {initialData
                ? t("pages.subject.dialogs.edit_button")
                : t("pages.subject.dialogs.add_button")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
