import DataLoader from "dataloader";

import { Author, Book } from "@/__generated__/graphql";
import { prisma } from "@/db";

export const createAuthorLoader = () => {
  return new DataLoader<number, Author>(async (ids) => {
    const authors = await prisma.author.findMany({
      where: {
        id: {
          in: ids as number[],
        },
      },
    });

    const authorMap = new Map(authors.map((author) => [author.id, author]));
    return ids.map((id) => authorMap.get(id)!);
  });
};

export const createBookLoader = () => {
  return new DataLoader<number, Book>(async (ids) => {
    const books = await prisma.book.findMany({
      where: {
        id: {
          in: ids as number[],
        },
      },
    });

    const bookMap = new Map(books.map((book) => [book.id, book]));
    return ids.map((id) => bookMap.get(id)!);
  });
};

export const createBooksByAuthorLoader = () => {
  return new DataLoader<number, Book[]>(async (authorIds) => {
    const books = await prisma.book.findMany({
      where: {
        author_id: {
          in: authorIds as number[],
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    const booksByAuthor = new Map<number, Book[]>();
    authorIds.forEach((id) => booksByAuthor.set(id, []));

    books.forEach((book) => {
      const authorBooks = booksByAuthor.get(book.author_id) || [];
      authorBooks.push(book);
      booksByAuthor.set(book.author_id, authorBooks);
    });

    return authorIds.map((id) => booksByAuthor.get(id) || []);
  });
};
