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
          <DialogTitle>تأكيد حذف Stage</DialogTitle>
          <DialogDescription>
            هل أنت متأكد أنك تريد حذف Stage <strong>{initialData?.name}</strong>
            ؟<br />
            هذا الإجراء لا يمكن التراجع عنه وسيؤدي إلى إزالة جميع بيانات Stage
            من النظام.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            حذف Stage
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function StageDialog({ open, onClose, onSubmit, initialData }: Props) {
  const [formData, setFormData] = useState<Partial<Stage>>({});
  useEffect(() => {
    setFormData({ ...initialData });
  }, [initialData]);

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
        title="add and edit Stage"
        className="p-6 sm:rounded-2xl space-y-0 max-w-3xl"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {initialData ? "تعديل Stage" : "إضافة Stage"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pb-4 border-b border-neutral-200 ">
            يرجى تعبئة جميع الحقول الخاصة Stage.
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
