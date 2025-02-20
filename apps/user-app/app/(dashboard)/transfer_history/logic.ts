import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { TransferSchema, Transfer } from "./types";

export async function getIncomingTransfers(): Promise<Transfer[]> {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: Number(session?.user?.id)
        }
    });
    return txns.map(t => TransferSchema.parse({
        amount: t.amount,
        timestamp: t.timestamp,
        peerId: t.fromUserId,
        direction: "In"
    }));
}

export async function getOutgoingTransfers(): Promise<Transfer[]> {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    return txns.map(t => TransferSchema.parse({
        amount: t.amount,
        timestamp: t.timestamp,
        peerId: t.toUserId,
        direction: "Out"
    }));
}

export function mergeAndSortTransfers(incomingTransfers: Transfer[], outgoingTransfers: Transfer[]): Transfer[] {
    return [...incomingTransfers, ...outgoingTransfers].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
}
