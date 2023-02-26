export function getActualInsertingIndex<T>(array: T[], index: number): number {
  if (index >= 0) {
    return Math.min(index, array.length);
  }

  return Math.max(0, array.length + 1 + index);
}
