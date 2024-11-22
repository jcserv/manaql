import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { gql } from "graphql-tag";
import { TestContext } from "@tests/utils/context";
import { CardFactory } from "@tests/factories";
import { cleanupDatabase } from "@tests/utils";
import { prisma } from "@/db";
import { expectRelayConnection } from "@tests/utils/matchers";

interface GetCardsResponse {
  cards: {
    edges: Array<{
      node: {
        cardId: string;
        name: string;
        printings: {
          edges: Array<{
            node: {
              set: string;
              collectorNumber: string;
            };
          }>;
        };
      };
    }>;
  };
}

describe("When querying cards endpoint", () => {
  let ctx: TestContext;

  beforeEach(async () => {
    ctx = await TestContext.create();
    await cleanupDatabase(prisma);
  });

  afterEach(async () => {
    await cleanupDatabase(prisma);
    await prisma.$disconnect();
  });

  it("should be able to get card by cardId", async () => {
    const GET_CARD = gql`
      query GetCard($cardId: Int!) {
        cards(cardId: $cardId) {
          edges {
            node {
              name
            }
          }
        }
      }`;

      const cardFactory = new CardFactory(prisma);
      const card = await cardFactory.create({
        name: "Animate Dead",
      });
      const response = await ctx.query<GetCardsResponse>(GET_CARD, {
        cardId: card.id,
      });
      expect(response.success).toBe(true);
      expectRelayConnection(response.data?.cards, [{ name: card.name }]);
  });

  it("should be able to get first X cards", async () => {
    const GET_CARDS = gql`
      query GetCards($first: Int) {
        cards(first: $first) {
          edges {
            node {
              name
            }
          }
        }
      }`
    
    const cardFactory = new CardFactory(prisma);
    const cards = await cardFactory.createMany([
      { name: "Animate Dead" },
      { name: "Arachnogenesis" },
      { name: "Assassin's Trophy" },
      { name: "Azusa, Lost but Seeking" },
      { name: "Bala Ged Recovery" },
      { name: "Baba Lysaga, Night Witch" },
    ]);
    const response = await ctx.query<GetCardsResponse>(GET_CARDS, {
      first: cards.length - 3,
    });
    expect(response.success).toBe(true);
    expectRelayConnection(response.data?.cards, [
      { name: cards[0].name },
      { name: cards[1].name },
      { name: cards[2].name },
    ]);
  });

  it("should be able to get card with all of its printings", async () => {
    const GET_CARDS = gql`
      query GetCards($first: Int, $cardId: Int) {
        cards(first: $first, cardId: $cardId) {
          edges {
            node {
              cardId
              name
              printings {
                edges {
                  node {
                    id
                    set
                    collectorNumber
                  }
                }
              }
            }
          }
        }
      }
    `;

    const cardFactory = new CardFactory(prisma);
    const card = await cardFactory.createWithPrintings(
      {
        name: "Animate Dead",
      },
      [
        { set: "MKC", collector_number: "125" },
        { set: "30A", collector_number: "92" },
      ]
    );

    const response = await ctx.query<GetCardsResponse>(GET_CARDS, {
      cardId: card.id,
      first: 1,
    });
    expect(response.success).toBe(true);
    expectRelayConnection(response.data?.cards, [
      {
        cardId: card.id.toString(),
        name: "Animate Dead",
        printings: [
          {
            set: "MKC",
            collectorNumber: "125",
          },
          {
            set: "30A",
            collectorNumber: "92",
          },
        ],
      },
    ]);
  });

  const GET_CARDS_BY_NAME_SW = gql`
    query GetCards($filter: CardFilter, $first: Int!) {
      cards(first: $first, filter: $filter) {
        edges {
          node {
            name
          }
        }
      }
    }
  `;

  it("should allow filtering by name sw case insensitive", async () => {
    const cardFactory = new CardFactory(prisma);
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
    expectRelayConnection(response.data?.cards, [{ name: card.name }]);
  });

  it("should allow filtering by name sw", async () => {
    const cardFactory = new CardFactory(prisma);
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
    expectRelayConnection(response.data?.cards, [{ name: card.name }]);
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
