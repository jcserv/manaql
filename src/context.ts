import { prisma } from "@/db";
import {
  createCardLoader,
  createPrintingLoader,
  createPrintingsByCardLoader,
} from "@/graphql/dataLoaders";

export interface Context {
  prisma: typeof prisma;
  loaders: {
    printing: ReturnType<typeof createPrintingLoader>;
    card: ReturnType<typeof createCardLoader>;
    printingsByCard: ReturnType<typeof createPrintingsByCardLoader>;
  };
}

export async function createContext(): Promise<Context> {
  return {
    prisma,
    loaders: {
      printing: createPrintingLoader(),
      card: createCardLoader(),
      printingsByCard: createPrintingsByCardLoader(),
    },
  };
}
