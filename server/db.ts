import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@shared/schema";
import { createLyricsCacheTable } from "./lyrics/index";

// Lazy database connection - only throws when actually used
export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  
  const sql = neon(process.env.DATABASE_URL);
  return drizzle(sql, { schema });
}

// Export a singleton instance for convenience
let _db: ReturnType<typeof getDb> | null = null;
export const db = new Proxy({} as ReturnType<typeof getDb>, {
  get(target, prop) {
    if (!_db) {
      _db = getDb();
    }
    return (_db as any)[prop];
  }
});

// Initialize lyrics cache table on startup
export async function initializeLyricsCache() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    await createLyricsCacheTable(sql);
  } catch (error) {
    console.error('Failed to initialize lyrics cache:', error);
  }
}
