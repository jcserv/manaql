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

const GET_CARDS = gql`
  query GetCards($id: Int!) {
    cards(id: $id) {
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
    const cardFactory = new CardFactory(ctx.db);
    const card = await cardFactory.createWithPrintings(
      2,
      {
        name: "Animate Dead",
      },
      [
        { set: "MKC", collector_number: "125" },
        { set: "30A", collector_number: "92" },
      ]
    );

    const response = await ctx.query<GetCardsResponse>(GET_CARDS, {
      id: card.id,
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
