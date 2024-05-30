import {z} from "zod";

export const registerSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(8),
    email: z
        .string()
        .email("This is not a valid email.")
        /*.refine(async (e) => {
            const emails = await fetchEmails();
            return emails.includes(e);
        }, "This email is not in our database")*/
});

export const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(8),
})