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
import { useTranslation } from "react-i18next";

export function DataTable<
  T extends {
    id: string | number;
    name: string;
    CommentUnRead?: number;
    is_admin?: number;
  }
>({
  columns,
  noData = "لا يوجد بيانات لعرضها ",
  title = "البيانات",
  description = "",
  ImageType = "rectangle", // Image type rectangle as default to courses
  isloading = false,
  buttonAdd = "+ إضافة",
  data,
  onAdd,
  onEdit,
  onMakeAdmin,
  onDelete,
  onView,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const [filterType, setFilterType] = useState<"all" | "admin" | "users">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 5;
  const { t, i18n } = useTranslation("translation");
  const filteredData = data
    ?.filter((item) => {
      if (typeof item.is_admin !== "undefined") {
        if (filterType === "admin") return item.is_admin === 1;
        if (filterType === "users") return item.is_admin === 0;
      }
      return true;
    })
    ?.filter((item) =>
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
      <div className="flex justify-between w-full  items-center mb-2 flex-wrap gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-neutral-800">
            {title}
          </h2>
          <span className="text-xs sm:text-sm text-neutral-400">
            {description}
          </span>
        </div>
        <div className="flex  items-center justify-between gap-2 ">
          {typeof data?.[0]?.is_admin !== "undefined" && (
            <div className="flex gap-1 ">
              <Button
                size="sm"
                variant={filterType === "all" ? "default" : "outline"}
                onClick={() => setFilterType("all")}
                className="text-xs"
              >
                {t("pages.users.all") || "الكل"}
              </Button>
              <Button
                size="sm"
                variant={filterType === "admin" ? "default" : "outline"}
                onClick={() => setFilterType("admin")}
                className="text-xs"
              >
                {t("pages.users.admins") || "المسؤولين"}
              </Button>
              <Button
                size="sm"
                variant={filterType === "users" ? "default" : "outline"}
                onClick={() => setFilterType("users")}
                className="text-xs"
              >
                {"المستخدمين"}
              </Button>
            </div>
          )}
          <Input
            type="text"
            placeholder={t("data_table.search")}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="w-full placeholder:text-neutral-300 placeholder:text-xs"
          />
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
      </div>

      <div className="overflow-auto">
        <table className=" min-w-full  text-sm">
          <thead className="text-start">
            <tr className="border-b border-neutral-100 text-center">
              {columns.map((col) =>
                col.key === "image" ? (
                  <th
                    key={col.key as string}
                    className="text-center text-xs sm:text-sm w-1/6 text-neutral-800 p-4 font-semibold"
                  >
                    {col.header}
                  </th>
                ) : (
                  <th
                    key={col.key as string}
                    className={`text-start sm:p-4 text-xs sm:text-sm text-neutral-800 font-semibold  ${
                      col.key === "summary" ||
                      col.key === "email" ||
                      col.key === "phone"
                        ? "hidden sm:table-cell"
                        : ""
                    }`}
                  >
                    {col.header}
                  </th>
                )
              )}
              {onView && (
                <th className="p-2 hidden sm:table-cell text-sm font-semibold text-neutral-800">
                  {t("data_table.details")}
                </th>
              )}
              <th className="p-2 font-semibold text-neutral-800">
                {t("data_table.Actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {isloading
              ? Array.from({ length: rowsPerPage }).map((_, i) => (
                  <tr key={i} className="border-b border-neutral-100">
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
                  <tr
                    key={row.id}
                    className={`border-b h-12 ${
                      ImageType === "rectangle" ? "lg:h-26" : "lg:h-14"
                    } border-neutral-200 hover:bg-muted/50`}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key as string}
                        className={`p-2 text-neutral-700 text-xs sm:text-sm ${
                          col.key === "summary" ||
                          col.key === "email" ||
                          col.key === "phone"
                            ? "hidden sm:table-cell"
                            : ""
                        }  ${
                          col.key === "phone" && i18n.language === "ar"
                            ? " text-right"
                            : " "
                        }`}
                        dir={col.key === "phone" ? "ltr" : ""}
                      >
                        {col.key === "image" ? (
                          <img
                            src={row[col.key] as string}
                            alt="صورة"
                            className={` ${
                              ImageType === "rectangle"
                                ? " w-32 lg:h-auto rounded-md"
                                : "w-12  h-12 rounded-full"
                            }  object-cover  mx-auto`}
                          />
                        ) : col.render ? (
                          <p className="text-sm">
                            {col.render(row[col.key], row)}
                          </p>
                        ) : (
                          (row[col.key] as React.ReactNode)
                        )}
                      </td>
                    ))}
                    {onView && (
                      <td className="p-2 hidden sm:table-cell text-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => onView(row)}
                            >
                              {row.CommentUnRead ? (
                                <div className="relative">
                                  <Eye className="w-4 h-4" />
                                  <span
                                    className={`absolute -top-2 ${
                                      i18n.language === "ar"
                                        ? "-right-2"
                                        : "-left-2"
                                    } bg-red-500 text-white text-[8px] font-light rounded-full z-20 w-4 h-4 flex items-center justify-center`}
                                  >
                                    {row?.CommentUnRead}
                                  </span>
                                </div>
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {" "}
                            {t("data_table.details")}{" "}
                          </TooltipContent>
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
                          {onView && (
                            <DropdownMenuItem
                              className="flex items-center justify-between"
                              onClick={() => onView(row)}
                            >
                              {row.CommentUnRead ? (
                                <div className="flex items-center w-full justify-between">
                                  <div className="relative">
                                    <Eye className="w-4 h-4 " />
                                    <span
                                      className={`absolute -top-2 ${
                                        i18n.language === "ar"
                                          ? "-right-2"
                                          : "-left-2"
                                      } bg-red-500 text-white text-[8px] font-light rounded-full z-20 w-4 h-4 flex items-center justify-center`}
                                    >
                                      {row?.CommentUnRead}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-xs">
                                      {t("data_table.details")}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4 " />
                                  <span className="text-xs">
                                    {t("data_table.details")}
                                  </span>
                                </>
                              )}
                            </DropdownMenuItem>
                          )}
                          {onEdit && (
                            <DropdownMenuItem
                              className="flex items-center justify-between"
                              onClick={() => onEdit(row)}
                            >
                              <Pencil className="w-4 h-4 " />
                              <span className="text-xs">
                                {t("data_table.edit")}
                              </span>
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <DropdownMenuItem
                              className="flex items-center justify-between"
                              onClick={() => onDelete(row)}
                            >
                              <Trash2 className="w-4 h-4 " />
                              <span className="text-xs">
                                {t("data_table.delete")}
                              </span>
                            </DropdownMenuItem>
                          )}
                          {onMakeAdmin && (
                            <DropdownMenuItem
                              className="flex items-center justify-between"
                              onClick={() => onMakeAdmin(row)}
                            >
                              <ShieldAlert className="w-4 h-4 " />
                              <span className="text-xs">
                                {t("data_table.makeAdmin")}
                              </span>
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
      {paginatedData?.length === 0 && (
        <div className="flex items-center justify-center h-80">
          <p className="text-xs   sm:text-sm text-neutral-400 text-center">
            {noData}
          </p>
        </div>
      )}
      {/* Pagination Controls */}
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
