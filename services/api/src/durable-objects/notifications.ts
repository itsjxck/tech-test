import { Server } from "partyserver";

import { Notification } from "#db/schemas/notifications";

export class Notifications extends Server<CloudflareBindings> {
  async notify(notification: Notification) {
    this.broadcast(JSON.stringify(notification));
  }
}
