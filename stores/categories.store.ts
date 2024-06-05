import { ICategory } from "@/types/sidebar.type";
import { create } from "zustand";

type Props = {
  categories: ICategory[];
  setCategories: (cat: ICategory[]) => void;
};

export const useCategoriesStore = create<Props>((set) => ({
  categories: [],
  setCategories: (categories: ICategory[]) => set({ categories }),
}));
