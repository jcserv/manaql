import { PrismaClient, author, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { BookFactory, CreateBookInput } from "@tests/factories";

type CreateAuthorInput = Prisma.authorCreateInput;

export class AuthorFactory {
  constructor(private prisma: PrismaClient) {}

  static getDefaults(): Omit<CreateAuthorInput, "book"> {
    return {
      name: faker.person.fullName(),
    };
  }

  async create(input: Partial<CreateAuthorInput> = {}): Promise<author> {
    const data: CreateAuthorInput = {
      ...AuthorFactory.getDefaults(),
      ...input,
    };

    return this.prisma.author.create({
      data,
    });
  }

  async createMany(
    count: number,
    input: Partial<CreateAuthorInput> = {}
  ): Promise<author[]> {
    const authors = [];
    for (let i = 0; i < count; i++) {
      authors.push(await this.create(input));
    }
    return authors;
  }

  async createWithBooks(
    bookCount: number = 1,
    authorInput: Partial<Omit<CreateAuthorInput, "book">> = {},
    bookInputs: Partial<CreateBookInput>[] = []
  ): Promise<author> {
    const defaultBookInputs = Array(bookCount)
      .fill(null)
      .map((_, index) => bookInputs[index] || {});

    const data: CreateAuthorInput = {
      ...AuthorFactory.getDefaults(),
      ...authorInput,
      book: {
        create: defaultBookInputs.map((bookInput) => ({
          ...BookFactory.getDefaults(),
          ...bookInput,
        })),
      },
    };

    return this.prisma.author.create({
      data,
      include: {
        book: true,
      },
    });
  }
}