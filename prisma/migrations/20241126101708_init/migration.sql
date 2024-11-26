-- CreateEnum
CREATE TYPE "cardtype" AS ENUM ('Battle', 'Planeswalker', 'Creature', 'Sorcery', 'Instant', 'Artifact', 'Enchantment', 'Land', 'Kindred', 'Conspiracy', 'Dungeon', 'Phenomenon', 'Plane', 'Scheme', 'Vanguard', 'Unknown');

-- CreateEnum
CREATE TYPE "finish" AS ENUM ('nonfoil', 'foil', 'etched');

-- CreateTable
CREATE TABLE "card" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "main_type" VARCHAR(31) NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "printing" (
    "id" SERIAL NOT NULL,
    "set" VARCHAR(7) NOT NULL,
    "set_name" VARCHAR(255) NOT NULL,
    "collector_number" VARCHAR(31) NOT NULL,
    "image_uri" VARCHAR(255) NOT NULL,
    "back_image_uri" VARCHAR(255),
    "finishes" VARCHAR(7)[],
    "price_usd" DECIMAL(10,2),
    "price_usd_foil" DECIMAL(10,2),
    "price_usd_etched" DECIMAL(10,2),
    "price_eur" DECIMAL(10,2),
    "price_eur_foil" DECIMAL(10,2),
    "price_eur_etched" DECIMAL(10,2),
    "card_id" INTEGER NOT NULL,

    CONSTRAINT "printing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "card_name_key" ON "card"("name");

-- CreateIndex
CREATE INDEX "card_name_d92f5e8d_like" ON "card"("name");

-- CreateIndex
CREATE INDEX "printing_card_id_id_38c707ed" ON "printing"("card_id");

-- AddForeignKey
ALTER TABLE "printing" ADD CONSTRAINT "printing_card_id_28791452_fk_card_id" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
