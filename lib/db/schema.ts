import {
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["admin", "editor"] })
    .notNull()
    .default("admin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const blogs = pgTable("blogs", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  heading: text("heading").notNull(),
  author: text("author").notNull(),
  readTime: text("read_time").notNull(),
});
export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(), // 👈 this is imageUrl in Drizzle, even though it's snake_case in DB
  youtubeUrl: text("youtube_url"), // 👈 this is youtubeUrl in Drizzle
});
export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  whatsappNumber: varchar("whatsapp_number", { length: 15 }).notNull(),
  message: text("message").notNull(),
  city: text("city").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
