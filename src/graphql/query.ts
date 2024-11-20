import { prisma } from "@/db";
import { AuthorNode } from "@/graphql/author";
import { builder } from "@/graphql/builder";
import { BookNode } from "@/graphql/book";

builder.queryType({
  fields: (t) => ({
    authors: t.field({
      type: [AuthorNode],
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (parent, args) => {
        return prisma.author.findMany({
          where: {
            id: parseInt(args.id),
          },
        });
      },
    }),
    books: t.field({
      type: [BookNode],
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (parent, args) => {
        return prisma.book.findMany({
          where: {
            id: parseInt(args.id),
          },
        });
      },
    }),
  }),
});
