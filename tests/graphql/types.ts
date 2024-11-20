import { GraphQLError } from "graphql";

export interface GraphQLResponse<TData> {
  success: boolean;
  data?: TData;
  errors?: GraphQLError[];
}
