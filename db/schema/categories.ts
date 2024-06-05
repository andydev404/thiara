import { timestamp, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { UsersTable } from "./users";
import { relations } from "drizzle-orm";
import { PromptsTable } from "./prompts";

export const CategoriesTable = pgTable("categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: varchar("title", { length: 80 }).notNull(),
  userId: text("userId")
    .notNull()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const categoriesRelations = relations(CategoriesTable, ({ many }) => ({
  prompts: many(PromptsTable),
}));
