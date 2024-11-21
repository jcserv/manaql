import { builder } from "@/graphql/builder";

// Imports to ensure types are defined
import "@/graphql/card";
import "@/graphql/printing";
import "@/graphql/query";

export function createPothosSchema() {
  return {
    public: builder.toSchema({}),
  };
}
