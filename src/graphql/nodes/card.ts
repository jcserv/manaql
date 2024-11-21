import { Prisma } from "@prisma/client";

import { Printing } from "@/__generated__/graphql";
import { PrintingNode } from "@/graphql/nodes/printing";
import { CardFilterRef, CardRef, QueryFieldBuilder } from "@/graphql/builder";
import { compare } from "@/utils";
import { prisma } from "@/db";
import { CardFilter, FilterOperator } from "@/graphql/types/filter";

const CardNode = CardRef.implement({
  description:
    "A card is the standard component of Magic: The Gathering and one of its resources.",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    printings: t.connection({
      type: PrintingNode,
      resolve: async (parent, args, context) => {
        const allPrintings = await context.loaders.printingsByCard.load(
          parseInt(parent.id as string),
        );

        const sortedPrintings = [...allPrintings].sort((a, b) =>
          compare(a.id, b.id),
        );

        const take = args.first ?? 10;

        let startIndex = 0;
        if (args.after) {
          const cursorIndex = sortedPrintings.findIndex(
            (printing) => printing.id === parseInt(args.after ?? ""),
          );
          startIndex = cursorIndex + 1;
        }

        const paginatedPrintings = sortedPrintings.slice(
          startIndex,
          startIndex + take + 1,
        );

        const hasNextPage = paginatedPrintings.length > take;
        const nodes = hasNextPage
          ? paginatedPrintings.slice(0, -1)
          : paginatedPrintings;

        const edges = nodes.map((node) => ({
          cursor: node.id?.toString(),
          node,
        })) as Array<{
          cursor: string;
          node: Printing;
        }>;

        return {
          edges,
          pageInfo: {
            hasNextPage,
            hasPreviousPage: !!args.after,
            startCursor: edges[0]?.cursor ?? null,
            endCursor: edges[edges.length - 1]?.cursor ?? null,
          },
        };
      },
    }),
  }),
});

export function addCardNode(t: QueryFieldBuilder) {
  return t.field({
    type: [CardNode],
    args: {
      id: t.arg.int({ required: false }),
      filter: t.arg({
        type: CardFilterRef,
        required: false,
      }),
      first: t.arg.int({ required: true }),
    },
    resolve: async (parent, args) => {
      return prisma.card.findMany({
        where: {
          ...(args.id ? { id: args.id } : {}),
          ...buildWhereClause(args.filter),
        },
        take: args.first,
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
