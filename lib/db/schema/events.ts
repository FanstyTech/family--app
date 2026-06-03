import {
  pgTable, uuid, text, timestamp
} from "drizzle-orm/pg-core"
import { profiles } from "./users"
import { posts } from "./posts"

export const events = pgTable("events", {
  id:          uuid("id").primaryKey().defaultRandom(),
  title:       text("title").notNull(),
  description: text("description"),
  eventDate:   timestamp("event_date").notNull(),
  location:    text("location"),
  coverImage:  text("cover_image"),
  createdBy:   text("created_by").notNull().references(() => profiles.id),
  postId:      uuid("post_id").references(() => posts.id),
})

export const eventRsvp = pgTable("event_rsvp", {
  eventId: uuid("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
  userId:  text("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  status:  text("status", { enum: ["going", "not_going", "maybe"] }).notNull(),
}, (t) => [{ pk: { columns: [t.eventId, t.userId] } }])
