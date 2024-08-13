// lib/server/db/db-client.ts

import { drizzle } from "drizzle-orm/d1";

export const dbClient = (db: D1Database | undefined) => {
    if (!db) {
        return undefined;
    }
    return drizzle(db);
};
