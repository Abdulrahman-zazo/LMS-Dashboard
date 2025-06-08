import { createBrowserRouter, Navigate } from "react-router-dom";

import { ProtectedRoute } from "../components/ProtectedRoute";

import LoginPage from "../Pages/Auth/Login";
import { AuthRoute } from "../components/AuthRoute";
import ForgetPassword from "../Pages/Auth/Forget-Password";

import Layout from "@/Pages/Dashboard";
import CoursesPage from "@/Pages/Dashboard/Courses";
import CurriculaPage from "@/Pages/Dashboard/Curricula";
import OffersPage from "@/Pages/Dashboard/Offers/OffersPage";
import UsersPage from "@/Pages/Dashboard/Users";
import ComplaintsPage from "@/Pages/Dashboard/Complaints/ComplaintsPage";
import StagePage from "@/Pages/Dashboard/Stage/StagePage";
import SubjectPage from "@/Pages/Dashboard/Subject/SubjectPage";
import HomePage from "@/Pages/Dashboard/Home";

export const router = createBrowserRouter([
  {
    element: <AuthRoute />,
    path: "/auth",
    children: [
      { index: true, path: "login", element: <LoginPage /> },
      { path: "forget-password", element: <ForgetPassword /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    path: "/",
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "/courses", element: <CoursesPage /> },
          { path: "/curricula", element: <CurriculaPage /> },
          { path: "/offer", element: <OffersPage /> },
          { path: "/users", element: <UsersPage /> },
          { path: "/complaints", element: <ComplaintsPage /> },
          { path: "/stages", element: <StagePage /> },
          { path: "/subjects", element: <SubjectPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
