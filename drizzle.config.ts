import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import env from "./app/lib/env";

export default defineConfig({
  out: "./server/database/migrations",
  schema: "./server/database/schema/index.ts",
  casing: "snake_case",
  dialect: "turso",
  dbCredentials: {
    url: env.NODE_ENV === "development" ? env.TURSO_DATABASE_URL : env.TURSO_DATABASE_URL_PROD,
    authToken: env.NODE_ENV === "development" ? undefined : env.TURSO_AUTH_TOKEN,
  },
});
