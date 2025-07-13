import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Curriculum, PivotItem, Stage } from "@/types";
import ImageCropper from "@/components/ImageUploaderWithCrop";
import { useGetAllStagesQuery } from "@/app/features/Curriculum/Stage/StageApi";
import { cookieService } from "@/Cookies/CookiesServices";
import { MultiSelect } from "@/components/MultiSelect";
import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (Curriculum: Partial<Curriculum>) => void;
  initialData?: Partial<Curriculum>;
}

export default function CurriculumDialog({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [formData, setFormData] = useState<Partial<Curriculum>>({
    ...initialData,
    stage_id: initialData?.stage_id ?? [],
  });
  const { t } = useTranslation("translation");

  useEffect(() => {
    if (initialData?.pivot) {
      const ids =
        initialData?.pivot.map((p: PivotItem) => p.stage?.id).filter(Boolean) ??
        [];
      setFormData({
        ...initialData,
        stage_id: ids,
      });
    }
  }, [initialData]);
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>(
    initialData?.image
  );
  const [showCropper, setShowCropper] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const token = cookieService.get("auth_token") || "";
  const { data: Stages } = useGetAllStagesQuery(token as string);

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
        title={initialData ? " edit Curriculum" : "add Curriculum"}
        className="p-6 sm:rounded-2xl space-y-0 max-w-3xl"
        lang="ar"
      >
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-primary">
            {initialData
              ? t("pages.curriculums.dialogs.edit")
              : t("pages.curriculums.dialogs.add")}
          </DialogTitle>
          <DialogDescription className="text-neutral-400 pb-4 text-xs border-b border-neutral-200 ">
            {t("pages.curriculums.dialogs.note")}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="space-y-2 col-span-2 ">
            <Label htmlFor="name" className="text-xs sm:text-sm">
              {initialData?.name ? (
                <div className="flex items-center gap-2">
                  <span>
                    <Info
                      className="text-xs sm:text-sm text-neutral-400 my-2 font-light"
                      size={14}
                    />
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-400 my-2 font-light">
                    {t("pages.curriculums.dialogs.error")}
                  </span>
                </div>
              ) : (
                <span>{t("pages.curriculums.dialogs.name")}</span>
              )}
            </Label>

            <Input
              id="name"
              className="text-xs sm:text-sm"
              name="name"
              disabled={initialData?.name ? true : false}
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="name" className="my-2 text-xs sm:text-sm">
              {t("pages.curriculums.dialogs.stages")}
            </Label>
            <MultiSelect
              options={
                Stages?.stages.map((s: Stage) => ({
                  label: s.name,
                  value: s.id,
                })) || []
              }
              selected={formData.stage_id || []}
              onChange={(selected) =>
                setFormData((prev) => ({ ...prev, stage_id: selected }))
              }
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="image" className="my-2 text-xs sm:text-sm">
              {t("pages.curriculums.dialogs.image")}
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
                  aspect={1 / 1}
                  imageSrc={preview}
                  onClose={() => setShowCropper(false)}
                  onCropComplete={handleCropComplete}
                />
              </div>
            )}
          </div>

          <div className="flex justify-start  gap-2 pt-4 border-t">
            <Button
              type="button"
              className="text-xs sm:text-sm"
              variant="outline"
              onClick={onClose}
            >
              {t("pages.curriculums.dialogs.cancel")}
            </Button>
            <Button className="text-xs sm:text-sm" type="submit">
              {initialData
                ? t("pages.curriculums.dialogs.edit_button")
                : t("pages.curriculums.dialogs.add_button")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
