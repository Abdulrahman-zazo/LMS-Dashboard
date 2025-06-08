import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  // const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <SidebarProvider>
      {/* Sidebar ثابت يسار أو يمين */}
      <div className="z-0 ">
        <AppSidebar />
      </div>

      <main className="w-full">
        <div className="bg-white p-4 w-full shadow-xs">
          <SidebarTrigger />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex-3 m-4">
            <div className="">
              <Outlet />
            </div>
          </div>
          {/* <div className="p-4  flex-1  ">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-2xl border mx-auto w-full bg-white"
              captionLayout="dropdown"
            />
          </div> */}
        </div>
      </main>
    </SidebarProvider>
  );
}
