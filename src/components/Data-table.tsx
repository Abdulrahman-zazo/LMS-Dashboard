import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import type { DataTableProps } from "@/types";

export function DataTable<T extends { id: string | number }>({
  columns,
  title = "البيانات",
  description = "",
  buttonAdd = "إضافة",
  data,
  onAdd,
  onEdit,
  onDelete,
  onView,
}: DataTableProps<T>) {
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

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-2 ">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <span className="text-sm text-neutral-400">{description}</span>
        </div>
        {onAdd && (
          <Button onClick={onAdd} className="text-base" variant="default">
            {buttonAdd}
          </Button>
        )}
      </div>

      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  className="text-center p-4 font-semibold"
                >
                  {col.header}
                </th>
              ))}
              {onView && <th className="p-2">تفاصيل</th>}
              <th className="p-2">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((row) => (
              <tr key={row.id} className="border-b hover:bg-muted/50">
                {columns.map((col) => (
                  <td key={col.key as string} className="p-2">
                    {col.key === "image" ? (
                      <img
                        src={row[col.key] as string}
                        alt="صورة"
                        className="w-20 object-cover h-12 rounded"
                      />
                    ) : col.render ? (
                      col.render(row[col.key], row)
                    ) : (
                      (row[col.key] as React.ReactNode)
                    )}
                  </td>
                ))}
                {onView && (
                  <td className="p-2 text-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onView(row)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>تفاصيل الكورس</TooltipContent>
                    </Tooltip>
                  </td>
                )}
                <td className="p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {onEdit && (
                        <DropdownMenuItem onClick={() => onEdit(row)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          تعديل
                        </DropdownMenuItem>
                      )}
                      {onDelete && (
                        <DropdownMenuItem onClick={() => onDelete(row)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          حذف
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
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
