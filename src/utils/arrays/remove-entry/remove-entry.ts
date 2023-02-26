import { getActualIndex } from "../get-actual-index/get-actual-index";

export function removeEntry<T>(array: T[], originIndex: number): T[] {
  const actualIndex = getActualIndex(array, originIndex);

  return array.filter((_, index) => index !== actualIndex);
}
