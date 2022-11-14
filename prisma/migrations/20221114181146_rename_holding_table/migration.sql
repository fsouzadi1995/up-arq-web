/*
  Warnings:

  - You are about to drop the `Holdings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Holdings";

-- CreateTable
CREATE TABLE "Holding" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Holding_pkey" PRIMARY KEY ("id")
);
