import { builder } from "@/graphql/builder";

// Imports to ensure types are defined
import "@/graphql/author";
import "@/graphql/book";
import "@/graphql/query";

export function createPothosSchema() {
  return {
    public: builder.toSchema({}),
  };
}
