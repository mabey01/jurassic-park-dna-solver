import { type GridPosition, type TileGrid } from "../../../types";
import { replaceEntry } from "../../arrays/replace-entry/replace-entry";

export function applyVerticalSkipMoveToGrid(
  grid: TileGrid,
  [originRowIndex, originColumnIndex]: GridPosition
) {
  /**
   * x x x x
   * x x x x
   * x x x x << 2
   * x x x x
   * length: 4
   */
  if (grid.length <= originRowIndex + 2) {
    throw new Error("Cannot vertically skip beyond the edge");
  }

  const originTileValue = grid[originRowIndex][originColumnIndex];
  const targetTileValue = grid[originRowIndex + 2][originColumnIndex];

  return grid.map((row, rowIndex) => {
    if (rowIndex === originRowIndex) {
      return replaceEntry(row, originColumnIndex, targetTileValue);
    }

    if (rowIndex === originRowIndex + 2) {
      return replaceEntry(row, originColumnIndex, originTileValue);
    }

    return row;
  });
}
