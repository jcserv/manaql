import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { createPothosSchema } from "@/graphql/schema";
import { Context, createContext } from "@/context";
import "@/instrument";
import { createSentryPlugin } from "@/instrument";

const graphqlServer = new ApolloServer<Context>({
  schema: createPothosSchema().public,
  csrfPrevention: true,
  plugins: [
    createSentryPlugin({
      serviceName: "manaql",
      includeRawQuery: true,
      includeRequestVariables: true,
      captureAllErrors: false,
      excludedCodes: [
        "BAD_USER_INPUT",
        "GRAPHQL_PARSE_FAILED",
        "GRAPHQL_VALIDATION_FAILED",
      ],
    }),
  ],
});

export async function startServer() {
  return startStandaloneServer(graphqlServer, {
    context: createContext,
    listen: { port: 4000 },
  });
}
