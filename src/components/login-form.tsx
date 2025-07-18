import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Link, useNavigate } from "react-router-dom";
import { encryptToken } from "@/Cookies/CryptoServices/crypto";
const ImageLoign =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/v1749857069/medium-shot-girl-learning-with-tablet_goejhr.webp";
import Logo from "./ui/Logo";
import {
  useLoginMutation,
  useRegisterByGoogleMutation,
} from "@/app/features/Admins/userApi";
import { useTranslation } from "react-i18next";
import { GoogleLogin } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const { t } = useTranslation("translation");
  const [login, { isLoading }] = useLoginMutation();
  const [registerByGoogle] = useRegisterByGoogleMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const emailEntry = formData.get("email") as string;
    const passwordEntry = formData.get("password") as string;

    if (typeof emailEntry !== "string" || typeof passwordEntry !== "string") {
      toast.error(t("message.login_message.error"));
      return;
    }
    const email = emailEntry;
    const password = passwordEntry;
    const toastId = toast.loading(t("message.login_message.loading"));
    try {
      const result = await login({ email, password });

      if (result.data.status && result.data.user.is_admin === 1) {
        toast.success(t("message.login_message.success"), {
          id: toastId,
        });
        encryptToken(result.data.authorization.token);
        navigate("/");
      } else if (result.data.status && result.data.user.is_admin === 0) {
        toast.error(t("message.login_message.NoAccess"), {
          id: toastId,
        });
      } else {
        toast.error(t(result.data.msg), {
          id: toastId,
        });
      }
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(
        error.data?.message || t("message.forget_message.error_code"),
        {
          id: toastId,
        }
      );
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-6   ">
        <CardContent className="grid p-0  md:grid-cols-2">
          <form className="px-6 md:px-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center text-center">
                <Logo type="h" width={150} />
                <h1 className="text-base text-neutral-700 font-semibold">
                  {t("auth.Login_account.Login_title")}
                </h1>
                <p className="text-muted-foreground text-balance text-xs">
                  {t("auth.Login_account.create_text")}
                </p>
              </div>
              <div className="w-full flex items-center justify-center rounded-md py-2 text-sm sm:text-base font-medium text-neutral-700 transition">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    const credential = credentialResponse.credential;

                    if (!credential) return;
                    const toastId = toast(t("message.login_message.loading"));
                    const decoded = jwtDecode(credential) as {
                      email: string;
                      name: string;
                      phone?: string;
                      picture?: string;
                      sub: string;
                    };

                    try {
                      const result = await registerByGoogle({
                        email: decoded?.email,
                        name: decoded?.name,
                        sub: decoded?.sub,
                        image: decoded?.picture,
                      }).unwrap();
                      if (result.user.is_admin === 1) {
                        toast.success(t("message.login_message.success"), {
                          id: toastId,
                        });
                        encryptToken(result.authorization.token);
                        navigate("/");
                      } else if (result.user.is_admin === 0) {
                        toast.success(t("message.login_message.NoAccess"), {
                          id: toastId,
                        });
                      } else {
                        toast.success(t(result.msg), {
                          id: toastId,
                        });
                      }
                    } catch (err) {
                      const error = err as { data?: { msg?: string } };
                      toast.error(error.data?.msg || "حدث خطأ أثناء التسجيل", {
                        id: toastId,
                      });
                    }
                  }}
                  onError={() => {
                    toast.error(t("message.login_message.error_register"));
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <hr className="flex-grow border-neutral-300" />
                <span className="text-sm sm:text-base text-neutral-400">
                  Or
                </span>
                <hr className="flex-grow border-neutral-300" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-xs sm:text-sm">
                  {" "}
                  {t("auth.Login_account.email")}
                </Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs sm:text-sm">
                    {t("auth.Login_account.Password")}
                  </Label>
                  <Link
                    to="/auth/forget-password"
                    className=" text-sm underline-offset-2 hover:underline"
                  >
                    {t("auth.Login_account.forget")}
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Password"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                title="login btn"
              >
                {isLoading ? (
                  <span className=" flex justify-center ">
                    <Loader
                      size={16}
                      className="animate-spin  animate-duration-[1500ms]"
                    />
                  </span>
                ) : (
                  <>{t("auth.Login_account.Login")}</>
                )}
              </Button>
              {/* 
              <div className="text-center text-sm">
                {t("auth.Login_account.noAccount")}{" "}
                <a
                  href="https://h-platform.online"
                  target="_blank"
                  className="underline underline-offset-4"
                >
                  {t("auth.Login_account.noAccount")}{" "}
                </a>
              </div> */}
            </div>
          </form>
          <div className=" relative hidden md:block">
            <img
              src={ImageLoign}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover rounded-2xl dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <a href="https://www.h-platform.online/h-platform-term">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="https://www.h-platform.online/h-platform-privacy-policy">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
