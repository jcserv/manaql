export function safeParseInt(value: string | number | undefined | null): number {
  if (value == null) {
    return 0;
  }
  return parseInt(value as string);
}

export function compare(
  a: string | number | undefined | null,
  b: string | number | undefined | null,
) {
  if (a == null) {
    return -1;
  }
  if (b == null) {
    return 1;
  }

  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
