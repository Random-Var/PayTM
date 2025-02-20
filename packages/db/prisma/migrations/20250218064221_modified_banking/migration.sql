/*
  Warnings:

  - You are about to drop the column `locked` on the `Balance` table. All the data in the column will be lost.
  - You are about to drop the `Merchant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OnRampTransaction` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Direction" AS ENUM ('In', 'Out');

-- DropForeignKey
ALTER TABLE "OnRampTransaction" DROP CONSTRAINT "OnRampTransaction_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "locked";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT '';

-- AlterTable
ALTER TABLE "p2pTransfer" ALTER COLUMN "timestamp" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Merchant";

-- DropTable
DROP TABLE "OnRampTransaction";

-- DropEnum
DROP TYPE "AuthType";

-- CreateTable
CREATE TABLE "HDFCBank" (
    "id" SERIAL NOT NULL,
    "status" "OnRampStatus" NOT NULL,
    "token" TEXT NOT NULL,
    "direction" "Direction" NOT NULL,
    "amount" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "processingTime" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "HDFCBank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AxisBank" (
    "id" SERIAL NOT NULL,
    "status" "OnRampStatus" NOT NULL,
    "token" TEXT NOT NULL,
    "direction" "Direction" NOT NULL,
    "amount" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "processingTime" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AxisBank_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HDFCBank" ADD CONSTRAINT "HDFCBank_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AxisBank" ADD CONSTRAINT "AxisBank_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
