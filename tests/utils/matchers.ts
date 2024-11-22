/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from "vitest";

/**
 * Converts a simple object structure into a matcher that can handle Relay connections
 * @param expected The simplified test expectation object
 * @returns A matcher that can be used with expect()
 */
export function toMatchRelayConnection(expected: any): any {
  if (Array.isArray(expected)) {
    // Handle array of nodes (common case for connection contents)
    return {
      edges: expect.arrayContaining(
        expected.map((item) => ({
          node: expect.objectContaining(toMatchRelayConnection(item)),
        })),
      ),
    };
  } else if (expected && typeof expected === "object") {
    // Handle nested objects, checking if they contain arrays that need to be transformed
    const transformed = { ...expected };
    for (const [key, value] of Object.entries(expected)) {
      if (Array.isArray(value)) {
        transformed[key] = toMatchRelayConnection(value);
      } else if (value && typeof value === "object") {
        transformed[key] = toMatchRelayConnection(value);
      }
    }
    return transformed;
  }
  return expected;
}

/**
 * Custom matcher that handles Relay connection structures
 * @param received The actual API response
 * @param expected The simplified test expectation
 */
export function expectRelayConnection(received: any, expected: any) {
  const matcher = toMatchRelayConnection(expected);
  expect(received).toMatchObject(matcher);
}

// Vitest matcher extension
expect.extend({
  toMatchRelayNodes(received: any, expected: any) {
    const matcher = toMatchRelayConnection(expected);
    const pass = this.equals(received, expect.objectContaining(matcher));

    return {
      pass,
      message: () =>
        pass
          ? "Expected Relay connection not to match nodes"
          : "Expected Relay connection to match nodes",
    };
  },
});

// Add type definition for the custom matcher
declare module "vitest" {
  interface Assertion {
    toMatchRelayNodes(expected: any): Assertion;
  }
  interface AsymmetricMatchersContaining {
    toMatchRelayNodes(expected: any): void;
  }
}
