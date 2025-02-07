"use client";

import { createTRPCReact } from "@trpc/react-query";
import { RouterLike } from "@trpc/react-query/shared";

import type { Router } from "@service/api";

export const trpc = createTRPCReact<Router>();

export type TRPCRouter = RouterLike<Router>;
