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
  Decimal: { input: any; output: any; }
};

/** The fields of Card to apply the filter(s) on. */
export enum CardField {
  name = 'name'
}

/** The filter to narrow down the results of a query. */
export type CardFilter = {
  fields: Array<CardField>;
  /** The operator to apply to the filter. Supported operators are `eq` and `sw`. */
  operator: FilterOperator;
  /** The query values to apply to the filter. */
  query: Array<Scalars['String']['input']>;
};

/** The type of card. */
export enum CardType {
  Artifact = 'Artifact',
  Battle = 'Battle',
  Conspiracy = 'Conspiracy',
  Creature = 'Creature',
  Dungeon = 'Dungeon',
  Enchantment = 'Enchantment',
  Instant = 'Instant',
  Kindred = 'Kindred',
  Land = 'Land',
  Phenomenon = 'Phenomenon',
  Plane = 'Plane',
  Planeswalker = 'Planeswalker',
  Scheme = 'Scheme',
  Sorcery = 'Sorcery',
  Vanguard = 'Vanguard'
}

/** The filter operator to apply. */
export enum FilterOperator {
  eq = 'eq',
  sw = 'sw'
}

/** The available finishes of a printing, can be either nonfoil, foil, or etched. */
export enum Finish {
  etched = 'etched',
  foil = 'foil',
  nonfoil = 'nonfoil'
}

export type Node = {
  id: Scalars['ID']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  cards?: Maybe<QueryCardsConnection>;
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
};


export type QuerycardsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  cardId?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<CardFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerynodeArgs = {
  id: Scalars['ID']['input'];
};


export type QuerynodesArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type QueryCardsConnection = {
  __typename?: 'QueryCardsConnection';
  edges?: Maybe<Array<Maybe<QueryCardsConnectionEdge>>>;
  pageInfo: PageInfo;
};

export type QueryCardsConnectionEdge = {
  __typename?: 'QueryCardsConnectionEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<card>;
};

export type card = Node & {
  __typename?: 'card';
  /** The numeric unique identifier of a card. */
  cardId?: Maybe<Scalars['ID']['output']>;
  /** A unique string identifier for a card, used for pagination. */
  id: Scalars['ID']['output'];
  /** The primary type of a card; can be used to group cards by type in a decklist. */
  mainType?: Maybe<CardType>;
  /** The name of a card. */
  name?: Maybe<Scalars['String']['output']>;
  /** The printings of a card. */
  printings?: Maybe<cardPrintingsConnection>;
};


export type cardprintingsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type cardPrintingsConnection = {
  __typename?: 'cardPrintingsConnection';
  edges?: Maybe<Array<Maybe<cardPrintingsConnectionEdge>>>;
  pageInfo: PageInfo;
};

export type cardPrintingsConnectionEdge = {
  __typename?: 'cardPrintingsConnectionEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<printing>;
};

