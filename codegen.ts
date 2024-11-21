import type { CodegenConfig } from "@graphql-codegen/cli";
import { createPothosSchema } from "@/graphql/schema";
import { printSchema } from "graphql";

const config: CodegenConfig = {
  overwrite: true,
  schema: printSchema(createPothosSchema().public),
  config: {
    transformUnderscore: false,
    namingConvention: 'keep',
  },
  generates: {
    "src/__generated__/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-document-nodes",
      ],
      config: {
        scalars: {
          ID: {
            input: "number",
            output: "string | number",
          },
        },
      },
    },
  },
};

export default config;
