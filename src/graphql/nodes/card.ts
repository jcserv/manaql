import { card } from "@prisma/client";
import { GraphQLError } from "graphql";

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
import { ApolloServerErrorCode } from '@apollo/server/errors';

const MAX_CARDS = 100;
const MAX_PRINTINGS = 750;

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
      description:
        "The primary type of a card; can be used to group cards by type in a decklist.",
      type: CardTypeRef,
      resolve: (parent: card) => toCardType(parent.main_type),
    }),
    printings: t.prismaConnection({ // TODO: move this to printing.ts, couldn't figure out the types
      type: "printing",
      cursor: "id",
      maxSize: 750, // maximum amount of printings that can be returned is 750,
      // since basic lands have the most printings at 650-693
      description: "The printings of a card.",
      args: {
        // first, last, before, after are automatically added by Relay
        printingId: t.arg.int({
          required: false,
          description: "The numeric unique identifier of a printing.",
        }),
        filters: t.arg({
          type: [PrintingFilterRef],
          required: false,
        }),
      },
      resolve: async (query, _parent, args) => {
        if ((args.first ?? 0) + (args.last ?? 0) > MAX_PRINTINGS) {
          throw new GraphQLError("Invalid argument value", {
            extensions: {
              code: ApolloServerErrorCode.BAD_USER_INPUT,
              detail: `The maximum amount of printings that can be returned is ${MAX_PRINTINGS}`,
            },
          });
        }

        if (args.printingId) {
          const printing = await prisma.printing.findUnique({
            where: {
              id: args.printingId,
            },
          });
          return printing ? [printing] : [];
        }

        return prisma.printing.findMany({
          ...query,
          where: {
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
    maxSize: MAX_CARDS, // maximum amount of cards that can be returned is 100,
    // based on the number of unique cards in a commander deck
    args: {
      // first, last, before, after are automatically added by Relay
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
        });
        return card ? [card] : [];
      }
      return prisma.card.findMany({
        ...query,
        where: {
          ...buildWhereClause(args.filter),
        },
      });
    },
  });
}
