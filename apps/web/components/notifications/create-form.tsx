"use client";

import { useState, useTransition } from "react";

import { trpc } from "~/lib/trpc/client";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export function CreateNotificationForm() {
  const [isPending, startTransition] = useTransition();
  const [type, setType] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  const { mutateAsync } = trpc.notifications.createNotification.useMutation({
    onSuccess: () => {
      setTitle(null);
    },
  });

  const onSubmit = () => {
    if (!type || !title) {
      return;
    }

    startTransition(async () => {
      try {
        await mutateAsync({
          type,
          title,
        });
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      <h1 className="p-2 font-geist-mono text-xl">Notification Form</h1>
      <div className="flex h-full w-full flex-col justify-center p-8">
        <Card>
          <CardHeader>
            <CardTitle>Publish Notification</CardTitle>
            <CardDescription>Publish a new notification.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex w-full flex-col gap-1">
              <Label htmlFor="type">Type</Label>
              <Select onValueChange={setType}>
                <SelectTrigger value={type ?? ""}>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="announcement">Announcement</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-full flex-col gap-1">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                className="input"
                placeholder="Notification Title"
                value={title ?? ""}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              onClick={onSubmit}
              disabled={isPending || !type || !title}
            >
              {isPending ? "Loading..." : "Publish"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
