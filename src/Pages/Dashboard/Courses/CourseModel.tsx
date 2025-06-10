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

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (course: Partial<Course>) => void;
  initialData?: Partial<Course>;
}

export default function CourseDialog({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [formData, setFormData] = useState<Partial<Course>>(initialData || {});
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
        className="p-6 sm:rounded-2xl space-y-0 max-w-3xl"
        lang="ar"
        dir="rtl"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {initialData ? "تعديل الكورس" : "إضافة كورس"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pb-4 border-b border-neutral-200">
            يرجى تعبئة جميع الحقول الخاصة بالكورس.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          <div className="space-y-2 col-span-2">
            <Label htmlFor="name">الاسم</Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2 col-span-1">
            <Label htmlFor="type">نوع الكورس</Label>
            <Select
              value={formData.type || ""}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, type: val }))
              }
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر نوع الكورس" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">أونلاين</SelectItem>
                <SelectItem value="Recorded">مسجل</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 col-span-1">
            <Label htmlFor="hours">عدد الساعات</Label>
            <Input
              id="hours"
              name="hours"
              value={formData.hours || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="image">الصورة</Label>
            <Input
              ref={fileInputRef}
              type="file"
              className="cursor-pointer bg-neutral-200 shadow-sm"
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
                imageSrc={preview}
                onClose={() => setShowCropper(false)}
                onCropComplete={handleCropComplete}
              />
            )}
          </div>
          <div className="space-y-3 col-span-2">
            <div>
              <Label htmlFor="description" className="mb-2">
                الوصف
              </Label>
              <Textarea
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
              <Label htmlFor="summary">الملخص</Label>
              <Textarea
                id="summary"
                name="summary"
                rows={2}
                style={{ resize: "none" }}
                value={formData.summary || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="requirements">المتطلبات</Label>
              <Input
                id="requirements"
                name="requirements"
                value={formData.requirements || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2 col-span-4">
            <Label htmlFor="contents">المحتوى</Label>
            <Textarea
              id="contents"
              name="contents"
              rows={3}
              value={formData.contents || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end col-span-4 gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit">{initialData ? "تحديث" : "إضافة"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
