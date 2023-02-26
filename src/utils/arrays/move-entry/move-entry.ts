import { getActualIndex } from "../get-actual-index/get-actual-index";
import { getActualInsertingIndex } from "../get-actual-index/get-inserting-index";
import { insertEntry } from "../insert-entry/insert-entry";
import { removeEntry } from "../remove-entry/remove-entry";

export function moveEntry<T>(
  array: T[],
  originIndex: number,
  targetIndex: number
): T[] {
  const actualOriginIndex = getActualIndex(array, originIndex);
  const actualTargetIndex = getActualInsertingIndex(array, targetIndex);

  const entry = array[actualOriginIndex];
  const cleanArray = removeEntry(array, actualOriginIndex);
  return insertEntry(cleanArray, actualTargetIndex, entry);
}
