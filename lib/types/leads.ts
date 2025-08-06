import { z } from "zod";

export const leadSchema = z.object({
  id: z.string().uuid().optional(), // optional since it's generated
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  message:z.string().min(100),
  whatsappNumber: z
    .string()
    .min(8, "WhatsApp number is too short")
    .max(15, "WhatsApp number is too long"),
  city: z.string().min(1, "City is required"),
  createdAt: z.date().optional(), // handled by defaultNow()
});
