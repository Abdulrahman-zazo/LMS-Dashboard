import {
  useAddOfferMutation,
  useDeleteOfferMutation,
  useUpdateOfferMutation,
} from "@/app/features/Offer/OfferApi";
import type { Offers } from "@/types";
import { useTranslation } from "react-i18next";

import { toast } from "sonner";

export const useOfferActions = (token: string) => {
  const [addOffer] = useAddOfferMutation();
  const [updateOffer] = useUpdateOfferMutation();
  const [deleteOffer] = useDeleteOfferMutation();
  const { t } = useTranslation("translation");

  const handleAdd = async (Offers: Partial<Offers>) => {
    const toastId = toast.loading(t("pages.offer.messages.loading1"));
    try {
      const result = await addOffer({ Offers, token }).unwrap();
      if (result.status) {
        toast.success(t("pages.offer.messages.success1"), { id: toastId });
      }
    } catch (e) {
      toast.error(t("pages.offer.messages.error1"), { id: toastId });
      console.error(e);
    }
  };

  const handleUpdate = async (Offers: Partial<Offers>) => {
    const toastId = toast.loading(t("pages.offer.messages.loading2"));
    try {
      const result = await updateOffer({ Offers, token }).unwrap();
      if (result.status) {
        toast.success(t("pages.offer.messages.success2"), { id: toastId });
      }
    } catch (e) {
      toast.error(t("pages.offer.messages.error2"), { id: toastId });
      console.error(e);
    }
  };

  const handleDelete = async (OfferId: number) => {
    const toastId = toast.loading(t("pages.offer.messages.loading3"));
    try {
      const result = await deleteOffer({ offer_id: OfferId, token });
      if (result.data.status) {
        toast.success(t("pages.offer.messages.success3"), { id: toastId });
      }
    } catch (e) {
      toast.error(t("pages.offer.messages.error3"), { id: toastId });
      console.error(e);
    }
  };

  return { handleAdd, handleUpdate, handleDelete };
};
