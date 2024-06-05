import {z} from "zod";

export const createToDoSchema = z.object({
    title: z.string().min(3),
    description: z.string(),
    isPublic: z.boolean(),
    deadline: z.date().optional(),
});