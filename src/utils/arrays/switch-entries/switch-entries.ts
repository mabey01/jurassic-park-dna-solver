import { moveEntry } from "../move-entry/move-entry";

export function switchEntries<T>(
  array: T[],
  originIndex: number,
  switchingIndex: number
): T[] {
  return moveEntry(array, originIndex, switchingIndex);
}
