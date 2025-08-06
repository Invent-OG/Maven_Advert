import { z } from "zod";

export const testimonialSchema = z.object({
  id: z.string().uuid().optional(), // optional because DB auto-generates it
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().url("Invalid image URL"),
  youtubeUrl: z.string().url("Invalid YouTube URL").optional(), // optional field
});
