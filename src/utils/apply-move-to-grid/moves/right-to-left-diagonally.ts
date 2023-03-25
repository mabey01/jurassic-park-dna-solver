import { type TileGrid, type GridPosition } from "../../../types";
import { replaceEntry } from "../../arrays/replace-entry/replace-entry";
import { isLastRow } from "../../grid/is-last-row/is-last-row";

export function applyRightToLeftDiagonallyMoveToGrid(
  grid: TileGrid,
  [originRowIndex, originColumnIndex]: GridPosition
): TileGrid {
  if (originColumnIndex === 0) {
    throw new Error(
      "Cannot move right to left diagonally from the first column"
    );
  }

  if (isLastRow(grid, originRowIndex)) {
    throw new Error("Cannot move right to left diagonally from the last row");
  }

  const originTileValue = grid[originRowIndex]![originColumnIndex]!;
  const targetTileValue = grid[originRowIndex + 1]![originColumnIndex - 1]!;

  return grid.map((row, rowIndex) => {
    if (rowIndex === originRowIndex) {
      return replaceEntry(row, originColumnIndex, targetTileValue);
    }

    if (rowIndex === originRowIndex + 1) {
      return replaceEntry(row, originColumnIndex - 1, originTileValue);
    }

    return row;
  });
}
