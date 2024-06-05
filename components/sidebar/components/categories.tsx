"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ICategory } from "@/types/sidebar.type";
import { usePathname } from "next/navigation";
import { EditCreationCategory } from "@/components/category";
import { Plus } from "lucide-react";
import { useCategoriesStore } from "@/stores/categories.store";
import { useEffect } from "react";

export const Categories = ({ categories }: { categories: ICategory[] }) => {
  const pathname = usePathname();
  const { setCategories } = useCategoriesStore();

  useEffect(() => {
    setCategories(categories);
  }, [categories]);

  return (
    <>
      <div className="text-sm font-semibold leading-6">Categories</div>
      <ul role="list" className="-mx-2 space-y-1">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/prompts/c/${category.id}`}
              className={cn(
                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold border border-transparent",
                pathname === `/prompts/c/${category.id}`
                  ? "bg-card text-amber-400 border-accent"
                  : " hover:text-amber-400 hover:bg-card hover:border-accent"
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-card text-[0.625rem] font-medium text-muted-foreground group-hover:text-amber-400",
                  {
                    "text-amber-400": pathname === `/prompts/c/${category.id}`,
                  }
                )}
              >
                {category.title.charAt(0)}
              </span>
              <div className="flex items-center flex-1">
                <span className="truncate">{category.title}</span>
                <span className="inline-flex ml-auto items-center rounded-md bg-amber-400/10 px-2 py-1 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-400/20">
                  {category.prompts.length}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="-mx-2">
        <EditCreationCategory
          title="New Category"
          description="Create categories to easily organize your prompts"
          action="create"
          triggerTitle="Add new category"
          triggerClassName="w-full justify-start"
          triggerVariant="ghost"
          triggerIcon={
            <Plus className="flex-shrink-0 size-4 text-amber-400 mr-2" />
          }
        />
      </div>
    </>
  );
};
