import { Sidebar } from "@/components/sidebar";
import {
  SidebarButtonTrigger,
  UserProfile,
} from "@/components/sidebar/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="xl:pl-72 p-4 min-h-screen flex flex-col">
        <div className="bg-neutral-50 rounded-xl h-full flex-1">
          <div className="sticky bg-neutral-50 rounded-t-xl top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-neutral-100 px-4 sm:px-6 lg:px-8">
            <SidebarButtonTrigger />

            <div className="flex-1 flex justify-end">
              <UserProfile />
            </div>
          </div>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
