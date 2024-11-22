import SchemaBuilder, { SchemaTypes } from "@pothos/core";

import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import type PrismaTypes from "@pothos/plugin-prisma/generated";

import { Context } from "@/context";
import { prisma } from "@/db";
import { Decimal } from "@prisma/client/runtime/library";

export interface GraphQLConfig extends SchemaTypes {
  PrismaTypes: PrismaTypes;
  Context: Context;
  Scalars: {
    String: { Input: string; Output: string };
    ID: { Input: number; Output: string | number };
    Int: { Input: number; Output: number };
    Float: { Input: number; Output: number };
    Decimal: { Input: Decimal; Output: Decimal };
    Boolean: { Input: boolean; Output: boolean };
    Date: { Input: Date; Output: Date };
  };
}

export const builder = new SchemaBuilder<GraphQLConfig>({
  plugins: [PrismaPlugin, RelayPlugin],
  prisma: {
    client: prisma,
  },
  relay: {
    cursorType: "String",
    clientMutationId: "omit",
    nodesOnConnection: false,
    nodeQueryOptions: false,
    nodesQueryOptions: false,
    firstArgOptions: {
      defaultValue: 10,
    },
  },
});
