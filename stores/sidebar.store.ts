import { ISidebarStore } from "@/types/sidebar.type";
import { create } from "zustand";

export const useSidebarStore = create<ISidebarStore>((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));
