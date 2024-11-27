import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import "@/instrument";
import { Context, createContext } from "@/context";
import { createPothosSchema } from "@/graphql/schema";
import { createSentryPlugin } from "@/instrument";
import { excludedCodes } from "@/graphql/types";

const graphqlServer = new ApolloServer<Context>({
  schema: createPothosSchema().public,
  csrfPrevention: true,
  plugins: [
    createSentryPlugin({
      serviceName: "manaql",
      includeRawQuery: true,
      includeRequestVariables: true,
      captureAllErrors: false,
      excludedCodes,
    }),
  ],
});

export async function startServer() {
  return startStandaloneServer(graphqlServer, {
    context: createContext,
    listen: { port: 4000 },
  });
}
