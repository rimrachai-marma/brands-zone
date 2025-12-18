import {createEnv} from "@t3-oss/env-nextjs";
import {z} from "zod";

export const clientEnv = createEnv({
    client: {
        NEXT_PUBLIC_BASE_URL: z.url(),
        NEXT_PUBLIC_API_BASE_URL: z.url(),
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1)
    },


    experimental__runtimeEnv: {
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    },
});
