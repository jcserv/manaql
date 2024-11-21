import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { gql } from "graphql-tag";
import { TestContext } from "@tests/utils/context";
import { CardFactory } from "@tests/factories";
import { cleanupDatabase } from "@tests/utils";

interface GetCardsResponse {
  cards: Array<{
    id: string;
    name: string;
    printings: {
      edges: Array<{
        node: {
          set: string;
          collectorNumber: string;
        };
      }>;
    };
  }>;
}

describe("When querying cards endpoint", () => {
  let ctx: TestContext;

  beforeEach(async () => {
    ctx = await TestContext.create();
  });

  afterEach(async () => {
    await cleanupDatabase(ctx.db);
    await ctx.db.$disconnect();
  });

  it("should return card with printings using dataloader", async () => {
    const GET_CARDS = gql`
      query GetCards($id: Int!, $first: Int!) {
        cards(id: $id, first: $first) {
          id
          name
          printings {
            edges {
              node {
                id
                set
                collector_number
              }
            }
          }
        }
      }
    `;

    const cardFactory = new CardFactory(ctx.db);
    const card = await cardFactory.createWithPrintings(
      2,
      {
        name: "Animate Dead",
      },
      [
        { set: "MKC", collector_number: "125" },
        { set: "30A", collector_number: "92" },
      ],
    );

    const response = await ctx.query<GetCardsResponse>(GET_CARDS, {
      id: card.id,
      first: 1,
    });
    console.log(response);
    expect(response.success).toBe(true);
    expect(response.data?.cards[0]).toMatchObject({
      id: card.id.toString(),
      name: "Animate Dead",
      printings: {
        edges: expect.arrayContaining([
          expect.objectContaining({
            node: expect.objectContaining({
              set: "MKC",
              collector_number: "125",
            }),
          }),
          expect.objectContaining({
            node: expect.objectContaining({
              set: "30A",
              collector_number: "92",
            }),
          }),
        ]),
      },
    });
  });

  const GET_CARDS_BY_NAME_SW = gql`
    query GetCards($filter: CardFilter, $first: Int!) {
      cards(first: $first, filter: $filter) {
        id
        name
      }
    }
  `;

  it("should allow filtering by name sw case insensitive", async () => {
    const cardFactory = new CardFactory(ctx.db);
    const card = await cardFactory.create({
      name: "Animate Dead",
    });

    const response = await ctx.query<GetCardsResponse>(GET_CARDS_BY_NAME_SW, {
      filter: {
        query: ["Anima"],
        operator: "sw",
        fields: ["name"],
      },
      first: 1,
    });
    expect(response.success).toBe(true);
    expect(response.data?.cards[0].name).toBe(card.name);
  });

  it("should allow filtering by name sw", async () => {
    const cardFactory = new CardFactory(ctx.db);
    const card = await cardFactory.create({
      name: "Animate Dead",
    });

    const response = await ctx.query<GetCardsResponse>(GET_CARDS_BY_NAME_SW, {
      filter: {
        query: ["anima"],
        operator: "sw",
        fields: ["name"],
      },
      first: 1,
    });
    expect(response.success).toBe(true);
    expect(response.data?.cards[0].name).toBe(card.name);
  });

  it("should handle GraphQL errors", async () => {
    const response = await ctx.query(gql`
      query InvalidQuery {
        invalidField
      }
    `);

    expect(response.success).toBe(false);
    expect(response.errors).toBeDefined();
  });
});
