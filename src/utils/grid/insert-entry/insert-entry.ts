import { insertEntry as arrayInsertEntry } from "../../arrays/insert-entry/insert-entry";
import { GridPosition } from "../../../types";
import { getFlatGridIndex } from "../get-flat-grid-index/get-flat-grid-index";
import { applyGridTransformation } from "../apply-array-transformation/apply-grid-transformation";

export function insertEntry<T>(
  grid: T[][],
  gridPosition: GridPosition,
  ...entries: T[]
) {
  const flatGridIndex = getFlatGridIndex(grid, gridPosition);

  return applyGridTransformation(grid, (flatGrid) =>
    arrayInsertEntry(flatGrid, flatGridIndex, ...entries)
  );
}
