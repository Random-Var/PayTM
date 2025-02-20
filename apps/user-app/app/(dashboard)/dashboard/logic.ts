import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { MoneyStatsSchema, MoneyStats, UserDetailsSchema, UserDetails } from "./types";


export async function getMoneyStats(): Promise<MoneyStats> {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id){
        return MoneyStatsSchema.parse({
            currentBalance: 0,
            totalOnramped: 0,
            totalOfframped: 0,
            totalReceived: 0,
            totalSent: 0
        });
    }

    const userId = Number(session.user.id);

    // Current balance
    const balance = await prisma.balance.findFirst({
        where: { userId }
    });

    // Total onramped money
    const totalOnrampedHDFC = await prisma.hDFCBank.aggregate({
        where: { userId, direction: "In", status: "Success" },
        _sum: { amount: true }
    });

    const totalOnrampedAxis = await prisma.axisBank.aggregate({
        where: { userId, direction: "In", status: "Success" },
        _sum: { amount: true }
    });

    // Total offramped money
    const totalOfframpedHDFC = await prisma.hDFCBank.aggregate({
        where: { userId, direction: "Out", status: "Success" },
        _sum: { amount: true }
    });

    const totalOfframpedAxis = await prisma.axisBank.aggregate({
        where: { userId, direction: "Out", status: "Success" },
        _sum: { amount: true }
    });

    // Total money received
    const totalReceived = await prisma.p2pTransfer.aggregate({
        where: { toUserId: userId },
        _sum: { amount: true }
    });

    // Total money sent
    const totalSent = await prisma.p2pTransfer.aggregate({
        where: { fromUserId: userId },
        _sum: { amount: true }
    });

    return MoneyStatsSchema.parse({
        currentBalance: balance?.amount || 0,
        totalOnramped: (totalOnrampedHDFC._sum.amount || 0) + (totalOnrampedAxis._sum.amount || 0),
        totalOfframped: (totalOfframpedHDFC._sum.amount || 0) + (totalOfframpedAxis._sum.amount || 0),
        totalReceived: totalReceived._sum.amount || 0,
        totalSent: totalSent._sum.amount || 0
    });
}


export async function getUserDetails(): Promise<UserDetails> {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id){
        return UserDetailsSchema.parse({
            number: "0000000000",
            name: "ABCDE12345",
            email: "abcde@xyz.com"
        })
    }

    const userId = Number(session?.user?.id);
    const user = await prisma.user.findFirst({
        where: { id: userId }
    });

    return UserDetailsSchema.parse({
        number: user?.number || "0000000000",
        name: user?.name || "ABCDE12345",
        email: user?.email || "abcde@xyz.com"
    })
}
