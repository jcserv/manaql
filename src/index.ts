import dotenv from "dotenv";
import { startServer } from "@/server";
import { prisma } from "@/db";

dotenv.config();

startServer()
  .then(() => console.log(`🚀  Server ready at localhost:4000`))
  .catch((e) => {
    console.error(e);
  })
  .finally(() => prisma.$disconnect());
