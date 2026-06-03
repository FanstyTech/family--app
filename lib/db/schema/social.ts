import {
  pgTable, uuid, text, boolean, timestamp, primaryKey
} from "drizzle-orm/pg-core"
import { profiles } from "./users"
import { posts } from "./posts"

export const comments = pgTable("comments", {
  id:        uuid("id").primaryKey().defaultRandom(),
  postId:    uuid("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  authorId:  text("author_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  content:   text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const likes = pgTable("likes", {
  postId: uuid("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
}, (t) => [primaryKey({ columns: [t.postId, t.userId] })])

export const notifications = pgTable("notifications", {
  id:        uuid("id").primaryKey().defaultRandom(),
  userId:    text("user_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  type:      text("type").notNull(),
  data:      text("data"),
  read:      boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})
