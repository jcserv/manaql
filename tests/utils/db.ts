import { PrismaClient } from "@prisma/client";

export async function cleanupDatabase(prisma: PrismaClient) {
  await prisma.printing.deleteMany();
  await prisma.card.deleteMany();
}
