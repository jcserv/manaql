import { Printing } from "@/__generated__/graphql";
import { PrintingNode } from "@/graphql/printing";
import { CardRef } from "@/graphql/builder";
import { compare } from "@/utils";

export const CardNode = CardRef.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    printings: t.connection({
      type: PrintingNode,
      resolve: async (parent, args, context) => {
        const allPrintings = await context.loaders.printingsByCard.load(
          parseInt(parent.id as string),
        );

        const sortedPrintings = [...allPrintings].sort((a, b) => compare(a.id, b.id));

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
