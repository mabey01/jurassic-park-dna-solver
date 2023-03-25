import { type GridPosition } from "../../../types";
import { getFlatGrid } from "../get-flat-grid/get-flat-grid";
import { getGridPositionByFlatIndex } from "../get-grid-position-by-flat-index/get-grid-position-by-flat-index";

type EntryIdentifierFunction<T> = (entry: T) => boolean;

export function getGridPosition<T>(
  grid: T[][],
  isEntry: EntryIdentifierFunction<T>
): GridPosition | undefined {
  const flatGrid = getFlatGrid(grid);
  const flatGridIndex = flatGrid.findIndex(isEntry);

  return getGridPositionByFlatIndex(grid, flatGridIndex);
}
