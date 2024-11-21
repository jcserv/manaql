import { builder, QueryFieldBuilder } from "@/graphql/builder";
import { addCardNode } from "@/graphql/nodes/card";

builder.queryType({
  fields: (t: QueryFieldBuilder) => ({
    cards: addCardNode(t),
  }),
});
