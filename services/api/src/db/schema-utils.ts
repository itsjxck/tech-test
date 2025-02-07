import { text } from "drizzle-orm/sqlite-core";

export const generateUUID = () => crypto.randomUUID();

export const uuid = (name?: string) => text(name).$defaultFn(generateUUID);
