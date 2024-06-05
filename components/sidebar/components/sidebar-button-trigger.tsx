"use client";

import { useSidebarStore } from "@/stores/sidebar.store";
import { Menu } from "lucide-react";

export const SidebarButtonTrigger = () => {
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  return (
    <button
      onClick={toggleSidebar}
      type="button"
      className="-m-2.5 p-2.5 text-neutral-900 xl:hidden"
    >
      <Menu className="h-5 w-5" aria-hidden="true" />
    </button>
  );
};
