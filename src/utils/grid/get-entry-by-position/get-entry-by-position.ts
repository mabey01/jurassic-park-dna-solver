import { GridPosition } from "../../../types";
import { getFlatGridIndex } from "../get-flat-grid-index/get-flat-grid-index";
import { getFlatGrid } from "../get-flat-grid/get-flat-grid";

export function getEntryByGridPosition<T>(
  grid: T[][],
  gridPosition: GridPosition
) {
  const flatGridIndex = getFlatGridIndex(grid, gridPosition);
  const flatGrid = getFlatGrid(grid);

  return flatGrid[flatGridIndex];
}
