import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Link, useNavigate } from "react-router-dom";
import { encryptToken } from "@/Cookies/CryptoServices/crypto";
import ImageLoign from "../assets/medium-shot-girl-learning-with-tablet.webp";
import Logo from "./ui/Logo";
import {
  useLoginMutation,
  useRegisterByGoogleMutation,
} from "@/app/features/Admins/userApi";
import { useTranslation } from "react-i18next";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { Loader } from "lucide-react";

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
      const result = await login({ email, password }).unwrap();

      if (result.user.is_admin === 1) {
        toast.success(t("message.login_message.success"), {
          id: toastId,
        });
        encryptToken(result.authorization.token);
        navigate("/");
      } else if (result.user.is_admin === 0) {
        toast.success(t("ليس لديك صلاحيات للدخول للوحة التحكم"), {
          id: toastId,
        });
      } else {
        toast.success(t(result.msg), {
          id: toastId,
        });
      }
    } catch (err) {
      const error = err as { msg?: string };
      toast.error(error?.msg || "حدث خطأ أثناء التسجيل", {
        id: toastId,
      });
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-8 ">
        <CardContent className="grid p-0  md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center text-center">
                <Logo type="h" width={150} />
                <h1 className="text-xl text-neutral-700 font-semibold">
                  {t("auth.Login_account.Login_title")}
                </h1>
                <p className="text-muted-foreground text-balance text-sm">
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
                        toast.success(
                          t("ليس لديك صلاحيات للدخول للوحة التحكم"),
                          {
                            id: toastId,
                          }
                        );
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
                <Label htmlFor="email"> {t("auth.Login_account.email")}</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">
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

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
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
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
