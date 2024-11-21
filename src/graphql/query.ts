import { prisma } from "@/db";
import { CardNode } from "@/graphql/card";
import { builder } from "@/graphql/builder";

builder.queryType({
  fields: (t) => ({
    cards: t.field({
      type: [CardNode],
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (parent, args) => {
        return prisma.card.findMany({
          where: {
            id: parseInt(args.id),
          },
        });
      },
    }),
  }),
});
