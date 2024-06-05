"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { editCategory, saveCategory } from "@/actions/categories.action";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Nane must be at least 2 characters",
    })
    .max(80),
});

type Props = {
  action: "edit" | "create";
  title: string;
  description: string;
  defaultValue?: string;
  triggerTitle: String;
  triggerIcon?: ReactNode;
  triggerClassName?: string;
  categoryId?: string;
  triggerVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
};

export const EditCreationCategory = (props: Props) => {
  const {
    defaultValue,
    action,
    title,
    description,
    triggerTitle,
    triggerIcon,
    triggerClassName,
    triggerVariant = "default",
    categoryId,
  } = props;
  const [isPending, setIsPending] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValue || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const categoryName = values.name;
    setIsPending(true);
    try {
      if (action === "create") {
        await saveCategory(categoryName);
        toast.success("Category created successfully");
      } else {
        if (!categoryId) {
          toast.error("Category id must be provided");
          return;
        }
        await editCategory(categoryName, categoryId);
        toast.success("Category updated successfully");
      }
    } catch (error) {
      toast.error("Error, please try again");
    } finally {
      setSheetIsOpen(false);
      form.reset();
      setIsPending(false);
    }
  }

  return (
    <Sheet open={sheetIsOpen} onOpenChange={(status) => setSheetIsOpen(status)}>
      <SheetTrigger asChild>
        <Button
          onClick={() => setSheetIsOpen(true)}
          className={cn(triggerClassName)}
          variant={triggerVariant}
        >
          {triggerIcon || null}
          {triggerTitle}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-background border-accent">
        <SheetHeader>
          <SheetTitle className=" font-semibold text-xl">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="flex items-center gap-4 my-6 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-right">
                <Button type="submit" variant="brand" disabled={isPending}>
                  {isPending && (
                    <LoaderCircle className="mr-2 size-4 animate-spin" />
                  )}
                  Save category
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
