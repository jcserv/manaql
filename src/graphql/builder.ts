import { DateResolver } from "graphql-scalars";
import SchemaBuilder, { SchemaTypes } from "@pothos/core";

import DataloaderPlugin from "@pothos/plugin-dataloader";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import RelayPlugin from "@pothos/plugin-relay";

import { Card, Printing } from "@/__generated__/graphql";
import { Context } from "@/context";
import { prisma } from "@/db";
import { CardField, FilterOperator } from "@/graphql/types/filter";

export interface GraphQLConfig extends SchemaTypes {
  PrismaTypes: PrismaTypes;
  Context: Context;
  Scalars: {
    String: { Input: string; Output: string };
    ID: { Input: number; Output: string | number };
    Int: { Input: number; Output: number };
    Float: { Input: number; Output: number };
    Boolean: { Input: boolean; Output: boolean };
    Date: { Input: Date; Output: Date };
  };
}

export const builder = new SchemaBuilder<GraphQLConfig>({
  plugins: [DataloaderPlugin, PrismaPlugin, RelayPlugin],
  prisma: {
    client: prisma,
  },
  relay: {
    cursorType: "String",
    clientMutationId: "omit",
    nodesOnConnection: false,
  },
});

builder.addScalarType("Date", DateResolver, {});

export const CardRef = builder.objectRef<Card>("Card");
export const PrintingRef = builder.objectRef<Printing>("Printing");

const CardFieldRef = builder.enumType(CardField, {
  name: "CardField",
  description: "The fields of Card to apply the filter(s) on.",
});

const FilterOperatorRef = builder.enumType(FilterOperator, {
  name: "FilterOperator",
  description: "The filter operator to apply.",
});

export const CardFilterRef = builder.inputType("CardFilter", {
  description: "The filter to narrow down the results of a query.",
  fields: (t) => ({
    fields: t.field({
      type: [CardFieldRef],
      required: true,
    }),
    operator: t.field({
      type: FilterOperatorRef,
      required: true,
    }),
    query: t.field({
      type: ["String"],
      required: true,
    }),
  }),
});

type BuilderTypes = typeof builder.$inferSchemaTypes;
export type FieldBuilder = PothosSchemaTypes.FieldBuilder<BuilderTypes, object>;
export type QueryFieldBuilder = PothosSchemaTypes.QueryFieldBuilder<
  BuilderTypes,
  object
>;
