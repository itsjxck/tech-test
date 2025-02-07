import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { getDb } from "#db";

// Creates context for all TRPC requests
// This will be shared across all routers
export const createContext = async ({
  req,
  env,
  resHeaders,
}: FetchCreateContextFnOptions & {
  env: CloudflareBindings;
  ctx: ExecutionContext;
}) => {
  // Set CORS headers
  resHeaders.set("Access-Control-Allow-Origin", "*");
  resHeaders.set("Access-Control-Allow-Headers", "*");

  // Setup the database connection
  const db = getDb(env.DB);

  return {
    req,
    env,
    db,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
