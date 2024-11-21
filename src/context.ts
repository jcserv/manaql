import {
  createCardLoader,
  createPrintingLoader,
  createPrintingsByCardLoader,
} from "@/graphql/dataLoaders";

export interface Context {
  loaders: {
    printing: ReturnType<typeof createPrintingLoader>;
    card: ReturnType<typeof createCardLoader>;
    printingsByCard: ReturnType<typeof createPrintingsByCardLoader>;
  };
}

export async function createContext(): Promise<Context> {
  return {
    loaders: {
      printing: createPrintingLoader(),
      card: createCardLoader(),
      printingsByCard: createPrintingsByCardLoader(),
    },
  };
}
