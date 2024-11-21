import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: number; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
};

/** A card is the standard component of Magic: The Gathering and one of its resources. */
export type Card = {
  __typename?: 'Card';
  id?: Maybe<Scalars['ID']['output']>;
  mainType?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  printings?: Maybe<CardPrintingsConnection>;
};


/** A card is the standard component of Magic: The Gathering and one of its resources. */
export type CardprintingsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** The fields of Card to apply the filter(s) on. */
export enum CardField {
  name = 'name'
}

/** The filter to narrow down the results of a query. */
export type CardFilter = {
  fields: Array<CardField>;
  operator: FilterOperator;
  query: Array<Scalars['String']['input']>;
};

export type CardPrintingsConnection = {
  __typename?: 'CardPrintingsConnection';
  edges?: Maybe<Array<Maybe<CardPrintingsConnectionEdge>>>;
  pageInfo: PageInfo;
};

export type CardPrintingsConnectionEdge = {
  __typename?: 'CardPrintingsConnectionEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Printing>;
};

/** The filter operator to apply. */
export enum FilterOperator {
  eq = 'eq',
  sw = 'sw'
}

/** The finish of a printing, can be either nonfoil, foil, or etched. */
export enum Finish {
  etched = 'etched',
  foil = 'foil',
  nonfoil = 'nonfoil'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** A printing is a version of a card that is unique to a particular set. */
export type Printing = {
  __typename?: 'Printing';
  backImageUri?: Maybe<Scalars['String']['output']>;
  collectorNumber?: Maybe<Scalars['String']['output']>;
  finishes?: Maybe<Array<Finish>>;
  id?: Maybe<Scalars['ID']['output']>;
  imageUri?: Maybe<Scalars['String']['output']>;
  priceEur?: Maybe<Scalars['Float']['output']>;
  priceEurEtched?: Maybe<Scalars['Float']['output']>;
  priceEurFoil?: Maybe<Scalars['Float']['output']>;
  priceUsd?: Maybe<Scalars['Float']['output']>;
  priceUsdEtched?: Maybe<Scalars['Float']['output']>;
  priceUsdFoil?: Maybe<Scalars['Float']['output']>;
  set?: Maybe<Scalars['String']['output']>;
  setName?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  cards?: Maybe<Array<Card>>;
};


export type QuerycardsArgs = {
  filter?: InputMaybe<CardFilter>;
  first: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Card: ResolverTypeWrapper<Card>;
  CardField: CardField;
  CardFilter: CardFilter;
  CardPrintingsConnection: ResolverTypeWrapper<CardPrintingsConnection>;
  CardPrintingsConnectionEdge: ResolverTypeWrapper<CardPrintingsConnectionEdge>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  FilterOperator: FilterOperator;
  Finish: Finish;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Printing: ResolverTypeWrapper<Printing>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Card: Card;
  CardFilter: CardFilter;
  CardPrintingsConnection: CardPrintingsConnection;
  CardPrintingsConnectionEdge: CardPrintingsConnectionEdge;
  Date: Scalars['Date']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  PageInfo: PageInfo;
  Printing: Printing;
  Query: {};
  String: Scalars['String']['output'];
};

export type CardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Card'] = ResolversParentTypes['Card']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  mainType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  printings?: Resolver<Maybe<ResolversTypes['CardPrintingsConnection']>, ParentType, ContextType, Partial<CardprintingsArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CardPrintingsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CardPrintingsConnection'] = ResolversParentTypes['CardPrintingsConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['CardPrintingsConnectionEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CardPrintingsConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CardPrintingsConnectionEdge'] = ResolversParentTypes['CardPrintingsConnectionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Printing']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrintingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Printing'] = ResolversParentTypes['Printing']> = {
  backImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  collectorNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  finishes?: Resolver<Maybe<Array<ResolversTypes['Finish']>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  imageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  priceEur?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  priceEurEtched?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  priceEurFoil?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  priceUsd?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  priceUsdEtched?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  priceUsdFoil?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  set?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  setName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cards?: Resolver<Maybe<Array<ResolversTypes['Card']>>, ParentType, ContextType, RequireFields<QuerycardsArgs, 'first'>>;
};

export type Resolvers<ContextType = any> = {
  Card?: CardResolvers<ContextType>;
  CardPrintingsConnection?: CardPrintingsConnectionResolvers<ContextType>;
  CardPrintingsConnectionEdge?: CardPrintingsConnectionEdgeResolvers<ContextType>;
  Date?: GraphQLScalarType;
  PageInfo?: PageInfoResolvers<ContextType>;
  Printing?: PrintingResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

