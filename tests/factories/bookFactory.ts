import { PrismaClient, book, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";

export type CreateBookInput = Omit<Prisma.bookCreateInput, "author">;

export class BookFactory {
  constructor(private prisma: PrismaClient) {}

  static getDefaults(): Omit<CreateBookInput, "author"> {
    return {
      title: faker.commerce.productName(),
    };
  }

  async create(
    authorId: number,
    input: Partial<Omit<CreateBookInput, "author">> = {}
  ): Promise<book> {
    const data: Prisma.bookCreateInput = {
      ...BookFactory.getDefaults(),
      ...input,
      author: {
        connect: { id: authorId },
      },
    };

    return this.prisma.book.create({
      data,
    });
  }

  async createMany(
    authorId: number,
    count: number,
    input: Partial<Omit<CreateBookInput, "author">> = {}
  ): Promise<book[]> {
    const books = [];
    for (let i = 0; i < count; i++) {
      books.push(await this.create(authorId, input));
    }
    return books;
  }
}
