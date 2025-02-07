import { drizzle, type AnyD1Database } from "drizzle-orm/d1";

import { notificationsTable } from "./schemas/notifications";

export const getDb = (db: AnyD1Database) =>
  drizzle(db, {
    casing: "snake_case",
    schema: { notifications: notificationsTable },
  });
