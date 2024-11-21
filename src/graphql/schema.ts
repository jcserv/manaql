import { builder } from "@/graphql/builder";

// Imports to ensure types are defined
import "@/graphql/nodes/card";
import "@/graphql/nodes/printing";
import "@/graphql/query";

export function createPothosSchema() {
  return {
    public: builder.toSchema({}),
  };
}
