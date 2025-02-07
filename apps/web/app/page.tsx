import { TRPCProvider } from "~/lib/trpc/provider";
import { CreateNotificationForm } from "~/components/notifications/create-form";
import { NotificationStream } from "~/components/notifications/stream";

export default function Page() {
  return (
    <div className="flex h-screen w-full">
      <TRPCProvider>
        <CreateNotificationForm />
      </TRPCProvider>

      <NotificationStream />
    </div>
  );
}
