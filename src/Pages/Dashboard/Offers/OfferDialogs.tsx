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
import { Info } from "lucide-react";
import { useState } from "react";

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

  const token = cookieService.get("auth_token") || "";
  const { data: Courses } = useGetAllCoursesQuery(token as string);
  console.log(Courses);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "name" && value.length > 100) return;
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
        title="add and edit Curriculum"
        className="p-6 sm:rounded-2xl space-y-0 max-w-3xl"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {initialData ? "تعديل Curriculum" : "إضافة Curriculum"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pb-4 border-b border-neutral-200 ">
            يرجى تعبئة جميع الحقول الخاصة Curriculum.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="space-y-2 col-span-2 ">
            <Label htmlFor="name">
              {initialData?.name ? (
                <div className="flex items-center gap-2">
                  <span>
                    <Info
                      className="text-sm text-neutral-400 my-2 font-light"
                      size={14}
                    />
                  </span>
                  <span className="text-sm text-neutral-400 my-2 font-light">
                    لا تستطيع تعديل اسم المنهاج وإنما فقط الصورة والمراحل ويمكن
                    أيضاً حذفه نهائياً
                  </span>
                </div>
              ) : (
                <span>الاسم</span>
              )}
            </Label>

            <Input
              id="name"
              name="name"
              disabled={initialData?.name ? true : false}
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="name" className="my-2">
              المراحل
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
