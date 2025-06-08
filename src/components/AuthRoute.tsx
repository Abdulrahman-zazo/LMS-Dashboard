import { Navigate, Outlet } from "react-router-dom";

import { cookieService } from "../Cookies/CookiesServices";

export const AuthRoute = () => {
  const token = cookieService.get("auth_token");

  return token ? <Navigate to="/" replace /> : <Outlet />;
};
