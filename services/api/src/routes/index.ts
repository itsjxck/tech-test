import { router as trpcRouter } from "#trpc";

import { notificationsRouter } from "./notifications";

export const router = trpcRouter({
  notifications: notificationsRouter,
});

export type Router = typeof router;
