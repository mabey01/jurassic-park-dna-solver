import { type GridPosition } from "../../types";

export function isSamePosition(a?: GridPosition, b?: GridPosition) {
  if (a === undefined || b === undefined) return false;

  return a[0] === b[0] && a[1] === b[1];
}
