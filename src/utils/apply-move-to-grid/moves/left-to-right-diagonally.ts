import { type TileGrid, type GridPosition } from "../../../types";
import { replaceEntry } from "../../arrays/replace-entry/replace-entry";
import { isLastColumn } from "../../grid/is-last-column/is-last-column";
import { isLastRow } from "../../grid/is-last-row/is-last-row";

export function applyLeftToRightDiagonallyMoveToGrid(
  grid: TileGrid,
  [originRowIndex, originColumnIndex]: GridPosition
) {
  if (isLastColumn(grid, originColumnIndex)) {
    throw new Error(
      "Cannot move left to right diagonally from the last column"
    );
  }

  if (isLastRow(grid, originRowIndex)) {
    throw new Error("Cannot move left to right diagonally from the last row");
  }

  const originTileValue = grid[originRowIndex][originColumnIndex];
  const targetTileValue = grid[originRowIndex + 1][originColumnIndex + 1];

  return grid.map((row, rowIndex) => {
    if (rowIndex === originRowIndex) {
      return replaceEntry(row, originColumnIndex, targetTileValue);
    }

    if (rowIndex === originRowIndex + 1) {
      return replaceEntry(row, originColumnIndex + 1, originTileValue);
    }

    return row;
  });
}
