"use client";

import { useSidebarStore } from "@/stores/sidebar.store";
import { useShallow } from "zustand/react/shallow";
import { SidebarContent } from "./sidebar-content";
import { ICategory } from "@/types/sidebar.type";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const MobileMenu = ({ categories }: { categories: ICategory[] }) => {
  const { isOpen, toggleSidebar } = useSidebarStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      toggleSidebar: state.toggleSidebar,
    }))
  );

  return (
    <Sheet open={isOpen} onOpenChange={() => toggleSidebar()}>
      <SheetContent side="left">
        <SidebarContent categories={categories} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
