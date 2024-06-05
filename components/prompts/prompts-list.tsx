import { cn } from "@/lib/utils";
import { IPromptDetails } from "@/types/prompt.type";
import { formatDistanceToNow } from "date-fns";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  prompts: IPromptDetails[];
};

export const PromptsList = ({ prompts }: Props) => {
  return (
    <ul role="list" className="divide-y divide-primary/5">
      {prompts.map((prompt) => (
        <li
          key={prompt.id}
          className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8 hover:bg-neutral-100 transition"
        >
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              <div
                className={cn("flex-none rounded-full p-1", [
                  prompt.public
                    ? "text-gray-500 bg-gray-100/10"
                    : "text-amber-400 bg-amber-400/10",
                ])}
              >
                <div className="h-2 w-2 rounded-full bg-current"></div>
              </div>
              <h2 className="min-w-0 text-sm font-semibold leading-6">
                <Link href={`/prompts/${prompt.id}`} className="flex gap-x-2">
                  <span className="truncate">{prompt.name}</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="whitespace-nowrap">
                    {prompt.category ? prompt.category.title : "Uncategorized"}
                  </span>
                  <span className="absolute inset-0"></span>
                </Link>
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-muted-foreground">
              <p className="truncate">
                Last update:{" "}
                {formatDistanceToNow(prompt.promptVersions[0].createdAt!, {
                  addSuffix: true,
                  includeSeconds: true,
                })}
              </p>
              <svg
                viewBox="0 0 2 2"
                className="h-0.5 w-0.5 flex-none fill-gray-300"
              >
                <circle cx="1" cy="1" r="1" />
              </svg>
              <p className="whitespace-nowrap">
                Last version: {prompt.promptVersions.length}
              </p>
            </div>
          </div>
          <div
            className={cn(
              "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset ",
              [
                prompt.public
                  ? "text-muted-foreground bg-gray-400/10 ring-gray-400/20"
                  : "text-accent bg-amber-400/10 ring-amber-400/30",
              ]
            )}
          >
            {prompt.public ? "Public" : "Private"}
          </div>
          <ChevronRight className="h-5 w-5 flex-none text-muted-foreground" />
        </li>
      ))}
    </ul>
  );
};
