"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatDistanceToNow } from "date-fns";
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
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategoriesStore } from "@/stores/categories.store";
import { editPrompt, removePrompt } from "@/actions/prompts.action";
import { useEffect, useState } from "react";
import { CheckCircle, LoaderCircle, Trash } from "lucide-react";
import { IPromptDetails, IPromptVersion } from "@/types/prompt.type";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Prompt name must be at least 2 characters.",
  }),
  category: z.string(),
  prompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }),
});

const EditPromptForm = ({
  promptDetails,
}: {
  promptDetails: IPromptDetails;
}) => {
  const { category, promptVersions, name } = promptDetails;

  const [isPending, setIsPending] = useState(false);
  const [versionSelected, setVersionSelected] = useState("");
  const [deleting, setDeleting] = useState(false);

  const { categories } = useCategoriesStore();
  const currentCategory =
    categories.find((c) => c.id === category?.id)?.id || "Uncategorized";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: name,
      category: currentCategory,
      prompt: "",
    },
  });

  useEffect(() => {
    if (promptVersions.length === 0) return;
    setVersionSelected(promptVersions[0].id);
    form.setValue(
      "prompt",
      promptVersions.find((v) => v.id === promptVersions[0].id)!.value
    );
  }, [promptVersions]);

  const promptVariables = form.watch("prompt", "").match(/[^{{\}}]+(?=}})/g);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { name, prompt } = data;
      setIsPending(true);
      await editPrompt({
        name,
        prompt,
        categoryId: data.category === "Uncategorized" ? null : data.category,
        id: promptDetails.id,
      });
      toast.success("Prompt updated successfully");
      setIsPending(false);
    } catch (error) {}
  }

  const handleRemovePrompt = async () => {
    setDeleting(true);
    await removePrompt(promptDetails.id);
  };

  const changePromptVersion = (version: IPromptVersion) => {
    setVersionSelected(version.id);
    form.setValue("prompt", version.value);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="text-neutral-900"
        >
          <div className="flex items-center justify-between border-b border-neutral-200 py-4 sm:py-6 px-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Prompt name"
                      autoComplete="off"
                      className="text-2xl font-bold bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px] text-neutral-50">
                        <SelectValue placeholder="Uncategorized" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Uncategorized">
                        Uncategorized
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem value={category.id} key={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="ml-4">
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
                    This action cannot be undone. This will permanently delete
                    the prompt.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={deleting}>
                    Cancel
                  </AlertDialogCancel>
                  <Button
                    disabled={deleting}
                    variant="destructive"
                    onClick={handleRemovePrompt}
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
          <div className="flex flex-col lg:flex-row items-start gap-8 px-8 mt-10">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="bg-white border-neutral-200 rounded-lg resize-none min-h-96 focus-visible:ring-0 focus-visible:ring-offset-0 p-4 font-serif font-normal"
                        placeholder="Type your prompt here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="min-h-96 flex flex-col gap-4 w-80">
              <div className="border border-neutral-200 rounded-lg p-4 flex-1 bg-white flex flex-col gap-4">
                <div className="flex-1">
                  <h2 className="font-medium">Variables</h2>
                  <div className="mt-4 flex items-center flex-wrap gap-4">
                    {promptVariables?.map((variable: string, index: number) => (
                      <span
                        key={index}
                        className="bg-neutral-200 p-1 rounded-md text-sm"
                      >
                        &#123;&#123;{variable}&#125;&#125;
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-neutral-400 text-sm">
                  To create your first variable, use double curly braces with a
                  single word: &#123;&#123;name&#125;&#125;.
                </p>
              </div>
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <LoaderCircle className="size-4 mr-2 animate-spin" />
                )}
                {isPending ? "Updating" : "Update prompt"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="mt-8 text-background px-8 pb-12">
        <h2 className="font-semibold border-b border-neutral-200 pb-2">
          Versions
        </h2>
        <div className="mt-8 grid grid-cols-4 gap-4">
          {promptVersions.map((version, i) => (
            <button
              key={version.id}
              onClick={() => changePromptVersion(version)}
              className={cn("border p-3 rounded-lg text-left relative", [
                versionSelected === version.id
                  ? "bg-card text-white border-card"
                  : "bg-white border-neutral-200",
              ])}
            >
              {versionSelected === version.id && (
                <CheckCircle
                  size={16}
                  className="absolute right-4 top-3 text-primary"
                />
              )}
              <h3 className="font-medium">
                version {promptVersions.length - i}
              </h3>
              <p className="text-sm mt text-neutral-400">
                {formatDistanceToNow(version.createdAt!, {
                  addSuffix: true,
                  includeSeconds: true,
                })}
              </p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default EditPromptForm;
