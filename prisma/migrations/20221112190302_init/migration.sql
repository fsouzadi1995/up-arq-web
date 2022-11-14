-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CurrencyToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CurrencyToUser_AB_unique" ON "_CurrencyToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CurrencyToUser_B_index" ON "_CurrencyToUser"("B");

-- AddForeignKey
ALTER TABLE "_CurrencyToUser" ADD CONSTRAINT "_CurrencyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurrencyToUser" ADD CONSTRAINT "_CurrencyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
