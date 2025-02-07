import { getServerByName } from "partyserver";

import {
  notificationCreateSchema,
  notificationsTable,
} from "#db/schemas/notifications";
import { publicProcedure } from "#trpc";

export const createNotification = publicProcedure
  .input(notificationCreateSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      const [notification] = await ctx.db
        .insert(notificationsTable)
        .values(input)
        .returning();

      const notificationSystem = await getServerByName(
        ctx.env.NOTIFICATIONS,
        "notifications"
      );
      await notificationSystem.notify(notification);

      return notification;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create notification");
    }
  });
