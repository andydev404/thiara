import { Folder, Plus } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const PromptEmptyState = ({ className }: Props) => {
  return (
    <div className={cn("text-center", className)}>
      <Folder className="mx-auto h-12 w-12 text-neutral-300" />
      <h3 className="mt-2 text-sm font-semibold text-neutral-900">
        No prompts
      </h3>
      <p className="mt-1 text-sm text-neutral-500">
        Get started by creating a new prompt.
      </p>
      <div className="mt-6">
        <Button asChild>
          <Link href="/prompts/new">
            <Plus size={16} className="mr-2" />
            New prompt
          </Link>
        </Button>
      </div>
    </div>
  );
};
