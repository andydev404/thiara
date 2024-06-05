import { getPrompts } from "@/actions/prompts.action";
import { PromptEmptyState } from "@/components/empty-states";
import { PromptsList } from "@/components/prompts";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const PromptsPage = async () => {
  const prompts = await getPrompts();

  return (
    <div className="text-neutral-900">
      <div className="flex items-center justify-between border-b border-primary/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h1 className="text-2xl font-bold ">My Prompts</h1>
        {prompts.length > 0 && (
          <Button asChild>
            <Link href="/prompts/new">
              <Plus size={16} className="mr-2" />
              New prompt
            </Link>
          </Button>
        )}
      </div>

      {prompts.length === 0 && <PromptEmptyState className="mt-8" />}

      <PromptsList prompts={prompts} />
    </div>
  );
};

export default PromptsPage;
