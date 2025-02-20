import { z } from "zod";

export const TransferSchema = z.object({
    amount: z.number(),
    timestamp: z.string(),
    peerId: z.number(),
    direction: z.string()
});

export type Transfer = z.infer<typeof TransferSchema>
