-- CreateTable
CREATE TABLE "card" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "printing" (
    "id" SERIAL NOT NULL,
    "card_id" SERIAL NOT NULL,
    "set" VARCHAR(7) NOT NULL,
    "collector_number" VARCHAR(7) NOT NULL,

    CONSTRAINT "printing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "card_name_key" ON "card"("name");

-- AddForeignKey
ALTER TABLE "printing" ADD CONSTRAINT "printing_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
