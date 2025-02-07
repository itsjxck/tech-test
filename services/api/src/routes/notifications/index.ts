import { router } from "#trpc";

import { createNotification } from "./create";

export const notificationsRouter = router({
  createNotification,
});
