import { useGetAllCoursesQuery } from "@/app/features/Courses/CoursesApi";
import { MultiSelect } from "@/components/MultiSelect";
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
import { cookieService } from "@/Cookies/CookiesServices";
import type { Course, Offers } from "@/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (Offers: Partial<Offers>) => void;
  initialData?: Partial<Offers>;
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
          title="Delete-Offers"
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          <DialogHeader>
            <DialogTitle className="text-base text-neutral-800">
              {t("pages.offer.dialogs.delete_title")}
            </DialogTitle>
            <DialogDescription className="text-sm text-neutral-600">
              {t("pages.offer.dialogs.delete_text1")}
              <span className="mx-2 underline font-semibold">
                {initialData?.name}
              </span>
              <br />
              <span className="text-xs">
                {t("pages.offer.dialogs.delete_title2")}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="text-xs sm:text-sm cursor-pointer"
            >
              {t("pages.offer.dialogs.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="text-xs sm:text-sm cursor-pointer"
            >
              {t("pages.offer.dialogs.delete_button")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default function OffersDialog({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [formData, setFormData] = useState<Partial<Offers>>({
    ...initialData,
    course_id: initialData?.course_id ?? [],
  });
  const { t } = useTranslation("translation");

  const token = cookieService.get("auth_token") || "";
  const { data: Courses } = useGetAllCoursesQuery(token as string);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "name" && value.length > 100) return;
    if (name === "description" && value.length > 150) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...formData });
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
        title={initialData ? " edit offers" : "add offers"}
        className="p-6 sm:rounded-2xl space-y-0 sm:max-w-xl max-h-screen overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-primary">
            {initialData
              ? t("pages.offer.dialogs.edit")
              : t("pages.offer.dialogs.add")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs pb-4 border-b border-neutral-200">
            {t("pages.offer.dialogs.note")}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="space-y-2 col-span-2 ">
            <Label htmlFor="name" className="text-xs">
              {t("pages.offer.dialogs.name")}
            </Label>

            <Input
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="text-xs sm:text-sm"
              required
            />
          </div>
          <div className="space-y-2 col-span-2 ">
            <Label htmlFor="description" className="text-xs">
              {t("pages.offer.dialogs.description")}
            </Label>

            <Input
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="name" className="my-2 text-xs">
              {t("pages.offer.dialogs.courses")}
            </Label>
            <MultiSelect
              options={
                Courses?.course.map((s: Course) => ({
                  label: s.name,
                  value: s.id,
                })) || []
              }
              selected={formData.course_id || []}
              onChange={(selected) =>
                setFormData((prev) => ({ ...prev, course_id: selected }))
              }
            />
          </div>

          <div className="flex justify-end col-span-2 cols gap-2 pt-4 border-t">
            <Button
              type="button"
              className="text-xs sm:text-sm"
              variant="outline"
              onClick={onClose}
            >
              {t("pages.offer.dialogs.cancel")}
            </Button>
            <Button className="text-xs sm:text-sm" type="submit">
              {initialData
                ? t("pages.offer.dialogs.edit_button")
                : t("pages.offer.dialogs.add_button")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
