import { AppSidebar } from "@/app/(components)/ui/app-sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip"; // 🔥 1. استورد الـ TooltipProvider
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Layout({ children }) {
  const clerkUser = await currentUser();
  const adminName = clerkUser?.firstName;
  return (
    <SidebarProvider>
      <TooltipProvider delayDuration={0}>
        <div className="flex  w-full bg-gray-50 text-gray-900">
          <AppSidebar />

          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Navbar */}
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h2 className="text-md font-semibold text-gray-700">
                  Welcome Back, {adminName} 👋
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <UserButton />
              </div>
            </header>

            {/* Content */}
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          </div>
        </div>
      </TooltipProvider>
    </SidebarProvider>
  );
}
