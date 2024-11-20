import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { createPothosSchema } from "@/graphql/schema";
import { Context, createContext } from "@/context";

const graphqlServer = new ApolloServer<Context>({
  schema: createPothosSchema().public,
});

export async function startServer() {
  return startStandaloneServer(graphqlServer, {
    context: createContext,
    listen: { port: 4000 },
  });
}
