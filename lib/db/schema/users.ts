import {
  pgTable, uuid, text, timestamp
} from "drizzle-orm/pg-core"
import { user } from "./auth"
import { familyMembers } from "./family"

export const profiles = pgTable("profiles", {
  id:             text("id").primaryKey().references(() => user.id, { onDelete: "cascade" }),
  fullName:       text("full_name").notNull().default(""),
  avatarUrl:      text("avatar_url"),
  role:           text("role", { enum: ["admin", "member", "viewer"] }).notNull().default("member"),
  familyMemberId: uuid("family_member_id").references(() => familyMembers.id),
  joinedAt:       timestamp("joined_at").notNull().defaultNow(),
})
