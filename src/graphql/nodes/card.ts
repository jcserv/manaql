import { card, printing } from "@prisma/client";
import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from '@apollo/server/errors';

import { prisma } from "@/db";
import { builder } from "@/graphql/builder";
import {
  CardFilterRef,
  CardTypeRef,
  PrintingFilterRef,
  QueryFieldBuilder,
} from "@/graphql/builderTypes";
import { toCardType } from "@/graphql/types";
import { buildWhereClause, buildWhereClauseWithFilters } from "@/graphql/utils";

const MAX_CARDS = 100;
const MAX_PRINTINGS = 750;

type CardWithPrintings = card & {
  printing?: printing[];
};

builder.prismaNode("card", {
  id: {
    field: "id",
    description: "A unique string identifier for a card, used for pagination.",
  },
  fields: (t) => ({
    cardId: t.exposeID("id", {
      description: "The numeric unique identifier of a card.",
    }),
    name: t.exposeString("name", { description: "The name of a card." }),
    mainType: t.field({
      description: "The primary type of a card; can be used to group cards by type in a decklist.",
      type: CardTypeRef,
      resolve: (parent: card) => toCardType(parent.main_type),
    }),
    printings: t.prismaConnection({
      type: "printing",
      cursor: "id",
      maxSize: MAX_PRINTINGS,
      description: "The printings of a card.",
      args: {
        printingId: t.arg.int({
          required: false,
          description: "The numeric unique identifier of a printing.",
        }),
        filters: t.arg({
          type: [PrintingFilterRef],
          required: false,
        }),
      },
      resolve: async (query, parent: CardWithPrintings, args) => {
        if ((args.first ?? 0) + (args.last ?? 0) > MAX_PRINTINGS) {
          throw new GraphQLError("Invalid argument value", {
            extensions: {
              code: ApolloServerErrorCode.BAD_USER_INPUT,
              detail: `The maximum amount of printings that can be returned is ${MAX_PRINTINGS}`,
            },
          });
        }

        if (parent.printing && !args.printingId && !args.filters) {
          return parent.printing;
        }

        if (args.printingId) {
          const printing = await prisma.printing.findUnique({
            where: {
              id: args.printingId,
              card_id: parent.id,
            },
          });
          return printing ? [printing] : [];
        }

        return prisma.printing.findMany({
          ...query,
          where: {
            card_id: parent.id,
            ...buildWhereClauseWithFilters(args.filters),
          },
        });
      },
    }),
  }),
});

export function addCardNode(t: QueryFieldBuilder) {
  return t.prismaConnection({
    type: "card",
    cursor: "id",
    maxSize: MAX_CARDS,
    args: {
      cardId: t.arg.int({
        required: false,
        description: "The numeric unique identifier of a card.",
      }),
      filter: t.arg({
        type: CardFilterRef,
        required: false,
      }),
    },
    resolve: async (query, _parent, args) => {
      if ((args.first ?? 0) + (args.last ?? 0) > MAX_CARDS) {
        throw new GraphQLError("Invalid argument value", {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            detail: `The maximum amount of cards that can be returned is ${MAX_CARDS}`,
          },
        });
      }

      if (args.cardId) {
        const card = await prisma.card.findUnique({
          where: {
            id: args.cardId,
          },
          include: {
            printing: true,
          },
        });
        return card ? [card] : [];
      }

      const whereClause = buildWhereClause(args.filter);
      
      return prisma.card.findMany({
        ...query,
        where: whereClause,
        include: {
          printing: {
            take: MAX_PRINTINGS,
          },
        },
      });
    },
  });
}