import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";

// Enable WebSocket for Cloudflare Workers / Edge Runtime
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  // Fallback or explicit check
  console.warn("DATABASE_URL is not set");
}

const pool = new Pool({ connectionString: databaseUrl || "" });
export const db = drizzle({ client: pool });
