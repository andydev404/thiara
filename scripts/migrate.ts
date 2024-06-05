import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const dbConnectionString = process.env.DB_URL as string;

(async () => {
  await migrate(drizzle(postgres(dbConnectionString, { max: 1 })), {
    migrationsFolder: "./db/migrations",
  });
  process.exit(0);
})();
