import { z } from "zod";

export const MoneyStatsSchema = z.object({
    currentBalance: z.number(),
    totalOnramped: z.number(),
    totalOfframped: z.number(),
    totalReceived: z.number(),
    totalSent: z.number()
});

export type MoneyStats = z.infer<typeof MoneyStatsSchema>

export const UserDetailsSchema = z.object({
    email: z.string(),
    name: z.string(),
    number: z.string()
});

export type UserDetails = z.infer<typeof UserDetailsSchema>
