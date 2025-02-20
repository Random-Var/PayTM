import { z } from "zod";

export const RampingSchema = z.object({
    status: z.string(),
    direction: z.string(),
    amount: z.number(),
    startTime: z.string(),
    processingTime: z.string(),
    provider: z.string()
});

export type Ramping = z.infer<typeof RampingSchema>
