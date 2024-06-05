import {
  timestamp,
  pgTable,
  text,
  varchar,
  boolean,
  serial,
  integer,
} from "drizzle-orm/pg-core";
import { UsersTable } from "./users";
import { CategoriesTable } from "./categories";
import { relations } from "drizzle-orm";

export const PromptsTable = pgTable("prompts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name").notNull(),
  public: boolean("public").notNull().default(false),
  userId: text("userId")
    .notNull()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
  categoryId: text("categoryId").references(() => CategoriesTable.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const promptsRelations = relations(PromptsTable, ({ many, one }) => ({
  promptVersions: many(PromptsVersionsTable),
  category: one(CategoriesTable, {
    fields: [PromptsTable.categoryId],
    references: [CategoriesTable.id],
  }),
}));

export const PromptsVersionsTable = pgTable("prompts_versions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  value: text("value").notNull(),
  promptId: text("promptId")
    .notNull()
    .references(() => PromptsTable.id, { onDelete: "cascade" }),
  version: integer("version").notNull().default(1),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const promptsVersionsRelations = relations(
  PromptsVersionsTable,
  ({ one }) => ({
    prompt: one(PromptsTable, {
      fields: [PromptsVersionsTable.promptId],
      references: [PromptsTable.id],
    }),
  })
);
