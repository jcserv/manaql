import { card, Prisma } from "@prisma/client";

import { prisma } from "@/db";
import { builder } from "@/graphql/builder";
import {
  CardFilterRef,
  CardTypeRef,
  QueryFieldBuilder,
} from "@/graphql/builderTypes";
import { GraphQLError } from "graphql";
import { toCardType, FilterOperator, CardFilter } from "@/graphql/types";

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
    printings: t.prismaConnection({
      type: "printing",
      cursor: "id",
      maxSize: 750, // maximum amount of printings that can be returned is 750,
      // since basic lands have the most printings at 650-693
      description: "The printings of a card.",
      resolve: async (query) => {
        return prisma.printing.findMany({
          ...query,
        });
      },
    }),
  }),
});

export function addCardNode(t: QueryFieldBuilder) {
  return t.prismaConnection({
    type: "card",
    cursor: "id",
    maxSize: 100, // maximum amount of cards that can be returned is 100,
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
      if ((args.first ?? 0) + (args.last ?? 0) > 100) {
        throw new GraphQLError("Invalid argument value", {
          extensions: {
            code: "BAD_USER_INPUT",
            detail: "The maximum amount of cards that can be returned is 100",
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

function buildWhereClause(filter: CardFilter | null | undefined) {
  if (!filter) return {};

  const conditions = filter.fields.map((field) => {
    const fieldConditions = filter.query.map((queryValue) => {
      switch (filter.operator) {
        case FilterOperator.eq:
          return {
            [field]: {
              equals: queryValue,
            },
          };
        case FilterOperator.sw:
          return {
            [field]: {
              startsWith: queryValue,
              mode: Prisma.QueryMode.insensitive,
            },
          };
        default:
          return {};
      }
    });

    return fieldConditions.length > 1
      ? { OR: fieldConditions }
      : fieldConditions[0];
  });

  return conditions.length > 1 ? { OR: conditions } : conditions[0];
}
