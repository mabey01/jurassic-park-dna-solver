import { getGridPosition } from "../get-grid-position/get-grid-position";
import { getDistanceByPositions } from "./get-distance-by-position";

type EntryIdentifierFunction<T> = (entry: T) => boolean;

export function getDistanceBetween<T>(
  grid: T[][],
  isA: EntryIdentifierFunction<T>,
  isB: EntryIdentifierFunction<T>
): number {
  const aPosition = getGridPosition(grid, isA);
  const bPosition = getGridPosition(grid, isB);

  return getDistanceByPositions(aPosition, bPosition);
}
