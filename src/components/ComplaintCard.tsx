import { Mail, Phone, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Complaint } from "@/types";
import { useTranslation } from "react-i18next";

export default function ComplaintDetailPanel({
  complaint,
  onClose,
  onDelete,
}: {
  complaint: Complaint;
  onDelete: (complaintId: number) => void;
  onClose: () => void;
}) {
  const { t } = useTranslation("translation");
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30 " onClick={onClose} />
      <aside
        className={cn(
          "w-full sm:w-[400px] bg-white h-full shadow-2xl border-l border-neutral-200 flex flex-col transition-transform duration-300 ease-in-out animate-slideInRight"
        )}
      >
        <div className="p-6 border-b flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-neutral-800">
              {complaint.name}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(complaint.time).toLocaleString()}
            </p>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-neutral-500 hover:text-neutral-800" />
          </button>
        </div>

        <div className="p-6 space-y-5 flex-1 overflow-y-auto">
          <p className="text-neutral-800 text-xs sm:text-sm  my-2 ">
            {t("complaints.title2")}
          </p>

          <div className="rounded-lg  border p-4 text-neutral-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
            {complaint.text}
          </div>

          <div className="space-y-2 text-xs sm:text-sm ">
            <div className="flex items-center gap-2 text-neutral-600">
              <Phone className="w-4 h-4 text-primary" />
              <span>{complaint.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-600">
              <Mail className="w-4 h-4 text-primary" />
              <span>{complaint.email}</span>
            </div>
          </div>
        </div>

        <div className="p-6 border-t space-y-6 ">
          <a
            href={`mailto:${complaint.email}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button className="w-full gap-2 text-xs sm:text-sm ">
              <Mail size={16} /> {t("complaints.replay")}
            </Button>
          </a>
          <Button
            variant="ghost"
            onClick={() => onDelete(complaint.id)}
            className="w-full gap-2 mt-2 text-red-500/80  text-xs sm:text-sm "
          >
            <Trash2 size={16} /> {t("complaints.delete")}
          </Button>
        </div>
      </aside>
    </div>
  );
}
