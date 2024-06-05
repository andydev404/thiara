import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as promptsSchema from "./schema/prompts";
import * as categoriesSchema from "./schema/categories";

const sql = neon(process.env.DB_URL!);

export const db = drizzle(sql, {
  schema: { ...promptsSchema, ...categoriesSchema },
});
