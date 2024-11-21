import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { DocumentNode, print, GraphQLError } from "graphql";
import { ClientError, GraphQLClient } from "graphql-request";
import { PrismaClient } from "@prisma/client";

import { createPothosSchema } from "@/graphql/schema";
import { Context } from "@/context";
import {
  createCardLoader,
  createPrintingLoader,
  createPrintingsByCardLoader,
} from "@/graphql/dataLoaders";
import { GraphQLResponse } from "@tests/graphql/types";

export class TestContext {
  public db: PrismaClient;
  public server: ApolloServer<Context>;
  private context: Context;
  static client: GraphQLClient;

  constructor() {
    this.db = new PrismaClient({
      datasourceUrl: process.env.TEST_DATABASE_URL,
    });
    this.context = {
      prisma: this.db,
      loaders: {
        printing: createPrintingLoader(),
        card: createCardLoader(),
        printingsByCard: createPrintingsByCardLoader(),
      },
    };

    this.server = new ApolloServer<Context>({
      schema: createPothosSchema().public,
    });
  }

  async init() {
    const port = Math.floor(Math.random() * (65535 - 1024) + 1024);

    const { url } = await startStandaloneServer(this.server, {
      context: async () => this.context,
      listen: { port }, // Random available port
    });

    TestContext.client = new GraphQLClient(url);
  }

  async query<TData>(
    query: string | DocumentNode,
    variables?: Record<string, unknown>,
    contextOverrides: Partial<Context> = {},
  ): Promise<GraphQLResponse<TData>> {
    try {
      if (Object.keys(contextOverrides).length > 0) {
        this.context = {
          ...this.context,
          ...contextOverrides,
          loaders: {
            printing: createPrintingLoader(),
            card: createCardLoader(),
            printingsByCard: createPrintingsByCardLoader(),
          },
        };
      }

      const queryString = typeof query === "string" ? query : print(query);
      const data = await TestContext.client.request<TData>(
        queryString,
        variables,
      );

      return {
        success: true,
        data,
      };
    } catch (error: unknown) {
      if (error instanceof ClientError) {
        return {
          success: false,
          errors: [new GraphQLError(error.message, { originalError: error })],
        };
      }
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return {
        success: false,
        errors: [new GraphQLError(errorMessage)],
      };
    }
  }

  async cleanup(): Promise<void> {
    await this.server.stop();
    await this.db.$disconnect();
  }

  static async create(): Promise<TestContext> {
    const context = new TestContext();
    await context.init();
    return context;
  }
}
