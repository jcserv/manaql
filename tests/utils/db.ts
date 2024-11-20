import { PrismaClient } from "@prisma/client";

export async function cleanupDatabase(prisma: PrismaClient) {
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
}