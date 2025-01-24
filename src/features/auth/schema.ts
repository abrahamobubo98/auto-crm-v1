import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const registerSchema = z.object({
    name: z.string().min(1, "Required"),
    email: z.string().trim().email(),
    password: z.string().min(1, "Required"),
    confirmPassword: z.string().min(1, "Required"),
});
