import { useState } from "react";

import { cookieService } from "../Cookies/CookiesServices";
import {
  useChangeImageMutation,
  useChangeMypasswordMutation,
} from "@/app/features/Admins/userApi";
import { toast } from "sonner";
import { Lock, User2, X } from "lucide-react";

interface Isetting {
  isOpen: boolean;
  onClose: () => void;
  ImageUser: string;
}

const SettingsModal = ({ isOpen, ImageUser, onClose }: Isetting) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const token = cookieService.get("auth_token") || "";

  const [ChangeImage, { isLoading }] = useChangeImageMutation();
  const [changeMypassword, { isLoading: isloadingMypassword }] =
    useChangeMypasswordMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const submitImage = async () => {
    if (!profileImage) return alert("يرجى اختيار صورة");
    const formData = new FormData();
    formData.append("image", profileImage);
    const toastId = toast.loading("جاري تغيير الصورة الشخصية ..");
    console.log(formData);

    try {
      const result = await ChangeImage({ token, image: profileImage }).unwrap();

      if (result.status === true) {
        toast.success("تم تغيير الصورة بنجاح ", {
          id: toastId,
        });
        setProfileImage(null);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("حدث خطأ أثناء تغير الصورة الشخصية", {
        id: toastId,
      });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    const toastId = toast.loading("جاري تغيير كلمة المرور ..");

    e.preventDefault();
    try {
      const result = await changeMypassword({
        email,
        password: oldPassword,
        newpassword: newPassword,
        token,
      }).unwrap();

      if (result.status === true) {
        toast.success("تم تغيير كلمة المرور بنجاح ", {
          id: toastId,
        });

        setEmail("");
        setOldPassword("");
        setNewPassword("");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      const error = err as { data?: { msg?: string } };

      toast.error(error.data?.msg || "حدث خطأ أثناء تغير كلمة المرور");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-600/40 backdrop-blur-xs bg-opacity-10 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl mx-auto rounded-lg shadow-lg relative p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-700"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center px-4 py-2 text-xs sm:text-sm font-medium ${
              activeTab === "profile"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <User2 className="w-5 h-5 mr-2" size={12} />
            الصورة الشخصية
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`flex items-center px-4 py-2 text-xs sm:text-sm font-medium ${
              activeTab === "password"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Lock className="w-5 h-5 mr-2" size={12} />
            تغيير كلمة المرور
          </button>
        </div>

        {/* Content */}
        {activeTab === "profile" && (
          <div className="flex flex-col items-center my-6">
            <div className="mb-4">
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="preview"
                  className="w-32 h-32 rounded-full object-cover border-2 border-primary"
                />
              ) : (
                <img
                  src={ImageUser}
                  alt="الصورة الشخصية"
                  className="w-32 h-32 rounded-full object-cover border-2 border-primary"
                />
              )}
            </div>
            <label className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 mb-3">
              تحميل صورة جديدة
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <button
              onClick={submitImage}
              disabled={isLoading}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80"
            >
              {isLoading ? "جاري الرفع..." : "تأكيد التغيير"}
            </button>
          </div>
        )}

        {activeTab === "password" && (
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                بريدك الإلكتروني
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                كلمة المرور الحالية
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                كلمة المرور الجديدة
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isloadingMypassword}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80"
            >
              {isloadingMypassword ? "جاري التحديث..." : "تحديث كلمة المرور"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SettingsModal;
