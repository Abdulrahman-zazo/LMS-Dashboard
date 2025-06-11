import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAllOfferQuery } from "@/app/features/Offer/OfferApi";
import { cookieService } from "@/Cookies/CookiesServices";
import HandelError from "@/components/HandelError";
import CourseCard from "@/components/courseCard";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { Offers } from "@/types";
import OffersDialog, { DeleteDialog } from "./OfferDialogs";
import { useOfferActions } from "./Hooks/useOfferActions";

const OffersPage = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const token = cookieService.get("auth_token") || "";
  const toggle = (index: number) => {
    setOpenIndex(index === openIndex ? 0 : index);
  };
  const { t } = useTranslation("translation");
  const { data, isLoading, isError } = useGetAllOfferQuery(token as string);
  const { handleAdd, handleUpdate, handleDelete } = useOfferActions(token);

  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentOffers, setCurrentOffers] =
    useState<Partial<Offers | undefined>>();

  const onAddClick = () => {
    setCurrentOffers(undefined);
    setIsEdit(false);
    setOpen(true);
  };

  const onEditClick = (Offers: Offers) => {
    console.log(Offers);
    setCurrentOffers(Offers);
    setIsEdit(true);
    setOpen(true);
  };

  const onDeleteClick = (Offers: Offers) => {
    setCurrentOffers(Offers);
    setOpenDeleteDialog(true);
  };
  if (isLoading) {
    return <h2>loading ...</h2>;
  }
  if (isError) {
    return <HandelError />;
  }

  return (
    <div className=" rounded-2xl">
      <section>
        <div className="max-w-[100%] sm:max-w-[100%]  mx-auto px-4 sm:px-6 py-4">
          <div className="pb-6 border-b mb-4 flex items-center justify-between">
            <div className="">
              <h2 className="text-xl sm:text-2xl text-neutral-800 font-semibold mb-2 ">
                العروض المتوفرة 🎉
              </h2>
              <p className="text-neutral-500 text-sm">
                يمكنك إضافة عروض واختيار الدورات ضمن هذا العرض
              </p>
            </div>
            <Button
              variant={"default"}
              title="offer button"
              onClick={onAddClick}
              className="cursor-pointer"
            >
              إضافة عرض جديد <Plus />
            </Button>
          </div>

          <div className="space-y-4 w-full  ">
            {data?.Offers.length > 0 ? (
              data?.Offers.map((offer: Offers, index: number) => (
                <div
                  key={offer.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border  hover:border-paragraph/50  "
                >
                  <div
                    onClick={() => toggle(offer.id)}
                    className="w-full  flex justify-between items-center px-4 py-4 text-sm sm:text-base font-medium cursor-pointer text-neutral-800 hover:bg-bg-purple transition"
                  >
                    <div className="">
                      <h3 className="text-base sm:text-lg font-semibold my-2">
                        {offer.name}
                      </h3>
                      <p className="text-sm sm:text-base">
                        {offer.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        variant={"ghost"}
                        title="offer button"
                        className="cursor-pointer"
                        onClick={() => onEditClick(offer)}
                      >
                        <Edit2 />
                      </Button>
                      <Button
                        variant={"ghost"}
                        title="offer button"
                        onClick={() => onDeleteClick(offer)}
                        className="hover:bg-red-100/20 cursor-pointer"
                      >
                        <Trash2 className="text-red-500/80" />
                      </Button>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        {offer?.courses?.length > 0 && (
                          <div className="px-4 pb-4 text-sm sm:text-base text-paragraph leading-relaxed">
                            <p className="mx-2 my-4 text-paragraph/80 text-sm sm:text-base">
                              {t("offer.lable")}
                            </p>
                            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4 sm:mb-8">
                              {offer?.courses?.map((course) => (
                                <div
                                  key={course.id}
                                  className=" mt-4 sm:mt-8 border border-neutral-300 rounded-xl"
                                >
                                  <CourseCard
                                    summary={course.summary}
                                    description={course.description}
                                    id={course.id}
                                    image={course.image}
                                    title={course.name}
                                    key={course.id}
                                    link="/offer/courses"
                                    btnType="link"
                                  />
                                </div>
                              ))}
                            </div>
                            <button
                              title="offer button"
                              className="text-white inline  w-full sm:hidden bg-primary px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300 text-[10px]  text-sm sm:text-base"
                            >
                              {t("offer.button")}
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <div>
                <p className="text-sm  sm:text-base text-neutral-500 text-center">
                  {t("offer.NoOffer")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <OffersDialog
        key={isEdit ? currentOffers?.id : "add-Offers"}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={isEdit ? handleUpdate : handleAdd}
        initialData={currentOffers}
      />

      <DeleteDialog
        key="delete-Curriculum"
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onSubmit={() => {
          if (currentOffers?.id) handleDelete(currentOffers.id);
          setOpenDeleteDialog(false);
        }}
        initialData={currentOffers}
      />
    </div>
  );
};

export default OffersPage;
