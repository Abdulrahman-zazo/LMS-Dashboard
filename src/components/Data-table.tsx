import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Eye, MoreVertical, Pencil, ShieldAlert, Trash2 } from "lucide-react";
import type { DataTableProps } from "@/types";
import { Input } from "./ui/input";

export function DataTable<T extends { id: string | number; name: string }>({
  columns,
  title = "البيانات",
  description = "",
  ImageType = "rectangle", // Image type rectangle as default to courses
  isloading = false,
  buttonAdd = "إضافة",
  data,
  onAdd,
  onEdit,
  onMakeAdmin,
  onDelete,
  onView,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 6;

  const filteredData = data?.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil((filteredData?.length || 0) / rowsPerPage);
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <span className="text-sm text-neutral-400">{description}</span>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder={`  بحث عن الاسم... 🔎`}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="w-48"
          />
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
      </div>

      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="text-start">
            <tr className="border-b text-center">
              {columns.map((col) =>
                col.key === "image" ? (
                  <th
                    key={col.key as string}
                    className="text-center w-1/6 p-4 font-semibold"
                  >
                    {col.header}
                  </th>
                ) : (
                  <th
                    key={col.key as string}
                    className="text-start p-4 font-semibold"
                  >
                    {col.header}
                  </th>
                )
              )}
              {onView && <th className="p-2">تفاصيل</th>}
              <th className="p-2">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {isloading
              ? Array.from({ length: rowsPerPage }).map((_, i) => (
                  <tr key={i} className="border-b border-neutral-200">
                    {columns.map((_, j) => (
                      <td key={j} className="p-3">
                        <Skeleton className="h-10 w-full" />
                      </td>
                    ))}
                    {onView && (
                      <td className="p-2 text-center">
                        <Skeleton className="h-8 w-8 mx-auto" />
                      </td>
                    )}
                    <td className="p-2">
                      <Skeleton className="h-8 w-16 mx-auto" />
                    </td>
                  </tr>
                ))
              : paginatedData?.map((row) => (
                  <tr key={row.id} className="border-b  hover:bg-muted/50">
                    {columns.map((col) => (
                      <td key={col.key as string} className="p-2 ">
                        {col.key === "image" ? (
                          <img
                            src={row[col.key] as string}
                            alt="صورة"
                            className={` ${
                              ImageType === "rectangle"
                                ? "w-24 rounded-md"
                                : "w-12 rounded-full"
                            }  object-cover h-12  mx-auto`}
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
                    <td className="p-2 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="left">
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
                          {onMakeAdmin && (
                            <DropdownMenuItem onClick={() => onMakeAdmin(row)}>
                              <ShieldAlert className="w-4 h-4 mr-2" />
                              تعينه كمسؤول
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
