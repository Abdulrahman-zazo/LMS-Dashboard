import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Users } from "@/types";

interface Props {
  open: boolean;
  type?: "Delete" | "Admin";
  onClose: () => void;
  onSubmit: (user: Partial<Users>) => void;
  initialData?: Partial<Users>;
}

const DeleteDialog = ({
  open,
  onClose,
  onSubmit,
  initialData,
  type = "Delete",
}: Props) => {
  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  const handleAction = () => {
    if (initialData) {
      onSubmit(initialData);
    }
  };

  const isDelete = type === "Delete";

  const titleText = isDelete
    ? "تأكيد حذف الكورس"
    : "تأكيد تعيين المستخدم كأدمن";

  const descriptionText = isDelete
    ? `هل أنت متأكد أنك تريد حذف الكورس "${initialData?.name}"؟ هذا الإجراء لا يمكن التراجع عنه.`
    : `هل تريد تعيين المستخدم "${initialData?.name}" كأدمن؟ سيتمكن من الوصول إلى جميع صلاحيات النظام.`;

  const confirmButtonText = isDelete ? "حذف الكورس" : "تعيين كأدمن";
  const confirmButtonVariant = isDelete ? "destructive" : "secondary";

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent title={type === "Delete" ? "Delete-course" : "Make-admin"}>
        <DialogHeader>
          <DialogTitle>{titleText}</DialogTitle>
          <DialogDescription>{descriptionText}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button variant={confirmButtonVariant} onClick={handleAction}>
            {confirmButtonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
