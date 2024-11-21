/*
  Warnings:

  - Added the required column `main_type` to the `card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_uri` to the `printing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `set_name` to the `printing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "cardtype" AS ENUM ('Battle', 'Planeswalker', 'Creature', 'Sorcery', 'Instant', 'Artifact', 'Enchantment', 'Land', 'Kindred', 'Conspiracy', 'Dungeon', 'Phenomenon', 'Plane', 'Scheme', 'Vanguard');

-- CreateEnum
CREATE TYPE "finish" AS ENUM ('nonfoil', 'foil', 'etched');

-- AlterTable
ALTER TABLE "card" ADD COLUMN     "main_type" "cardtype" NOT NULL;

-- AlterTable
ALTER TABLE "printing" ADD COLUMN     "back_image_uri" VARCHAR(255),
ADD COLUMN     "finishes" "finish"[],
ADD COLUMN     "image_uri" VARCHAR(255) NOT NULL,
ADD COLUMN     "price_eur" DECIMAL(10,2),
ADD COLUMN     "price_eur_etched" DECIMAL(10,2),
ADD COLUMN     "price_eur_foil" DECIMAL(10,2),
ADD COLUMN     "price_usd" DECIMAL(10,2),
ADD COLUMN     "price_usd_etched" DECIMAL(10,2),
ADD COLUMN     "price_usd_foil" DECIMAL(10,2),
ADD COLUMN     "set_name" VARCHAR(255) NOT NULL;
