import { cookieService } from "../Cookies/CookiesServices";

export const LogoutHandler = () => {
  cookieService.remove("auth_token");
  window.location.reload();
};
