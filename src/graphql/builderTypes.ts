import { DateResolver } from "graphql-scalars";
import { builder } from "@/graphql/builder";
import { CardField, FilterOperator } from "@/graphql/types/filter";
import { cardtype, finish } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

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

export const CardTypeRef = builder.enumType(cardtype, {
  name: "CardType",
  description: "The type of card.",
});

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

export const FinishRef = builder.enumType(finish, {
  name: "Finish",
  description:
    "The available finishes of a printing, can be either nonfoil, foil, or etched.",
});

type BuilderTypes = typeof builder.$inferSchemaTypes;
export type FieldBuilder = PothosSchemaTypes.FieldBuilder<BuilderTypes, object>;
export type QueryFieldBuilder = PothosSchemaTypes.QueryFieldBuilder<
  BuilderTypes,
  object
>;
