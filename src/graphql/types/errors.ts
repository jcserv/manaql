import { ApolloServerErrorCode } from '@apollo/server/errors';

export const excludedCodes = [
    ApolloServerErrorCode.BAD_USER_INPUT,
    ApolloServerErrorCode.GRAPHQL_PARSE_FAILED,
    ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED,
];
