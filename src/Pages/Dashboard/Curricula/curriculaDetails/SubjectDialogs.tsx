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
      <DialogContent title="Delete-Curriculum">
        <DialogHeader>
          <DialogTitle>تأكيد حذف subject</DialogTitle>
          <DialogDescription>
            هل أنت متأكد أنك تريد حذف subject{" "}
            <strong>{initialData?.name}</strong>؟<br />
            هذا الإجراء لا يمكن التراجع عنه وسيؤدي إلى إزالة جميع بيانات subject
            من النظام.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            حذف subject
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function SubjectDialog({ open, onClose, onSubmit, initialData }: Props) {
  const [formData, setFormData] = useState<Partial<Subject>>({});
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>(
    initialData?.image
  );
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
        title="add and edit subject"
        className="p-6 sm:rounded-2xl space-y-0 max-w-3xl"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {initialData ? "تعديل subject" : "إضافة subject"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pb-4 border-b border-neutral-200 ">
            يرجى تعبئة جميع الحقول الخاصة subject.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="space-y-2 col-span-2 ">
            <Label htmlFor="name">الاسم</Label>
            <Input
              id="name"
              name="name"
              disabled={initialData?.name ? true : false}
              value={formData.name || ""}
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

          <div className="flex justify-end col-span-2 cols gap-2 pt-4 border-t">
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
