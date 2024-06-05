import Logo from "@/components/ui/logo";
import { NavigationLinks } from "./navigation-links";
import { Categories } from "./categories";
import { ICategory } from "@/types/sidebar.type";

export const SidebarContent = ({ categories }: { categories: ICategory[] }) => {
  return (
    <>
      <div className="flex h-16 shrink-0 items-center">
        <Logo hideLabel />
      </div>
      <nav className="flex flex-1 flex-col gap-y-7">
        <NavigationLinks />
        <Categories categories={categories} />
      </nav>
    </>
  );
};
