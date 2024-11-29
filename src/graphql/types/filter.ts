// Based on https://bookstack.soffid.com/books/scim/page/scim-query-syntax

export enum FilterOperator {
  eq = "eq",
  ne = "ne",
  sw = "sw",
  co = "co",
}

export enum CardField {
  name = "name",
}

export interface CardFilter {
  fields: CardField[];
  operator: FilterOperator;
  query: string[];
}

export enum PrintingField {
  set = "set",
  finishes = "finishes",
  isSerialized = "is_serialized",
}

export interface PrintingFilter {
  fields: PrintingField[];
  operator: FilterOperator;
  query: string[];
}

export type AllFilters = CardFilter | PrintingFilter | null | undefined;