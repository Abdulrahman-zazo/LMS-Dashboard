import { useState } from "react";
import {
  useDeleteComplaintsMutation,
  useGetAllComplaintsQuery,
} from "@/app/features/Complaints/ComplaintsApi";
import { cookieService } from "@/Cookies/CookiesServices";
import HandelError from "@/components/HandelError";

import type { Complaint } from "@/types";
import ComplaintDetailPanel from "@/components/ComplaintCard";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function ComplaintsWithPanel() {
  const token = cookieService.get("auth_token") || "";
  const { data, isError, isLoading } = useGetAllComplaintsQuery(token);
  const [deleteComplainats] = useDeleteComplaintsMutation();
  const [selected, setSelected] = useState<Complaint | null>(null);
  if (isLoading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-7xl mx-auto">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="relative group bg-white border border-neutral-200 rounded-md px-4 py-6 hover:shadow-xs transition-all"
          >
            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-4 w-2/5 rounded" />
              <Skeleton className="h-3 w-1/5 rounded" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-5/6 rounded" />
            </div>
          </div>
        ))}
      </div>
    );

  if (isError) return <HandelError />;

  const handleDelete = async (complaintId: number) => {
    const toastId = toast.loading("جاري حذف الدورة");
    try {
      const result = await deleteComplainats({
        complaint_id: complaintId,
        token,
      });
      if (result.data.status) {
        toast.success("تم الحذف بنجاح", { id: toastId });
        setSelected(null);
      }
    } catch (e) {
      toast.error("فشل في الحذف", { id: toastId });
      console.error(e);
    }
  };
  return (
    <>
      <div className=" m-4">
        <h1 className="text-lg font-semibold text-neutral-800 ">
          الشكاوي والاقتراحات 📩
        </h1>
        <p className="text-sm text-neutral-600 pb-4 border-b">
          اضغط لعرض تفاصيل الشكوى ويمكنك الرد عن طريق البريد الالكتروني لتحسين
          التجربة التعليمية
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-7xl mx-auto">
        {data?.Complaint.length > 0 &&
          data?.Complaint.map((c: Complaint) => (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              className="relative group bg-white border border-neutral-200 rounded-md px-4 py-6  hover:shadow-xs transition-all cursor-pointer"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-800 truncate max-w-[70%]">
                  {c.name}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {new Date(c.time).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                {c.text}
              </p>

              <span className="absolute bottom-3 left-4 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                اضغط للتفاصيل →
              </span>
            </div>
          ))}
        {selected && (
          <ComplaintDetailPanel
            complaint={selected}
            onDelete={(complaintId) => {
              handleDelete(complaintId);
            }}
            onClose={() => setSelected(null)}
          />
        )}
      </div>

      {data?.Complaint.length === 0 && (
        <div className="flex items-center justify-center ">
          <p className="text-sm text-neutral-500 font-medium p-12  mx-auto ">
            لا توجد شكاوي لعرضها
          </p>
        </div>
      )}
    </>
  );
}
