
import { z } from "zod";

export const checkoutSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    apartment: z.string().optional(),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    postalCode: z.string().min(5, { message: "ZIP code is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    paymentMethod: z.enum(["card", "cod"]),
    cardNumber: z.string().optional(),
    cardName: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
    orderNotes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type { CheckoutFormData };
