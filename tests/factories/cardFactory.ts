import { PrismaClient, card, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { PrintingFactory, CreatePrintingInput } from "@tests/factories";

type CreateCardInput = Prisma.cardCreateInput;

export class CardFactory {
  constructor(private prisma: PrismaClient) {}

  static getDefaults(): Omit<CreateCardInput, "printing"> {
    return {
      name: faker.person.fullName(),
    };
  }

  async create(input: Partial<CreateCardInput> = {}): Promise<card> {
    const data: CreateCardInput = {
      ...CardFactory.getDefaults(),
      ...input,
    };

    return this.prisma.card.create({
      data,
    });
  }

  async createMany(
    count: number,
    input: Partial<CreateCardInput> = {}
  ): Promise<card[]> {
    const cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(await this.create(input));
    }
    return cards;
  }

  async createWithPrintings(
    printingCount: number = 1,
    cardInput: Partial<Omit<CreateCardInput, "printing">> = {},
    printingInputs: Partial<CreatePrintingInput>[] = []
  ): Promise<card> {
    const defaultPrintingInputs = Array(printingCount)
      .fill(null)
      .map((_, index) => printingInputs[index] || {});

    const data: CreateCardInput = {
      ...CardFactory.getDefaults(),
      ...cardInput,
      printing: {
        create: defaultPrintingInputs.map((printingInput) => ({
          ...PrintingFactory.getDefaults(),
          ...printingInput,
        })),
      },
    };

    return this.prisma.card.create({
      data,
      include: {
        printing: true,
      },
    });
  }
}