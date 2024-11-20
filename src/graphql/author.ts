import { Book } from "@/__generated__/graphql";
import { BookNode } from "@/graphql/book";
import { AuthorRef } from "@/graphql/builder";
import { compare } from "@/utils";

export const AuthorNode = AuthorRef.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    books: t.connection({
      type: BookNode,
      resolve: async (parent, args, context) => {
        const allBooks = await context.loaders.booksByAuthor.load(
          parseInt(parent.id as string),
        );

        const sortedBooks = [...allBooks].sort((a, b) => compare(a.id, b.id));

        const take = args.first ?? 10;

        let startIndex = 0;
        if (args.after) {
          const cursorIndex = sortedBooks.findIndex(
            (book) => book.id === parseInt(args.after ?? ""),
          );
          startIndex = cursorIndex + 1;
        }

        const paginatedBooks = sortedBooks.slice(
          startIndex,
          startIndex + take + 1,
        );

        const hasNextPage = paginatedBooks.length > take;
        const nodes = hasNextPage
          ? paginatedBooks.slice(0, -1)
          : paginatedBooks;

        const edges = nodes.map((node) => ({
          cursor: node.id?.toString(),
          node,
        })) as Array<{
          cursor: string;
          node: Book;
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
