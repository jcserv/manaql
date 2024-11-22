// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Context {
}

export async function createContext(): Promise<Context> {
  return {};
}

export function createTestContext(): Context {
  return {
  };
}
