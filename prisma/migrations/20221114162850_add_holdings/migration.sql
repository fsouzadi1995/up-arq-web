/*
  Warnings:

  - You are about to drop the `_CurrencyToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CurrencyToUser" DROP CONSTRAINT "_CurrencyToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CurrencyToUser" DROP CONSTRAINT "_CurrencyToUser_B_fkey";

-- DropTable
DROP TABLE "_CurrencyToUser";

-- CreateTable
CREATE TABLE "Holdings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Holdings_pkey" PRIMARY KEY ("id")
);
