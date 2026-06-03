import {
  pgTable, uuid, text, date, integer, primaryKey
} from "drizzle-orm/pg-core"
import { user } from "./auth"

export const familyMembers = pgTable("family_members", {
  id:        uuid("id").primaryKey().defaultRandom(),
  fullName:  text("full_name").notNull(),
  birthDate: date("birth_date"),
  deathDate: date("death_date"),
  gender:    text("gender", { enum: ["male", "female"] }),
  bio:       text("bio"),
  avatarUrl: text("avatar_url"),
  userId:    text("user_id").references(() => user.id),
})

// Closure Table — أكفأ بنية للشجرة عند الاستعلام
export const familyTree = pgTable("family_tree", {
  ancestor:   uuid("ancestor").notNull().references(() => familyMembers.id, { onDelete: "cascade" }),
  descendant: uuid("descendant").notNull().references(() => familyMembers.id, { onDelete: "cascade" }),
  depth:      integer("depth").notNull(),
}, (t) => [primaryKey({ columns: [t.ancestor, t.descendant] })])

export const marriages = pgTable("marriages", {
  id:           uuid("id").primaryKey().defaultRandom(),
  person1Id:    uuid("person1_id").notNull().references(() => familyMembers.id),
  person2Id:    uuid("person2_id").notNull().references(() => familyMembers.id),
  marriageDate: date("marriage_date"),
  divorceDate:  date("divorce_date"),
})
