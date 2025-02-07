import fs from "fs";
import path from "path";

import { defineConfig } from "drizzle-kit";

function getLocalD1DB() {
  try {
    const basePath = path.resolve(
      "../../.wrangler/state/v3/d1/miniflare-D1DatabaseObject"
    );
    const dbFile = fs
      .readdirSync(basePath, { encoding: "utf-8" })
      .find((f) => f.endsWith(".sqlite"));

    if (!dbFile) {
      throw new Error(`.sqlite file not found in ${basePath}`);
    }

    const url = path.resolve(basePath, dbFile);
    return url;
  } catch (err) {
    console.log(`Error: ${(err as Error).message}`);
  }
}

export default defineConfig({
  out: "./migrations",
  schema: "./src/db/schemas",
  dialect: "sqlite",
  casing: "snake_case",
  dbCredentials: {
    url: getLocalD1DB()!,
  },
});
