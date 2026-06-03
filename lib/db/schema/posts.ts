import {
  pgTable, uuid, text, boolean, timestamp, integer
} from "drizzle-orm/pg-core"
import { profiles } from "./users"

export const posts = pgTable("posts", {
  id:        uuid("id").primaryKey().defaultRandom(),
  authorId:  text("author_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  content:   text("content"),
  type:      text("type", { enum: ["photo", "event", "text"] }).notNull().default("text"),
  isPrivate: boolean("is_private").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const postMedia = pgTable("post_media", {
  id:          uuid("id").primaryKey().defaultRandom(),
  postId:      uuid("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  cfImageId:   text("cf_image_id").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  mediumUrl:   text("medium_url"),
  fullUrl:     text("full_url"),
  orderIndex:  integer("order_index").notNull().default(0),
})
