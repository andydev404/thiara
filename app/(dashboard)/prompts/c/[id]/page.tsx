import { getCategoryById } from "@/actions/categories.action";
import { CategoryHeader } from "@/components/category";
import { redirect } from "next/navigation";
import { PromptsList } from "@/components/prompts";
import { PromptEmptyState } from "@/components/empty-states";

const CategoryPage = async ({ params }: { params: { id: string } }) => {
  const category = await getCategoryById(params.id);

  if (!category) redirect("/prompts");

  return (
    <div className="text-neutral-900">
      <CategoryHeader category={category} />

      {category.prompts.length === 0 && <PromptEmptyState className="mt-8" />}

      <PromptsList prompts={category.prompts} />
    </div>
  );
};

export default CategoryPage;
