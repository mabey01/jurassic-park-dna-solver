import { getActualInsertingIndex } from "../get-actual-index/get-inserting-index";

export function insertEntry<T>(
  array: T[],
  index: number,
  ...entries: T[]
): T[] {
  const arrayCopy = [...array];

  const actualIndex = getActualInsertingIndex(array, index);
  arrayCopy.splice(actualIndex, 0, ...entries);

  return arrayCopy;
}
