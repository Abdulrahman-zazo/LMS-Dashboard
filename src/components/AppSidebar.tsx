import {
  BookOpenCheck,
  ChevronUp,
  Home,
  Info,
  Layers,
  LibraryBig,
  Search,
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
import { useGetuserInformationQuery } from "@/app/features/User/userApi";
import { cookieService } from "@/Cookies/CookiesServices";
import { LogoutHandler } from "./LogoutHandler";

// Menu items.

export function AppSidebar() {
  const { t } = useTranslation("translation");
  const token = cookieService.get("auth_token") || "";
  const { data, isLoading } = useGetuserInformationQuery(token as string);
  const items = [
    {
      title: t("Header.Home"),
      url: "/",
      icon: Home,
    },
    {
      title: t("Header.Courses"),
      url: "/courses",
      icon: LibraryBig,
    },
    {
      title: t("Header.Curricula"),
      url: "/curricula",
      icon: BookOpenCheck,
    },
    {
      title: "المراحل الدراسية",
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
    <Sidebar side="right" variant="sidebar" collapsible="icon">
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
                <SidebarMenuItem key={item.title} className="py-1">
                  <SidebarMenuButton asChild className="py-2">
                    <Link to={item.url} className="py-2">
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
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span onClick={() => LogoutHandler()}>Sign out</span>
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
