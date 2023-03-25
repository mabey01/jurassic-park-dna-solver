import { type GridPosition } from "../../../types";
import { removeEntry as removeArrayEntry } from "../../arrays/remove-entry/remove-entry";
import { getFlatGridIndex } from "../get-flat-grid-index/get-flat-grid-index";
import { applyGridTransformation } from "../apply-array-transformation/apply-grid-transformation";

export function removeEntry<T>(grid: T[][], position: GridPosition) {
  const flatGridIndex = getFlatGridIndex(grid, position);

  return applyGridTransformation(grid, (flatGrid) =>
    removeArrayEntry(flatGrid, flatGridIndex)
  );
}
