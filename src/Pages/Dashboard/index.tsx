import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/store";
import { useDispatch } from "react-redux";
import SettingsModal from "@/components/settings";
import { closeModal } from "@/app/features/settings/settingsModalSlice";

export default function Layout() {
  const { isOpen, image } = useAppSelector((state) => state.settingsModal);
  const dispatch = useDispatch();
  return (
    <SidebarProvider>
      <div className="z-0 ">
        <AppSidebar />
      </div>

      <main className="w-full">
        <SettingsModal
          isOpen={isOpen}
          ImageUser={image}
          onClose={() => dispatch(closeModal())}
        />
        <div className="bg-white p-4 w-full shadow-xs">
          <SidebarTrigger />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex-3 m-4">
            <div className="">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
