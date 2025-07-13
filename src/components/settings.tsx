import { useEffect, useState } from "react";
import { cookieService } from "../Cookies/CookiesServices";
import {
  useChangeImageMutation,
  useChangeMypasswordMutation,
} from "@/app/features/Admins/userApi";
import toast from "react-hot-toast";
import {
  Facebook,
  Instagram,
  Loader,
  Lock,
  Phone,
  Send,
  User2,
  X,
  Youtube,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  useGetAllContactsQuery,
  useUpdateContactsMutation,
} from "@/app/features/Contacts/ContactsApi";

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
  const token = cookieService.get("auth_token") || "";
  const [isEditing, setIsEditing] = useState(false);
  const [contactForm, setContactForm] = useState({
    facebook_url: "",
    instagram_url: "",
    telegram_url: "",
    whatsapp_num: "",
    youtube_url: "",
    tiktok_url: "",
    twitter_url: "",
  });

  const { t } = useTranslation("translation");

  const { data, isLoading: isLoadingContacts } = useGetAllContactsQuery(
    token as string
  );

  const [updateContacts] = useUpdateContactsMutation();

  useEffect(() => {
    if (data && data.Contact && data.Contact.length > 0) {
      const contact = data.Contact[0];
      setContactForm({
        facebook_url: contact.facebook_url || "",
        instagram_url: contact.instagram_url || "",
        telegram_url: contact.telegram_url || "",
        whatsapp_num: contact.whatsapp_num || "",
        youtube_url: contact.youtube_url || "",
        twitter_url: contact.twitter_url || "",
        tiktok_url: contact.tiktok_url || "",
      });
    }
  }, [data]);
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
  const handleEditContacts = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // نفترض إن عندك API بتستقبل البيانات الجديدة:
      const result = await updateContacts({
        Contacts: { ...contactForm },
        token,
      }).unwrap();

      if (result.status) {
        toast.success(result.message);
        setIsEditing(false);
      } else {
        toast.error("حدث خطأ أثناء التحديث");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء التحديث");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-2xl rounded-xl shadow-2xl relative p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Tabs */}
        <div className="flex justify-center gap-2 sm:gap-4 my-6 border-b pb-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-2 py-1 sm:px-4 sm:py-2 rounded-full transition text-xs sm:text-sm ${
              activeTab === "profile"
                ? "bg-primary/10  text-primary "
                : "text-gray-500 hover:text-primary"
            }`}
          >
            <User2 size={16} className="hidden sm:inline" />
            {t("settings.image")}
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`flex items-center gap-2 px-2 py-1 sm:px-4 sm:py-2 rounded-full transition text-xs sm:text-sm ${
              activeTab === "password"
                ? "bg-primary/10 text-primary "
                : "text-gray-500 hover:text-primary"
            }`}
          >
            <Lock size={16} className="hidden sm:inline" />
            {t("settings.change")}
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`flex items-center gap-2 px-2 py-1 sm:px-4 sm:py-2 rounded-full transition text-xs sm:text-sm ${
              activeTab === "contacts"
                ? "bg-primary/10 text-primary "
                : "text-gray-500 hover:text-primary"
            }`}
          >
            <Lock size={16} className="hidden sm:inline" />
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
        {activeTab === "contacts" &&
          (isLoadingContacts ? (
            <div>
              <div className="h-10 rounded-md w-full bg-neutral-200 animate-pulse my-6" />
              <div className="h-10 rounded-md w-full bg-neutral-200 animate-pulse my-6" />
              <div className="h-10 rounded-md w-full bg-neutral-200 animate-pulse my-6" />
              <div className="h-10 rounded-md w-full bg-neutral-200 animate-pulse my-6" />
              <div className="h-10 rounded-md w-full bg-neutral-200 animate-pulse my-6" />
              <div className="h-10  rounded-md w-full bg-neutral-300 animate-pulse my-6" />
            </div>
          ) : (
            <form className="space-y-4 mt-2" dir="ltr">
              <div className="relative">
                <Facebook
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  value={contactForm.facebook_url}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      facebook_url: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                  className={`w-full pl-9 pr-3 py-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    isEditing
                      ? "focus:ring-primary"
                      : "bg-neutral-50 cursor-not-allowed"
                  }`}
                />
              </div>

              <div className="relative">
                <Instagram
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />

                <input
                  type="text"
                  value={contactForm.instagram_url}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      instagram_url: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                  className={`w-full pl-9 pr-3 py-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    isEditing
                      ? "focus:ring-primary"
                      : "bg-neutral-50 cursor-not-allowed"
                  }`}
                />
              </div>

              <div className="relative">
                <Send
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />

                <input
                  type="text"
                  value={contactForm.telegram_url}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      telegram_url: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                  className={`w-full pl-9 pr-3 py-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    isEditing
                      ? "focus:ring-primary"
                      : "bg-neutral-50 cursor-not-allowed"
                  }`}
                />
              </div>

              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />

                <input
                  type="text"
                  value={contactForm.whatsapp_num}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      whatsapp_num: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                  className={`w-full pl-9 pr-3 py-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    isEditing
                      ? "focus:ring-primary"
                      : "bg-neutral-50 cursor-not-allowed"
                  }`}
                />
              </div>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  height="20"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="#aaa"
                    d="M16.656 1.029c1.637-.025 3.262-.012 4.886-.025a7.76 7.76 0 0 0 2.189 5.213l-.002-.002A8.77 8.77 0 0 0 29 8.45l.028.002v5.036a13.3 13.3 0 0 1-5.331-1.247l.082.034a15.4 15.4 0 0 1-2.077-1.196l.052.034c-.012 3.649.012 7.298-.025 10.934a9.5 9.5 0 0 1-1.707 4.954l.02-.031c-1.652 2.366-4.328 3.919-7.371 4.011h-.014a9.071 9.071 0 0 1-5.139-1.31l.04.023C5.05 28.185 3.32 25.603 3 22.6l-.004-.041a23 23 0 0 1-.012-1.862c.49-4.779 4.494-8.476 9.361-8.476q.822.001 1.604.136l-.056-.008c.025 1.849-.05 3.699-.05 5.548a4.29 4.29 0 0 0-5.465 2.619l-.009.03c-.133.427-.21.918-.21 1.426q0 .31.037.61l-.002-.024a4.26 4.26 0 0 0 4.382 3.586h-.009a4.2 4.2 0 0 0 3.451-1.994l.01-.018c.267-.372.45-.822.511-1.311l.001-.014c.125-2.237.075-4.461.087-6.698.012-5.036-.012-10.06.025-15.083z"
                  ></path>
                </svg>

                <input
                  type="text"
                  value={contactForm.tiktok_url}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      tiktok_url: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                  className={`w-full pl-9 pr-3 py-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    isEditing
                      ? "focus:ring-primary"
                      : "bg-neutral-50 cursor-not-allowed"
                  }`}
                />
              </div>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="twitter"
                  width="20"
                  height="20"
                  fill="none"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  viewBox="0 0 512 512"
                >
                  <g clipPath="url(#clip0_84_15698)">
                    <rect width="512" height="512" rx="60"></rect>
                    <path
                      fill="#aaa"
                      d="M355.904 100h52.928L293.2 232.16 429.232 412H322.72l-83.424-109.072L143.84 412H90.88l123.68-141.36L84.065 100H193.28l75.408 99.696zm-18.576 280.32h29.328L177.344 130.016h-31.472z"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_84_15698">
                      <path fill="#fff" d="M0 0h512v512H0z"></path>
                    </clipPath>
                  </defs>
                </svg>

                <input
                  type="text"
                  value={contactForm.twitter_url}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      twitter_url: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                  className={`w-full pl-9 pr-3 py-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    isEditing
                      ? "focus:ring-primary"
                      : "bg-neutral-50 cursor-not-allowed"
                  }`}
                />
              </div>

              <div className="relative">
                <Youtube
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />

                <input
                  type="text"
                  value={contactForm.youtube_url}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      youtube_url: e.target.value,
                    })
                  }
                  readOnly={!isEditing}
                  className={`w-full pl-9 pr-3 py-2 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    isEditing
                      ? "focus:ring-primary"
                      : "bg-neutral-50 cursor-not-allowed"
                  }`}
                />
              </div>

              <div className="flex gap-2 justify-end">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault(); // لمنع أي ريفرش تلقائي
                      setIsEditing(true);
                    }}
                    className="bg-primary text-white text-xs sm:text-sm px-4 py-2 rounded-md hover:bg-gray-400 transition"
                  >
                    تعديل
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      onClick={handleEditContacts}
                      disabled={isloadingMypassword}
                      className="bg-primary text-white text-xs sm:text-sm px-4 py-2 rounded-md hover:bg-primary/80 transition"
                    >
                      حفظ التعديلات
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-red-100/80 text-red-500 text-xs sm:text-sm px-4 py-2 rounded-md hover:bg-red-100 transition"
                    >
                      إلغاء
                    </button>
                  </>
                )}
              </div>
            </form>
          ))}
      </div>
    </div>
  );
};

export default SettingsModal;
