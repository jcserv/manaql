import { PrismaClient, printing, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { Finish } from "@/graphql/types";

export type CreatePrintingInput = Omit<Prisma.printingCreateInput, "card">;

export class PrintingFactory {
  constructor(private prisma: PrismaClient) {}

  static getDefaults(): Omit<CreatePrintingInput, "card"> {
    return {
      set: faker.string.alpha({ length: 3 }),
      set_name: faker.string.alpha({ length: 10 }),
      collector_number: faker.string.numeric({ length: 3 }),
      image_uri: faker.image.url(),
      finishes: faker.helpers.arrayElements(Object.values(Finish), {
        min: 1,
        max: 3,
      }),
    };
  }

  async create(
    cardId: number,
    input: Partial<Omit<CreatePrintingInput, "card">> = {},
  ): Promise<printing> {
    const data: Prisma.printingCreateInput = {
      ...PrintingFactory.getDefaults(),
      ...input,
      card: {
        connect: { id: cardId },
      },
    };

    return this.prisma.printing.create({
      data,
    });
  }

  async createMany(
    cardId: number,
    count: number,
    input: Partial<Omit<CreatePrintingInput, "card">> = {},
  ): Promise<printing[]> {
    const printings = [];
    for (let i = 0; i < count; i++) {
      printings.push(await this.create(cardId, input));
    }
    return printings;
  }
}
