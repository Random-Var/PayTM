"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { TokenGenerator } from "../utils/TokenGenerator";

export async function createAXISOnRampTransaction(amount: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = TokenGenerator();

    try{
        await prisma.hDFCBank.create({
            data: {
                status: "Processing",
                startTime: new Date().toUTCString(),
                processingTime: new Date().toUTCString(),
                token: token,
                amount: amount,
                direction: "In",
                userId: Number(session?.user?.id)
            }
        });
        return {
            message: "Created OnRamp Entry"
        }
    }
    catch(e){
        return {
            message: "Couldn't Create OnRamp Entry"
        }
    }
}

export async function createAXISOffRampTransaction(amount: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = TokenGenerator();
    
    try{
        await prisma.hDFCBank.create({
            data: {
                status: "Processing",
                startTime: new Date().toUTCString(),
                processingTime: new Date().toUTCString(),
                token: token,
                amount: amount,
                direction: "Out",
                userId: Number(session?.user?.id)
            }
        });
        return {
            message: "Created OffRamp Entry"
        }
    }
    catch(e){
        return {
            message: "Couldn't Create OnRamp Entry"
        }
    }
}
