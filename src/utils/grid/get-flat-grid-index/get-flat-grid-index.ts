import { GridPosition } from "../../../types";
import { getGridDimensions } from "../get-grid-dimensions/get-grid-dimensions";

export function getFlatGridIndex<T>(
  grid: T[][],
  [row, column]: GridPosition
): number {
  const dimensions = getGridDimensions(grid);

  return row * dimensions.numberOfColumns + column;
}
