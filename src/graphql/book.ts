import { BookRef } from "@/graphql/builder";

export const BookNode = BookRef.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    // author: t.field({
    //   type: AuthorRef,
    //   resolve: async (book, _, context) => {
    //     return context.loaders.author.load(book.author_id);
    //   },
    // }),
  }),
});
