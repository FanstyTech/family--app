import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

// || handles empty string from .env.local; actual queries only run at runtime
const sql = neon(
  process.env.DATABASE_URL || "postgresql://build-placeholder:x@placeholder.neon.tech/db"
)

export const db = drizzle(sql, { schema })
