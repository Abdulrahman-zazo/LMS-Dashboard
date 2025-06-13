import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Curriculum, DataCardsProps } from "@/types";
import { useTranslation } from "react-i18next";

export function CurriculumCards({
  title = "البيانات",
  description = "",
  isloading = false,
  buttonAdd = "إضافة",
  data,
  onAdd,
  onEdit,
  onDelete,
  onView,
}: DataCardsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;
  const { t } = useTranslation("translation");

  const totalPages = Math.ceil((data?.length || 0) / rowsPerPage);
  const paginatedData = data?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // 1- it's deffirent data table (image style and handling data)
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-2  ">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-neutral-800">
            {title}
          </h2>
          <span className="text-xs sm:text-sm text-neutral-400">
            {description}
          </span>
        </div>
        {onAdd && (
          <Button
            onClick={() => onAdd()}
            className="text-xs sm:text-sm"
            variant="default"
          >
            {buttonAdd}
          </Button>
        )}
      </div>

      <div className="overflow-auto m-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3  gap-2 sm:gap-6">
        {isloading
          ? Array.from({ length: rowsPerPage }).map((_, i) => (
              <div
                key={i}
                className="border-b animate-pulse border-neutral-200"
              >
                <div className="p-2">
                  <Skeleton className="h-36 w-full mx-auto" />
                </div>
              </div>
            ))
          : paginatedData?.map((row: Curriculum) => {
              return (
                <div
                  key={row.id}
                  className="bg-white rounded-2xl border border-neutral-200 hover:shadow-md transition-shadow p-4 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 sm:gap-4">
                    <img
                      src={row.image}
                      alt={row.name}
                      className="w-10 h-10 sm:h-16 sm:w-16 rounded-full object-cover border"
                    />
                    <div className=" gap-2 sm:gap-4">
                      <h3 className="text-xs sm:text-sm font-semibold text-neutral-800">
                        {row.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    {onView && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => onView(row)}
                        className="text-xs sm:text-sm gap-2 cursor-pointer"
                      >
                        <Eye className="w-4 h-4 hidden sm:inline" />
                        {t("data_table.details")}
                      </Button>
                    )}

                    <div className="flex items-center gap-1">
                      {onEdit && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onEdit(row)}
                        >
                          <Pencil className="w-4 h-4 text-neutral-700" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="hover:bg-red-500/10"
                          onClick={() => onDelete(row)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500/80 " />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      {!isloading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4 text-xs">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            disabled={currentPage === 1}
            onClick={prevPage}
          >
            {t("data_table.prev")}
          </Button>
          <span>
            {t("data_table.page")} {currentPage} {t("data_table.of")}{" "}
            {totalPages}
          </span>
          <Button
            className="text-xs"
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={nextPage}
          >
            {t("data_table.next")}
          </Button>
        </div>
      )}
    </Card>
  );
}
