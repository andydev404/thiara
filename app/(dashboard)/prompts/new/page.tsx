"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { savePrompt } from "@/actions/prompts.action";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Prompt name must be at least 2 characters.",
  }),
  category: z.string(),
  prompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }),
});

const NewPromptPage = () => {
  const { categories } = useCategoriesStore();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "Untitle Prompt",
      category: "Uncategorized",
      prompt: "",
    },
  });

  const promptVariables = form.watch("prompt", "").match(/[^{{\}}]+(?=}})/g);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { name, prompt } = data;
      setIsPending(true);
      await savePrompt({
        name,
        prompt,
        categoryId: data.category === "Uncategorized" ? null : data.category,
      });
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-neutral-900">
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
                    <SelectItem value="Uncategorized">Uncategorized</SelectItem>
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
              {isPending ? "Saving" : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NewPromptPage;
