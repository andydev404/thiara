"use server";

import { db } from "@/db";
import { CategoriesTable } from "@/db/schema/categories";
import { PromptsVersionsTable } from "@/db/schema/prompts";
import { auth } from "@/lib/auth";
import { and, asc, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getCategories() {
  const session = await auth();
  return await db.query.CategoriesTable.findMany({
    where: eq(CategoriesTable.userId, session?.user?.id!),
    orderBy: asc(CategoriesTable.createdAt),
    with: {
      prompts: true,
    },
  });
}

export async function getCategoryById(id: string) {
  const session = await auth();
  const categoryDetails = await db.query.CategoriesTable.findFirst({
    where: and(
      eq(CategoriesTable.id, id),
      eq(CategoriesTable.userId, session?.user?.id!)
    ),
    with: {
      prompts: {
        with: {
          category: true,
          promptVersions: { orderBy: desc(PromptsVersionsTable.version) },
        },
      },
    },
  });

  return categoryDetails;
}

export async function removeCategory(id: string) {
  const session = await auth();
  await db
    .delete(CategoriesTable)
    .where(
      and(
        eq(CategoriesTable.id, id),
        eq(CategoriesTable.userId, session?.user?.id!)
      )
    );
  redirect("/prompts");
}

export async function saveCategory(title: string) {
  const session = await auth();
  const categoryIds = await db
    .insert(CategoriesTable)
    .values({
      title,
      userId: session?.user?.id!,
    })
    .returning({ id: CategoriesTable.id });
  redirect("/prompts/c/" + categoryIds[0].id);
}

export async function editCategory(title: string, id: string) {
  await db
    .update(CategoriesTable)
    .set({ title })
    .where(eq(CategoriesTable.id, id));
  revalidatePath("/prompts/c/" + id);
}
