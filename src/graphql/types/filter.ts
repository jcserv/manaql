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
  query: string[];
  operator: FilterOperator;
  fields: CardField[];
}

export enum PrintingField {
  set = "set",
  finishes = "finishes",
}

export interface PrintingFilter {
  query: string[];
  operator: FilterOperator;
  fields: PrintingField[];
}

export type AllFilters = CardFilter | PrintingFilter | null | undefined;