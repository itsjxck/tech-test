import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { uuid } from "../schema-utils";

export const notificationsTable = sqliteTable("notifications", {
  id: uuid().primaryKey(),
  type: text().notNull(),
  title: text().notNull(),
  createdAt: integer({ mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
});

export const notificationSchema = createSelectSchema(notificationsTable);
export const notificationCreateSchema = createInsertSchema(
  notificationsTable
).omit({ id: true, createdAt: true });

export type Notification = z.infer<typeof notificationSchema>;
export type NotificationCreateInput = z.infer<typeof notificationCreateSchema>;
