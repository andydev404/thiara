export const dynamic = "force-dynamic";

import { getPromptDetails } from "@/actions/prompts.action";
import React from "react";
import EditPromptForm from "./components/edit-prompt-form";
import { redirect } from "next/navigation";

const DetailsPromptPage = async ({ params }: { params: { id: string } }) => {
  const promptDetails = await getPromptDetails(params.id);

  if (!promptDetails) redirect("/prompts");

  return (
    <div>
      <EditPromptForm promptDetails={promptDetails} />
    </div>
  );
};

export default DetailsPromptPage;
