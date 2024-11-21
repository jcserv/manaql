import { DateResolver } from "graphql-scalars";
import { builder } from "@/graphql/builder";
import { CardField, FilterOperator } from "@/graphql/types/filter";

builder.addScalarType("Date", DateResolver, {});

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
