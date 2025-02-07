"use client";

import { useState } from "react";

import { Notification } from "@api/db/schemas/notifications";
import { AlertCircle, Terminal } from "lucide-react";
import { useWebSocket } from "partysocket/react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

function AnnouncementNotification({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle className="pt-1">{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

function AlarmNotification({
  title,
  description,
  urgency,
}: {
  title: string;
  description?: string;
  urgency?: string;
}) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="pt-1">{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      {urgency && <AlertDescription>Urgency: {urgency}</AlertDescription>}
    </Alert>
  );
}

export function NotificationStream() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useWebSocket("ws://localhost:4000/notifications", undefined, {
    onMessage: (event) => {
      const notification = JSON.parse(event.data) as Notification;

      const existingNotification = notifications.findIndex(
        (n) => n.id === notification.id
      );

      if (existingNotification === -1) {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          notification,
        ]);
      }
    },
  });

  return (
    <div className="flex w-full flex-col items-center bg-muted">
      <h1 className="p-2 font-geist-mono text-xl">Notification Stream</h1>
      <div className="flex w-full flex-col gap-2 p-4">
        {notifications.map((notification) => {
          if (notification.type === "announcement") {
            return (
              <AnnouncementNotification
                key={notification.id}
                title={notification.title}
              />
            );
          }

          if (notification.type === "alarm") {
            return (
              <AlarmNotification
                key={notification.id}
                title={notification.title}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
