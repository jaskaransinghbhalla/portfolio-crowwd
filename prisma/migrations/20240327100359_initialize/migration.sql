-- CreateEnum
CREATE TYPE "action_enum" AS ENUM ('Buy', 'Sell');

-- CreateEnum
CREATE TYPE "assetclass_enum" AS ENUM ('Stock', 'Cryptocurrency', 'Commodity', 'ETF');

-- CreateEnum
CREATE TYPE "sector_enum" AS ENUM ('Technology', 'Automotive', 'Finance', 'Commodity', 'ETF');

-- CreateTable
CREATE TABLE "assets" (
    "id" SERIAL NOT NULL,
    "ticker" VARCHAR(255),
    "title" VARCHAR(255),
    "sector" "sector_enum",
    "country" VARCHAR(255),
    "assetclass" "assetclass_enum",

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "assetid" INTEGER NOT NULL,
    "shares" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "action" "action_enum" NOT NULL DEFAULT 'Buy',
    "createdat" TIMESTAMP(6),
    "price" DOUBLE PRECISION,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_assetid_fkey" FOREIGN KEY ("assetid") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
