import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Curriculum, DataCardsProps } from "@/types";

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
  const rowsPerPage = 5;

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
      <div className="flex justify-between items-center mb-2 ">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <span className="text-sm text-neutral-400">{description}</span>
        </div>
        {onAdd && (
          <Button
            onClick={() => onAdd()}
            className="text-base"
            variant="default"
          >
            {buttonAdd}
          </Button>
        )}
      </div>

      <div className="overflow-auto m-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isloading
          ? Array.from({ length: rowsPerPage }).map((_, i) => (
              <div key={i} className="border-b border-neutral-200">
                <div className="p-2">
                  <Skeleton className="h-8 w-16 mx-auto" />
                </div>
              </div>
            ))
          : paginatedData?.map((row: Curriculum) => (
              <div
                key={row.id}
                className="bg-white rounded-2xl border border-neutral-200 hover:shadow-md transition-shadow p-4 flex flex-col justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={row.image}
                    alt={row.name}
                    className="h-16 w-16 rounded-full object-cover border"
                  />
                  <h3 className="text-lg font-semibold text-neutral-800">
                    {row.name}
                  </h3>
                </div>

                <div className="flex justify-between items-center mt-6">
                  {onView && (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => onView(row)}
                      className="gap-2 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      عرض التفاصيل
                    </Button>
                  )}

                  <div className="flex items-center gap-2">
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
            ))}
      </div>

      {!isloading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={prevPage}
          >
            السابق
          </Button>
          <span>
            صفحة {currentPage} من {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={nextPage}
          >
            التالي
          </Button>
        </div>
      )}
    </Card>
  );
}
