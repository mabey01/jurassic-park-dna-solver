import { getActualIndex } from "../get-actual-index/get-actual-index";

export function replaceEntry<T>(array: T[], index: number, newEntry: T): T[] {
  const actualIndex = getActualIndex(array, index);
  return array.map((entry, index) =>
    index === actualIndex ? newEntry : entry
  );
}
