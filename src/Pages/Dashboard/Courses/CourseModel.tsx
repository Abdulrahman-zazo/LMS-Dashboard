import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Course } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageCropper from "@/components/ImageUploaderWithCrop";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (course: Partial<Course>) => void;
  initialData?: Partial<Course>;
}

export function CourseDialog({ open, onClose, onSubmit, initialData }: Props) {
  const [formData, setFormData] = useState<Partial<Course>>(initialData || {});
  const { t } = useTranslation("translation");
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>(
    initialData?.image
  );
  const [showCropper, setShowCropper] = useState(false);
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
    if (name === "description" && value.length > 250) return;
    if (name === "summary" && value.length > 200) return;
    if (name === "contents" && value.length > 200) return;
    if (name === "requirements" && value.length > 100) return;
    if (["hours", "cost"].includes(name) && value && !/^\d*$/.test(value))
      return;

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
        title="add and edit course"
        className="p-6 sm:rounded-2xl space-y-0 sm:max-w-3xl max-h-screen overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-primary">
            {initialData
              ? t("pages.courses.dialogs.edit")
              : t("pages.courses.dialogs.add")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs pb-4 border-b border-neutral-200">
            {t("pages.courses.dialogs.note")}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 "
        >
          <div className="space-y-2 col-span-4  sm:col-span-2">
            <Label htmlFor="name" className="text-xs">
              {t("pages.courses.dialogs.name")}
            </Label>
            <Input
              id="name"
              className="text-xs sm:text-sm"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2 col-span-2 sm:col-span-1">
            <Label htmlFor="type" className="text-xs">
              {t("pages.courses.dialogs.type")}
            </Label>
            <Select
              value={formData.type || ""}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, type: val }))
              }
              required
            >
              <SelectTrigger className="w-full text-xs sm:text-sm ">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online" className="text-xs">
                  {t("pages.courses.dialogs.online")}
                </SelectItem>
                <SelectItem value="recorded" className="text-xs">
                  {t("pages.courses.dialogs.Recorded")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 col-span-2 sm:col-span-1">
            <Label htmlFor="hours" className="text-xs">
              {t("pages.courses.dialogs.hours")}
            </Label>
            <Input
              id="hours"
              name="hours"
              className="text-xs sm:text-sm"
              value={formData.hours || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2 col-span-4 sm:col-span-2">
            <Label htmlFor="image" className="text-xs">
              {t("pages.courses.dialogs.image")}
            </Label>
            <Input
              ref={fileInputRef}
              type="file"
              className="cursor-pointer bg-neutral-200 shadow-sm  text-xs sm:text-sm"
              accept="image/*"
              onChange={handleFileChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full mt-2 rounded"
              />
            )}
            {showCropper && preview && (
              <ImageCropper
                aspect={16 / 9}
                imageSrc={preview}
                onClose={() => setShowCropper(false)}
                onCropComplete={handleCropComplete}
              />
            )}
          </div>
          <div className="space-y-3 col-span-4 sm:col-span-2">
            <div>
              <Label htmlFor="description" className="mb-2 text-xs">
                {t("pages.courses.dialogs.description")}
              </Label>
              <Textarea
                className="text-xs sm:text-sm"
                id="description"
                name="description"
                rows={4}
                style={{ resize: "none" }}
                value={formData.description || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary" className="text-xs">
                {t("pages.courses.dialogs.summary")}
              </Label>
              <Textarea
                id="summary"
                name="summary"
                className="text-xs sm:text-sm"
                rows={2}
                style={{ resize: "none" }}
                value={formData.summary || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="requirements" className="text-xs">
                {t("pages.courses.dialogs.requirements")}
              </Label>
              <Input
                className="text-xs sm:text-sm"
                id="requirements"
                name="requirements"
                value={formData.requirements || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2 col-span-4">
            <Label htmlFor="contents" className="text-xs">
              {" "}
              {t("pages.courses.dialogs.contents")}
            </Label>
            <Textarea
              id="contents"
              style={{ resize: "none" }}
              name="contents"
              className="text-xs sm:text-sm"
              rows={3}
              value={formData.contents || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end col-span-4  gap-2 pt-4 border-t">
            <Button
              type="button"
              className="text-xs sm:text-sm"
              variant="outline"
              onClick={onClose}
            >
              {t("pages.courses.dialogs.cancel")}
            </Button>
            <Button className="text-xs sm:text-sm" type="submit">
              {initialData
                ? t("pages.courses.dialogs.edit_button")
                : t("pages.courses.dialogs.add_button")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (course: Partial<Course>) => void;
  initialData?: Partial<Course>;
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
          title="Delete-course"
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          <DialogHeader>
            <DialogTitle className="text-base text-neutral-800">
              {t("pages.courses.dialogs.delete_title")}
            </DialogTitle>
            <DialogDescription className="text-sm text-neutral-600">
              {t("pages.courses.dialogs.delete_text1")}
              <span className="mx-2 underline font-semibold">
                {initialData?.name}
              </span>
              <br />
              <span className="text-xs">
                {t("pages.courses.dialogs.delete_title2")}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="text-xs sm:text-sm cursor-pointer"
            >
              {t("pages.courses.dialogs.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="text-xs sm:text-sm cursor-pointer"
            >
              {t("pages.courses.dialogs.delete_button")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
