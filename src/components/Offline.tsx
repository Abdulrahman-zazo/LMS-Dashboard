import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";

const OfflineAlert = () => {
  const isOnline = navigator.onLine;
  const { t } = useTranslation("translation");

  if (isOnline) return null;

  return (
    <>
      <div className="fixed bottom-5 -right-20 transform -translate-x-1/2 bg-[#FF4D4F] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down">
        <div className="font-medium text-xs  sm:text-sm flex items-center gap-4">
          <span>
            <Info size={16} />
          </span>
          <span>{t("error.offline")}</span>
        </div>
      </div>
    </>
  );
};

export default OfflineAlert;
