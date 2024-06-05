"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ICategory } from "@/types/sidebar.type";
import { removeCategory } from "@/actions/categories.action";
import { useState } from "react";
import { EditCreationCategory } from "./edit-creation-category";

export const CategoryHeader = ({ category }: { category: ICategory }) => {
  const [deleting, setDeleting] = useState(false);
  const handleRemoveCategory = async () => {
    setDeleting(true);
    await removeCategory(category.id);
  };

  return (
    <div className="flex items-center justify-between py-4 sm:py-6 px-8">
      <div className="flex items-center gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-card text-[0.625rem] font-medium text-amber-400">
          {category.title.charAt(0)}
        </span>
        <h1 className="text-2xl font-bold text-background">{category.title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <EditCreationCategory
          key={category.title}
          title="Edit Category"
          description=""
          action="edit"
          defaultValue={category.title}
          categoryId={category.id}
          triggerTitle="Edit"
          triggerIcon={<Pencil size={16} className="mr-2" />}
        />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash size={16} className="mr-2" />
              Remove
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-primary">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-neutral-50">
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
              <Button
                disabled={deleting}
                variant="destructive"
                onClick={handleRemoveCategory}
              >
                {deleting && (
                  <LoaderCircle className="size-4 animate-spin mr-2" />
                )}
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
