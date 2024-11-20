import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { gql } from "graphql-tag";
import { TestContext } from "@tests/utils/context";
import { AuthorFactory } from "@tests/factories";
import { cleanupDatabase } from "@tests/utils";

interface GetAuthorsResponse {
  authors: Array<{
    id: string;
    name: string;
    books: {
      edges: Array<{
        node: {
          id: string;
          title: string;
        };
      }>;
    };
  }>;
}

const GET_AUTHORS = gql`
  query GetAuthors($id: ID!) {
    authors(id: $id) {
      id
      name
      books {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }
`;

describe("When querying authors endpoint", () => {
  let ctx: TestContext;

  beforeEach(async () => {
    ctx = await TestContext.create();
  });

  afterEach(async () => {
    await cleanupDatabase(ctx.db);
    await ctx.db.$disconnect();
  });

  it("should return author with books using dataloader", async () => {
    const authorFactory = new AuthorFactory(ctx.db);
    const author = await authorFactory.createWithBooks(
      2,
      {
        name: "Test Author",
      },
      [{ title: "Book 1" }, { title: "Book 2" }]
    );

    const response = await ctx.query<GetAuthorsResponse>(GET_AUTHORS, {
      id: author.id,
    });

    expect(response.success).toBe(true);
    expect(response.data?.authors[0]).toMatchObject({
      id: author.id.toString(),
      name: "Test Author",
      books: {
        edges: expect.arrayContaining([
          expect.objectContaining({
            node: expect.objectContaining({
              title: "Book 1",
            }),
          }),
          expect.objectContaining({
            node: expect.objectContaining({
              title: "Book 2",
            }),
          }),
        ]),
      },
    });
  });

  it("should handle GraphQL errors", async () => {
    const response = await ctx.query(
      gql`
        query InvalidQuery {
          invalidField
        }
      `
    );

    expect(response.success).toBe(false);
    expect(response.errors).toBeDefined();
  });
});