export type printing = Node & {
  __typename?: 'printing';
  /** The image URI of the back of a printing */
  backImageUri?: Maybe<Scalars['String']['output']>;
  /** The collector number of a printing. */
  collectorNumber?: Maybe<Scalars['String']['output']>;
  finishes?: Maybe<Array<Finish>>;
  /** A unique string identifier for a printing, used for pagination. */
  id: Scalars['ID']['output'];
  /** The image URI of a printing. */
  imageUri?: Maybe<Scalars['String']['output']>;
  /** The price of the non-foil version of a printing in EUR. */
  priceEur?: Maybe<Scalars['Decimal']['output']>;
  /** The price of the etched version of a printing in EUR. */
  priceEurEtched?: Maybe<Scalars['Decimal']['output']>;
  /** The price of the foil version of a printing in EUR. */
  priceEurFoil?: Maybe<Scalars['Decimal']['output']>;
  /** The price of the non-foil version of a printing in USD. */
  priceUsd?: Maybe<Scalars['Decimal']['output']>;
  /** The price of the etched version of a printing in USD. */
  priceUsdEtched?: Maybe<Scalars['Decimal']['output']>;
  /** The price of the foil version of a printing in USD. */
  priceUsdFoil?: Maybe<Scalars['Decimal']['output']>;
  /** The numeric unique identifier of a printing. */
  printingId?: Maybe<Scalars['ID']['output']>;
  /** The set code of a printing. */
  set?: Maybe<Scalars['String']['output']>;
  /** The name of the set of a printing. */
  setName?: Maybe<Scalars['String']['output']>;
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


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  Node: ( card ) | ( printing );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CardField: CardField;
  CardFilter: CardFilter;
  CardType: CardType;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Decimal: ResolverTypeWrapper<Scalars['Decimal']['output']>;
  FilterOperator: FilterOperator;
  Finish: Finish;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  QueryCardsConnection: ResolverTypeWrapper<QueryCardsConnection>;
  QueryCardsConnectionEdge: ResolverTypeWrapper<QueryCardsConnectionEdge>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  card: ResolverTypeWrapper<card>;
  cardPrintingsConnection: ResolverTypeWrapper<cardPrintingsConnection>;
  cardPrintingsConnectionEdge: ResolverTypeWrapper<cardPrintingsConnectionEdge>;
  printing: ResolverTypeWrapper<printing>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CardFilter: CardFilter;
  Date: Scalars['Date']['output'];
  Decimal: Scalars['Decimal']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  PageInfo: PageInfo;
  Query: {};
  QueryCardsConnection: QueryCardsConnection;
  QueryCardsConnectionEdge: QueryCardsConnectionEdge;
  String: Scalars['String']['output'];
  card: card;
  cardPrintingsConnection: cardPrintingsConnection;
  cardPrintingsConnectionEdge: cardPrintingsConnectionEdge;
  printing: printing;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Decimal'], any> {
  name: 'Decimal';
}

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'card' | 'printing', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cards?: Resolver<Maybe<ResolversTypes['QueryCardsConnection']>, ParentType, ContextType, RequireFields<QuerycardsArgs, 'after' | 'before' | 'first' | 'last'>>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QuerynodeArgs, 'id'>>;
  nodes?: Resolver<Array<Maybe<ResolversTypes['Node']>>, ParentType, ContextType, RequireFields<QuerynodesArgs, 'ids'>>;
};

export type QueryCardsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['QueryCardsConnection'] = ResolversParentTypes['QueryCardsConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['QueryCardsConnectionEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryCardsConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['QueryCardsConnectionEdge'] = ResolversParentTypes['QueryCardsConnectionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['card']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type cardResolvers<ContextType = any, ParentType extends ResolversParentTypes['card'] = ResolversParentTypes['card']> = {
  cardId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mainType?: Resolver<Maybe<ResolversTypes['CardType']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  printings?: Resolver<Maybe<ResolversTypes['cardPrintingsConnection']>, ParentType, ContextType, RequireFields<cardprintingsArgs, 'after' | 'before' | 'first' | 'last'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type cardPrintingsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['cardPrintingsConnection'] = ResolversParentTypes['cardPrintingsConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['cardPrintingsConnectionEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type cardPrintingsConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['cardPrintingsConnectionEdge'] = ResolversParentTypes['cardPrintingsConnectionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['printing']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type printingResolvers<ContextType = any, ParentType extends ResolversParentTypes['printing'] = ResolversParentTypes['printing']> = {
  backImageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  collectorNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  finishes?: Resolver<Maybe<Array<ResolversTypes['Finish']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  priceEur?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  priceEurEtched?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  priceEurFoil?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  priceUsd?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  priceUsdEtched?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  priceUsdFoil?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  printingId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  set?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  setName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Decimal?: GraphQLScalarType;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QueryCardsConnection?: QueryCardsConnectionResolvers<ContextType>;
  QueryCardsConnectionEdge?: QueryCardsConnectionEdgeResolvers<ContextType>;
  card?: cardResolvers<ContextType>;
  cardPrintingsConnection?: cardPrintingsConnectionResolvers<ContextType>;
  cardPrintingsConnectionEdge?: cardPrintingsConnectionEdgeResolvers<ContextType>;
  printing?: printingResolvers<ContextType>;
};

