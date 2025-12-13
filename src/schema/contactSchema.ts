import z from "zod";

export const contactSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email format"),
  mobile: z.string().nonempty("Mobile number is required"),
  subject: z.string().nonempty("Subject is required"),
  message: z
    .string()
    .min(80, "Message must be at least 80 characters")
    .max(300, "Message cannot exceed 300 characters"),
});
