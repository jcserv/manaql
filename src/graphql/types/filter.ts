export enum FilterOperator {
  eq = "eq",
  sw = "sw",
}

export enum CardField {
  name = "name",
}

export interface CardFilter {
  query: string[];
  operator: FilterOperator;
  fields: CardField[];
}
