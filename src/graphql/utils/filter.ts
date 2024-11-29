import { AllFilters, FilterOperator } from "@/graphql/types";
import { Prisma } from "@prisma/client";

export function buildWhereClause(filter: AllFilters) {
  if (!filter) return {};

  const conditions = filter.fields.map((field) => {
    const fieldConditions = filter.query.map((queryValue) => {
      let value: string | boolean = queryValue;

      switch (queryValue) {
        case "true":
          value = true;
          break;
        case "false":
          value = false;
          break;
      }
      
      switch (filter.operator) {
        case FilterOperator.eq:
          return {
            [field]: {
              equals: value,
            },
          };
        case FilterOperator.ne:
          return {
            [field]: {
              not: value,
            },
          };
        case FilterOperator.sw:
          return {
            [field]: {
              startsWith: value,
              mode: Prisma.QueryMode.insensitive,
            },
          };
        case FilterOperator.co:
          return {
            [field]: { // TODO: this won't work for strings, they rely on "contains"
                has: value,
            }
          };
        default:
          return {};
      }
    });

    return fieldConditions.length > 1
      ? { OR: fieldConditions }
      : fieldConditions[0];
  });

  return conditions.length > 1 ? { OR: conditions } : conditions[0];
}

export function buildWhereClauseWithFilters(filters: AllFilters[] | null | undefined) {
  if (!filters) return {};
  return filters.reduce((acc, filter) => {
    return {
      ...acc,
      ...buildWhereClause(filter),
    };
  }, {});
}
