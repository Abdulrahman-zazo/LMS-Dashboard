import {
  BookOpenCheck,
  ChevronUp,
  Home,
  Info,
  Languages,
  Layers,
  LibraryBig,
  LogOut,
  Search,
  Settings,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Logo from "./ui/Logo";
import { useGetuserInformationQuery } from "@/app/features/Admins/userApi";
import { cookieService } from "@/Cookies/CookiesServices";
import { LogoutHandler } from "./LogoutHandler";
import { useDispatch } from "react-redux";
import { openModal } from "@/app/features/settings/settingsModalSlice";
import { changeLangAction } from "@/app/features/Language/LanguageSlice";
import { useGetAllCoursesQuery } from "@/app/features/Courses/CoursesApi";

// Menu items.

export function AppSidebar() {
  const { t, i18n } = useTranslation("translation");
  const token = cookieService.get("auth_token") || "";
  const dispatch = useDispatch();
  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";

    dispatch(changeLangAction(newLang));
  };
  const { data, isLoading } = useGetuserInformationQuery(token as string);
  const { data: courses } = useGetAllCoursesQuery(token as string, {
    refetchOnMountOrArgChange: true,
  });

  const items = [
    {
      title: t("Header.Home"),
      url: "/",
      icon: Home,
    },
    {
      title: t("Header.Courses"),
      url: "/courses",
      icon: () => (
        <div className="relative">
          <LibraryBig />
          {courses?.AllCommentUnRead > 0 && (
            <span
              className={`absolute -top-1 ${
                i18n.language === "ar" ? "-right-0.5" : "-left-0.5"
              } bg-red-500 text-white text-[8px] font-light rounded-full w-3 h-3 flex items-center justify-center`}
            >
              {courses?.AllCommentUnRead}
            </span>
          )}
        </div>
      ),
    },
    {
      title: t("Header.Curricula"),
      url: "/curricula",
      icon: BookOpenCheck,
    },

    {
      title: t("Header.stages"),
      url: "/stages",
      icon: Layers,
    },
    {
      title: t("Header.offer"),
      url: "/offer",
      icon: Search,
    },
    {
      title: t("Header.users"),
      url: "/users",
      icon: Users,
    },
    {
      title: t("Header.complaints"),
      url: "/complaints",
      icon: Info,
    },
  ];
  const { open } = useSidebar();

  return (
    <Sidebar
      side={i18n.language === "ar" ? "right" : "left"}
      variant="sidebar"
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader className="mx-auto">
            {open ? (
              <Logo type="h" width={150} />
            ) : (
              <Logo type="icon" width={40} />
            )}
          </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="py-1 ">
                  <SidebarMenuButton asChild className="py-2  px-2">
                    <Link to={item.url} className="py-2 text-xs sm:text-sm ">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {!isLoading ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="h-16">
                    <img
                      src={data?.user.image}
                      className="w-10 h-10 object-cover rounded-lg"
                      alt="user-image"
                    />
                    <div className="flex justify-between items-center w-full ">
                      <div className="flex flex-col ">
                        <span>{data?.user.name}</span>
                        <span className="text-xs text-neutral-500">
                          {data?.user.email}
                        </span>
                      </div>
                      <ChevronUp className="" size={16} />
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem
                    className="text-xs flex gap-4"
                    dir={i18n.language === "ar" ? "rtl" : "ltr"}
                  >
                    <Settings />
                    <span
                      className=" hover:bg-gray-100 w-full cursor-pointer "
                      onClick={() => {
                        dispatch(openModal(data?.user.image));
                      }}
                    >
                      {t("userMenu.settings")}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-xs flex gap-4  cursor-pointer "
                    dir={i18n.language === "ar" ? "rtl" : "ltr"}
                  >
                    <Languages />
                    <button
                      onClick={toggleLanguage}
                      className="hover:text-bg-icon underline mt-2 text-start"
                    >
                      {i18n.language === "ar"
                        ? "تغير اللغة"
                        : "Change Language"}
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-xs flex gap-4  cursor-pointer "
                    dir={i18n.language === "ar" ? "rtl" : "ltr"}
                  >
                    <LogOut />
                    <span onClick={() => LogoutHandler()}>
                      {t("userMenu.logout")}
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center w-full gap-4 py-2">
                <div className="w-8 h-8 p-2 rounded-full bg-neutral-300 animate-pulse "></div>
                <div className="w-full">
                  <div className="h-2 mb-2 bg-neutral-200 p-2 animate-pulse w-1/2" />
                  <div className="h-2 bg-neutral-200 p-2 animate-pulse w-full" />
                </div>
              </div>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
