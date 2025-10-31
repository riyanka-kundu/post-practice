import { Outlet } from "react-router-dom";
import { AppSidebar } from "./Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

const Container = () => {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-4 ">
          <SidebarTrigger />
          <Outlet />
          <Toaster richColors={true}position="top-right" />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Container;
