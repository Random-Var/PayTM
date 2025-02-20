import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { RampingSchema, Ramping } from "./types";

export async function getHDFCBankRampings(): Promise<Ramping[]> {
    const session = await getServerSession(authOptions);
    const txns = await prisma.hDFCBank.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => RampingSchema.parse({
        status: t.status,
        direction: t.direction,
        amount: t.amount,
        startTime: t.startTime,
        processingTime: t.processingTime,
        provider: "HDFCBank"
    }));
}

export async function getAxisBankRampings(): Promise<Ramping[]> {
    const session = await getServerSession(authOptions);
    const txns = await prisma.axisBank.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => RampingSchema.parse({
        status: t.status,
        direction: t.direction,
        amount: t.amount,
        startTime: t.startTime,
        processingTime: t.processingTime,
        provider: "AxisBank"
    }));
}

export function mergeAndSortRampings(hdfcRampings: Ramping[], axisRampings: Ramping[]): Ramping[] {
    return [...hdfcRampings, ...axisRampings].sort((a, b) => 
        new Date(a.processingTime).getTime() - new Date(b.processingTime).getTime()
    );
}
