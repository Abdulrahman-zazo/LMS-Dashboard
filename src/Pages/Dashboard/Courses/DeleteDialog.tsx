// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import type { Course } from "@/types";

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (course: Partial<Course>) => void;
//   initialData?: Partial<Course>;
// }

// export const DeleteDialog = ({
//   open,
//   onClose,
//   onSubmit,
//   initialData,
// }: Props) => {
//   const handleDialogChange = (isOpen: boolean) => {
//     if (!isOpen) {
//       onClose();
//     }
//   };

//   const handleDelete = () => {
//     if (initialData) {
//       onSubmit(initialData);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={handleDialogChange}>
//       <DialogContent title="Delete-course">
//         <DialogHeader>
//           <DialogTitle>تأكيد حذف الكورس</DialogTitle>
//           <DialogDescription>
//             هل أنت متأكد أنك تريد حذف الكورس{" "}
//             <strong>{initialData?.name}</strong>؟<br />
//             هذا الإجراء لا يمكن التراجع عنه وسيؤدي إلى إزالة جميع بيانات الكورس
//             من النظام.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="flex justify-end gap-2 pt-4">
//           <Button variant="outline" onClick={onClose}>
//             إلغاء
//           </Button>
//           <Button variant="destructive" onClick={handleDelete}>
//             حذف الكورس
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };
