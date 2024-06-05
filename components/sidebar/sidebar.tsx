import { SidebarContent } from "./components/sidebar-content";
import MobileMenu from "./components/mobile-menu";
import { getCategories } from "@/actions/categories.action";

export const Sidebar = async () => {
  const categoryList = await getCategories();
  return (
    <div>
      <MobileMenu categories={categoryList} />
      <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col bg-background">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6">
          <SidebarContent categories={categoryList} />
        </div>
      </div>
    </div>
  );
};
