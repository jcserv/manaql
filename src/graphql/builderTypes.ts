import { DateResolver } from "graphql-scalars";
import { Decimal } from "@prisma/client/runtime/library";

import { builder } from "@/graphql/builder";
import { CardType, Finish, CardField, FilterOperator, PrintingField } from "@/graphql/types";

builder.addScalarType("Date", DateResolver, {});

builder.scalarType("Decimal", {
  serialize: (value) => value.toString(),
  parseValue: (value) => {
    if (typeof value !== "string") {
      throw new TypeError("Decimal must be a string");
    }
    return new Decimal(value);
  },
});

export const CardTypeRef = builder.enumType(CardType, {
  name: "CardType",
  description: "The type of card.",
});

const CardFieldRef = builder.enumType(CardField, {
  name: "CardField",
  description: "The fields of Card to apply the filter(s) on.",
});

const PrintingFieldRef = builder.enumType(PrintingField, {
  name: "PrintingField",
  description: "The fields of Printing to apply the filter(s) on.",
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
      description:
        "The operator to apply to the filter. Supported operators are `eq` and `sw`.",
      type: FilterOperatorRef,
      required: true,
    }),
    query: t.field({
      description: "The query values to apply to the filter.",
      type: ["String"],
      required: true,
    }),
  }),
});

export const PrintingFilterRef = builder.inputType("PrintingFilter", {
  description: "The filter to narrow down the results of a query.",
  fields: (t) => ({
    fields: t.field({
      type: [PrintingFieldRef],
      required: true,
    }),
    operator: t.field({
      description:
        "The operator to apply to the filter. Supported operators are `eq`, `ne`, and `sw`.",
      type: FilterOperatorRef,
      required: true,
    }),
    query: t.field({
      description: 'The query values to apply to the filter. Use "true" or "false" for boolean fields.',
      type: ["String"],
      required: true,
    }),
  }),
});

export const FinishRef = builder.enumType(Finish, {
  name: "Finish",
  description:
    "The available finishes of a printing, can be either nonfoil, foil, or etched.",
});

type BuilderTypes = typeof builder.$inferSchemaTypes;

export type QueryFieldBuilder = PothosSchemaTypes.QueryFieldBuilder<
  BuilderTypes,
  object
>;