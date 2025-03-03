import express from "express";
import db from "@repo/db/client";
const app = express();
const PORT = 3004;

app.use(express.json());

app.post("/webhook/v1/onRamp", async (req, res) => {
    const paymentInformation: {
        token: string,
        userId: string,
        approved: string
    } = {
        token: req.body.token,
        userId: req.body.userId,
        approved: req.body.approved
    };

    try{
        const amount = await db.axisBank.findFirst({
            where: {
                userId: Number(paymentInformation.userId),
                token: paymentInformation.token,
                status: "Processing",
                direction: "In"
            }
        });

        if (!amount) {
            res.status(404).json({
                message: "No transaction request found"
            });
            return;
        }

        // Balance increases only when the on-ramping is approved by the bank 
        if (paymentInformation.approved.toLowerCase() == "yes"){
            await db.$transaction([
                db.balance.update({
                    where: {
                        userId: Number(paymentInformation.userId)
                    },
                    data: {
                        amount: {
                            increment: amount.amount
                        }
                    }
                }),
                db.axisBank.updateMany({
                    where: {
                        token: paymentInformation.token,
                        userId: Number(paymentInformation.userId),
                        status: "Processing",
                        direction: "In"
                    },
                    data: {
                        status: "Success",
                        processingTime: new Date().toUTCString()
                    }
                })
            ]);
            res.status(201).json({
                message: "On ramping approved"
            });
        }
        else {
            await db.axisBank.updateMany({
                where: {
                    token: paymentInformation.token,
                    userId: Number(paymentInformation.userId),
                    status: "Processing",
                    direction: "In"
                },
                data: {
                    status: "Failure",
                    processingTime: new Date().toUTCString()
                }
            });
            res.status(211).json({
                message: "On ramping not approved"
            })
        }
    }
    catch(e){
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        });
    }
});

app.post("/webhook/v1/offRamp", async (req, res) => {
    const paymentInformation: {
        token: string,
        userId: string
    } = {
        token: req.body.token,
        userId: req.body.userId
    };

    try{
        const request = await db.axisBank.findFirst({
            where: {
                userId: Number(paymentInformation.userId),
                token: paymentInformation.token,
                status: "Processing",
                direction: "Out"
            }
        });

        if (!request) {
            res.status(404).json({
                message: "No transaction request found"
            });
            return;
        }
        
        await db.$transaction(async (tx) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(paymentInformation.userId)} FOR UPDATE`;

            const funds = await tx.balance.findUnique({
                where: {
                    userId: Number(paymentInformation.userId)
                }
            });

            if (!funds || funds.amount < request.amount){
                await tx.axisBank.updateMany({
                    where: {
                        token: paymentInformation.token,
                        userId: Number(paymentInformation.userId),
                        status: "Processing",
                        direction: "Out"
                    },
                    data: {
                        status: "Failure",
                        processingTime: new Date().toUTCString()
                    }
                })
                res.status(401).json({
                    message: "Insufficient funds"
                })
            }
            else{
                await tx.balance.update({
                    where: {
                        userId: Number(paymentInformation.userId)
                    },
                    data: {
                        amount: {
                            decrement: request.amount
                        }
                    }
                }),
                await tx.axisBank.updateMany({
                    where: {
                        token: paymentInformation.token,
                        userId: Number(paymentInformation.userId),
                        status: "Processing",
                        direction: "Out"
                    },
                    data: {
                        status: "Success",
                        processingTime: new Date().toUTCString()
                    }
                })
                res.status(201).json({
                    message: "Off ramping successful"
                });
            }
        })
    }
    catch(e){
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Axis Bank webhook running on port ${PORT}`);
})
