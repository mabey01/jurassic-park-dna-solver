import { type GridPosition } from "../../../types";
import { getFlatGridIndex } from "../get-flat-grid-index/get-flat-grid-index";
import { getGridPositionByFlatIndex } from "../get-grid-position-by-flat-index/get-grid-position-by-flat-index";

export function getMovePosition<T>(
  grid: T[][],
  gridPosition: GridPosition,
  indexDelta: number
): GridPosition | undefined {
  const flatGridIndex = getFlatGridIndex(grid, gridPosition);
  const newFlatGridIndex = flatGridIndex + indexDelta;

  return getGridPositionByFlatIndex(grid, newFlatGridIndex);
}
