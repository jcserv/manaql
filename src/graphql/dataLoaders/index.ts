import DataLoader from "dataloader";

import { Card, Printing } from "@/__generated__/graphql";
import { prisma } from "@/db";

export const createCardLoader = () => {
  return new DataLoader<number, Card>(async (ids) => {
    const cards = await prisma.card.findMany({
      where: {
        id: {
          in: ids as number[],
        },
      },
    });

    const cardMap = new Map(cards.map((card) => [card.id, card]));
    return ids.map((id) => cardMap.get(id)!);
  });
};

export const createPrintingLoader = () => {
  return new DataLoader<number, Printing>(async (ids) => {
    const printings = await prisma.printing.findMany({
      where: {
        id: {
          in: ids as number[],
        },
      },
    });

    const printingMap = new Map(printings.map((printing) => [printing.id, printing]));
    return ids.map((id) => printingMap.get(id)!);
  });
};

export const createPrintingsByCardLoader = () => {
  return new DataLoader<number, Printing[]>(async (cardIds) => {
    const printings = await prisma.printing.findMany({
      where: {
        card_id: {
          in: cardIds as number[],
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    const printingsByCard = new Map<number, Printing[]>();
    cardIds.forEach((id) => printingsByCard.set(id, []));

    printings.forEach((printing) => {
      const cardPrintings = printingsByCard.get(printing.card_id) || [];
      cardPrintings.push(printing);
      printingsByCard.set(printing.card_id, cardPrintings);
    });

    return cardIds.map((id) => printingsByCard.get(id) || []);
  });
};
