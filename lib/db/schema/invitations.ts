import {
  pgTable, uuid, text, timestamp
} from "drizzle-orm/pg-core"
import { profiles } from "./users"

export const invitations = pgTable("invitations", {
  id:        uuid("id").primaryKey().defaultRandom(),
  token:     text("token").unique().notNull(),
  email:     text("email"),
  role:      text("role", { enum: ["admin", "member", "viewer"] }).notNull().default("member"),
  createdBy: text("created_by").notNull().references(() => profiles.id),
  usedAt:    timestamp("used_at"),
  expiresAt: timestamp("expires_at").notNull(),
})
