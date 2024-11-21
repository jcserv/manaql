import { builder } from "@/graphql/builder";
import { QueryFieldBuilder } from "@/graphql/builderTypes";
import { addCardNode } from "@/graphql/nodes/card";

builder.queryType({
  fields: (t: QueryFieldBuilder) => ({
    cards: addCardNode(t),
  }),
});
