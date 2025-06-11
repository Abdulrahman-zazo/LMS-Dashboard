import {
  useAddOfferMutation,
  useDeleteOfferMutation,
  useUpdateOfferMutation,
} from "@/app/features/Offer/OfferApi";
import type { Offers } from "@/types";

import { toast } from "sonner";

export const useOfferActions = (token: string) => {
  const [addOffer] = useAddOfferMutation();
  const [updateOffer] = useUpdateOfferMutation();
  const [deleteOffer] = useDeleteOfferMutation();

  const handleAdd = async (Offers: Partial<Offers>) => {
    const toastId = toast.loading("جاري إضافة الدورة");
    try {
      const result = await addOffer({ Offers, token }).unwrap();
      if (result.status) {
        toast.success("تمت الإضافة بنجاح", { id: toastId });
      }
    } catch (e) {
      toast.error("فشل في الإضافة", { id: toastId });
      console.error(e);
    }
  };

  const handleUpdate = async (Offers: Partial<Offers>) => {
    const toastId = toast.loading("جاري تعديل الدورة");
    try {
      const result = await updateOffer({ Offers, token }).unwrap();
      if (result.status) {
        toast.success("تم التعديل بنجاح", { id: toastId });
      }
    } catch (e) {
      toast.error("فشل في التعديل", { id: toastId });
      console.error(e);
    }
  };

  const handleDelete = async (OfferId: number) => {
    const toastId = toast.loading("جاري حذف الدورة");
    try {
      const result = await deleteOffer({ offer_id: OfferId, token });
      if (result.data.status) {
        toast.success("تم الحذف بنجاح", { id: toastId });
      }
    } catch (e) {
      toast.error("فشل في الحذف", { id: toastId });
      console.error(e);
    }
  };

  return { handleAdd, handleUpdate, handleDelete };
};
