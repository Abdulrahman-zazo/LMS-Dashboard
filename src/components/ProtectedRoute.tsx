import { Navigate, Outlet } from "react-router-dom";
import { cookieService } from "../Cookies/CookiesServices";

export const ProtectedRoute = () => {
  const token = cookieService.get("auth_token");

  return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
};
