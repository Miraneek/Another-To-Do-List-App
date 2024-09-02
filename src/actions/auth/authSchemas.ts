import {z} from "zod";

export const registerSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
    email: z
        .string()
        .email("This is not a valid email."),
    lang: z.string().refine(
        (value) => value === "cz" || value === "en",
        {
            message: "Language must be either cz or en"
        }
    ),
});

export const nothingSchema = z.any();
