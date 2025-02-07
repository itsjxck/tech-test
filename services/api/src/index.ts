import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { getServerByName } from "partyserver";

import { Notifications } from "./durable-objects/notifications";
import { router } from "./routes";
import { createContext } from "./trpc/context";

const api = {
  async fetch(
    request: Request,
    env: CloudflareBindings,
    ctx: ExecutionContext
  ): Promise<Response> {
    if (request.method === "OPTIONS") {
      const response = new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
      });
      return response;
    }

    const path = new URL(request.url).pathname.split("/");

    if (path[1] === "trpc") {
      return fetchRequestHandler({
        endpoint: "/trpc",
        req: request,
        router,
        createContext: (options: FetchCreateContextFnOptions) =>
          createContext({ ...options, env, ctx }),
      });
    }

    if (path[1] === "notifications") {
      const stub = await getServerByName(env.NOTIFICATIONS, "notifications");
      return stub.fetch(request.url, request);
    }

    return new Response("Not found", { status: 404 });
  },
};

export default api;

export { Notifications };
