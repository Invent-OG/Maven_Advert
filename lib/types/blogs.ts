import { z } from "zod";

export const blogSchema = z.object({
  id: z.string().uuid(), // optional since it's auto-generated
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  createdAt: z.date(), // handled by defaultNow()
  heading: z.string().min(1, "Heading is required"),
  author: z.string().min(1, "Author is required"),
  readTime: z.string().min(1, "Read time is required"),
});

// ✅ Use this for blog creation input (e.g., in POST API)
export const createBlogSchema = blogSchema.omit({
  id: true,
  createdAt: true,
});
