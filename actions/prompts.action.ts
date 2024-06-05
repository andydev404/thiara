"use server";

import { db } from "@/db";
import { PromptsTable, PromptsVersionsTable } from "@/db/schema/prompts";
import { auth } from "@/lib/auth";
import { IPrompt } from "@/types/prompt.type";
import { asc, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getPrompts() {
  const session = await auth();
  return await db.query.PromptsTable.findMany({
    where: eq(PromptsTable.userId, session?.user?.id!),
    with: {
      category: true,
      promptVersions: { orderBy: desc(PromptsVersionsTable.version) },
    },
    orderBy: desc(PromptsTable.createdAt),
  });
}

export async function getPromptDetails(id: string) {
  return await db.query.PromptsTable.findFirst({
    with: {
      promptVersions: { orderBy: desc(PromptsVersionsTable.version) },
      category: true,
    },
    where: eq(PromptsTable.id, id),
  });
}

export async function removePrompt(id: string) {
  await db.delete(PromptsTable).where(eq(PromptsTable.id, id));
  redirect("/prompts");
}

export async function savePrompt({
  name,
  prompt,
  categoryId,
}: Omit<IPrompt & { prompt: string }, "userId" | "public">) {
  const session = await auth();
  const promptIds = await db
    .insert(PromptsTable)
    .values({
      name,
      categoryId,
      userId: session?.user?.id!,
    })
    .returning({ id: PromptsTable.id });
  await db
    .insert(PromptsVersionsTable)
    .values({ value: prompt, promptId: promptIds[0].id });
  redirect("/prompts/" + promptIds[0].id);
}

export async function editPrompt({
  name,
  prompt,
  categoryId,
  id,
}: Pick<IPrompt, "categoryId" | "name"> & { id: string; prompt: string }) {
  const DEFAULT_VERSION = 1;
  await db
    .update(PromptsTable)
    .set({ name, categoryId })
    .where(eq(PromptsTable.id, id));

  const promptVersions = await db
    .select()
    .from(PromptsVersionsTable)
    .where(eq(PromptsVersionsTable.promptId, id))
    .orderBy(desc(PromptsVersionsTable.version));

  if (
    promptVersions.length > 0 &&
    promptVersions[0].value.trim() !== prompt.trim()
  ) {
    await db.insert(PromptsVersionsTable).values({
      value: prompt,
      promptId: id,
      version: promptVersions[0].version + 1,
    });
  }

  if (promptVersions.length === 0) {
    await db
      .insert(PromptsVersionsTable)
      .values({ value: prompt, promptId: id, version: DEFAULT_VERSION });
  }

  revalidatePath("/prompts/c/" + id);
}
