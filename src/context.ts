import { prisma } from "@/db";
import {
  createAuthorLoader,
  createBookLoader,
  createBooksByAuthorLoader,
} from "@/graphql/dataLoaders";

export interface Context {
  prisma: typeof prisma;
  loaders: {
    book: ReturnType<typeof createBookLoader>;
    author: ReturnType<typeof createAuthorLoader>;
    booksByAuthor: ReturnType<typeof createBooksByAuthorLoader>;
  };
}

export async function createContext(): Promise<Context> {
  return {
    prisma,
    loaders: {
      book: createBookLoader(),
      author: createAuthorLoader(),
      booksByAuthor: createBooksByAuthorLoader(),
    },
  };
}
