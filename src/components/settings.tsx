import { useState } from "react";
import { cookieService } from "../Cookies/CookiesServices";
import {
  useChangeImageMutation,
  useChangeMypasswordMutation,
} from "@/app/features/Admins/userApi";
import { toast } from "sonner";
import { Loader, Lock, User2, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Isetting {
  isOpen: boolean;
  onClose: () => void;
  ImageUser: string;
}

const SettingsModal = ({ isOpen, ImageUser, onClose }: Isetting) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { t } = useTranslation("translation");
  const Contact = [
    {
      facebook_url: "https://Facebook/yourpageee",
      instagram_url: "https://Instagram/yourpage",
      whatsapp_num: "0946409036",
      telegram_url: "https://telegram/yourchannel",
      youtube_url: "https://youtube/yourchannel",
    },
  ];
  const token = cookieService.get("auth_token") || "";

  const [ChangeImage, { isLoading }] = useChangeImageMutation();
  const [changeMypassword, { isLoading: isloadingMypassword }] =
    useChangeMypasswordMutation();

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        toast.error("الرجاء اختيار صورة بصيغة: JPEG, PNG, JPG, أو GIF.");
        return;
      }
      setProfileImage(file);
    }
  };
  const submitImage = async () => {
    if (!profileImage) return toast.error(t("settings.messages.error"));
    const toastId = toast.loading(t("settings.messages.loading1"));

    try {
      const result = await ChangeImage({ token, image: profileImage }).unwrap();
      console.log(result);
      if (result.status) {
        toast.success(t("settings.messages.success1"), {
          id: toastId,
        });
        onClose();
        setProfileImage(null);
      } else {
        toast(result.msg, {
          id: toastId,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(t("settings.messages.error1"), {
        id: toastId,
      });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading(t("settings.messages.loading2"));

    try {
      const result = await changeMypassword({
        password: oldPassword,
        newpassword: newPassword,
        token,
      }).unwrap();
      console.log(result);
      if (result?.status === true) {
        toast.success(t("settings.messages.success2"), { id: toastId });
        setOldPassword("");
        setNewPassword("");
      } else {
        toast.error(result.msg, { id: toastId });
      }
    } catch (err) {
      const error = err as { data: { error: string } };
      toast.error(error?.data.error, { id: toastId });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white w-[100%] max-w-2xl rounded-xl shadow-2xl relative p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6 border-b pb-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition text-sm ${
              activeTab === "profile"
                ? "bg-primary/10  text-primary "
                : "text-gray-500 hover:text-primary"
            }`}
          >
            <User2 size={16} />
            {t("settings.image")}
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition text-sm ${
              activeTab === "password"
                ? "bg-primary/10 text-primary "
                : "text-gray-500 hover:text-primary"
            }`}
          >
            <Lock size={16} />
            {t("settings.change")}
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition text-sm ${
              activeTab === "contacts"
                ? "bg-primary/10 text-primary "
                : "text-gray-500 hover:text-primary"
            }`}
          >
            <Lock size={16} />
            معلومات التواصل
          </button>
        </div>

        {activeTab === "profile" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="w-28 h-28 rounded-full overflow-hidden border border-primary">
              <img
                src={
                  profileImage ? URL.createObjectURL(profileImage) : ImageUser
                }
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <label className="cursor-pointer border border-neutral-500 text-xs sm:text-sm   text-neutral-500 px-4 py-1.5 rounded-md  transition">
              {t("settings.new_image")}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <button
              onClick={submitImage}
              disabled={!profileImage || isLoading}
              className={`bg-primary text-white text-xs sm:text-sm px-4 py-1.5 rounded-md transition
    ${
      !profileImage || isLoading
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-primary/80 cursor-pointer"
    }`}
            >
              {isLoading ? (
                <div className="px-4 animate-spin animate-duration-1500 ">
                  <Loader />
                </div>
              ) : (
                t("settings.save")
              )}
            </button>
          </div>
        )}

        {activeTab === "password" && (
          <form onSubmit={handlePasswordChange} className="space-y-4 mt-2">
            <div>
              <label className="text-xs sm:text-sm block mb-1">
                {t("settings.old_password")}
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm block mb-1">
                {t("settings.new_password")}
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isloadingMypassword || !newPassword || !oldPassword}
              className={`  ${
                isloadingMypassword || !newPassword || !oldPassword
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-primary/80"
              } bg-primary text-white text-xs sm:text-sm px-4 py-1.5 rounded-md transition mx-auto text-center w-full`}
            >
              {isloadingMypassword ? (
                <div className="px-4 animate-spin animate-duration-1500 ">
                  <Loader className="mx-auto" />
                </div>
              ) : (
                t("settings.update")
              )}
            </button>
          </form>
        )}
        {activeTab === "contacts" && (
          <form onSubmit={handlePasswordChange} className="space-y-4 mt-2">
            <div>
              <label className=" text-xs sm:text-sm block mb-1">فيسبوك</label>
              <input
                type="text"
                value={Contact[0]?.facebook_url}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm block mb-1">انستاغرام</label>
              <input
                type="text"
                value={Contact[0]?.instagram_url}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm block mb-1">تيليغرام</label>
              <input
                type="text"
                value={Contact[0]?.telegram_url}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm block mb-1">واتساب</label>
              <input
                type="text"
                value={Contact[0]?.whatsapp_num}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm block mb-1">يوتيوب</label>
              <input
                type="text"
                value={Contact[0]?.youtube_url}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              disabled={isloadingMypassword}
              className="bg-primary text-white text-xs sm:text-sm px-4 py-2 mt-1 rounded-md hover:bg-primary/80 transition w-full"
            >
              تحديث معلومات التواصل
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SettingsModal;
