import { Loader } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import {
  useChangePasswordMutation,
  useForgetPasswordMutation,
} from "../../../app/features/Admins/userApi";

import { encryptToken } from "../../../Cookies/CryptoServices/crypto";
import toast from "react-hot-toast";
import Logo from "@/components/ui/Logo";

export default function ForgetPassword() {
  const { t } = useTranslation("translation");
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgetPassword, { isLoading: isLoadingResend }] =
    useForgetPasswordMutation();
  const [changePassword, { isLoading: isLoadingChange }] =
    useChangePasswordMutation();
  const handleNext = async () => {
    if (step === 1 && email) {
      const toastId = toast(t("message.forget_message.loading"));

      try {
        const result = await forgetPassword(email);

        if (result.data.status === true) {
          toast.success(t("message.forget_message.send"), { id: toastId });
          setTimeout(() => {
            setStep(2);
          }, 3000);
        } else {
          toast.error(t("message.forget_message.error_code"), {
            id: toastId,
          });
          setStep(1);
        }
      } catch (err) {
        const error = err as { data?: { msg?: string } };
        toast.error(error.data?.msg || t("message.forget_message.error_code"), {
          id: toastId,
        });
      }
    } else if (step === 2 && code) {
      setStep(3);
    } else if (step === 3 && password && password === confirmPassword) {
      const toastId = toast.loading(t("message.forget_message.code"));

      try {
        const result = await changePassword({ email, code, password });

        if (result.data.user.is_admin === 1) {
          toast.success(t("message.forget_message.success"), { id: toastId });
          encryptToken(result?.data.authorization.token);

          navigate("/");
        } else if (result.data.user.is_admin === 0) {
          toast.success(t("ليس لديك صلاحيات للدخول للوحة التحكم"), {
            id: toastId,
          });
        } else {
          toast.success(t(result.data.msg), {
            id: toastId,
          });
        }
      } catch (err) {
        const error = err as { data?: { msg?: string } };

        toast.error(error.data?.msg || "حدث خطأ أثناء التسجيل", {
          id: toastId,
        });
      }
    }
  };
  return (
    <div className="bg-white flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex mx-auto items-center  p-6 w-full max-w-sm flex-col gap-6">
        <Logo type="h" width={120} />
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h2 className="text-xl  sm:text-2xl font-semibold text-text">
              {t("auth.forget_password.forget_title")}
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 mt-2">
              {step === 1 && t("auth.forget_password.forget_text")}
              {step === 2 && t("auth.forget_password.code")}
              {step === 3 && t("auth.forget_password.new_password_text")}
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {step === 1 && (
              <div>
                <label className="text-sm sm:text-base font-medium text-gray-700 block mb-2">
                  {t("auth.forget_password.email")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="email@domain.com"
                />
              </div>
            )}

            {step === 2 && (
              <div>
                <label className="text-sm sm:text-base font-medium text-gray-700 block mb-2">
                  {t("auth.forget_password.Verification")}
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter the 6-digit code"
                />
              </div>
            )}

            {step === 3 && (
              <>
                <div>
                  <label className="text-sm sm:text-base font-medium text-gray-700 block mb-2">
                    {t("auth.forget_password.new_password")}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="********"
                  />
                </div>

                <div>
                  <label className="text-sm sm:text-base font-medium text-gray-700 block mb-2">
                    {t("auth.forget_password.new_password2")}
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="********"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoadingResend || isLoadingChange}
              onClick={handleNext}
              className="w-full bg-primary text-sm sm:text-base text-white py-2 rounded-md  hover:bg-primary-dark transition"
            >
              {step === 3 ? (
                isLoadingChange ? (
                  <span className=" flex justify-center ">
                    <Loader
                      size={20}
                      className="animate-spin  animate-duration-[1500ms]"
                    />
                  </span>
                ) : (
                  t("auth.forget_password.confirm")
                )
              ) : isLoadingResend ? (
                <span className=" flex justify-center ">
                  <Loader
                    size={20}
                    className="animate-spin  animate-duration-[1500ms]"
                  />
                </span>
              ) : (
                t("auth.forget_password.next")
              )}
            </button>
          </form>

          {step < 3 && (
            <p className="text-sm sm:text-base text-center text-gray-600">
              {t("auth.forget_password.Remembered")}
              <Link
                to="/auth/login"
                className="text-primary mx-1  hover:underline"
              >
                {t("auth.forget_password.Login")}
              </Link>
            </p>
          )}
        </div>
      </div>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
