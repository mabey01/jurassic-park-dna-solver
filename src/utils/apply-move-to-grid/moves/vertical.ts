import { TileGrid, GridPosition } from "../../../types";
import { replaceEntry } from "../../arrays/replace-entry/replace-entry";

export function applyVerticalMoveToGrid(
  grid: TileGrid,
  [originRowIndex, originColumnIndex]: GridPosition
) {
  if (originRowIndex === grid.length - 1) {
    throw new Error("Cannot vertical switch bottom most element");
  }

  const originTileValue = grid[originRowIndex][originColumnIndex];
  const targetTileValue = grid[originRowIndex + 1][originColumnIndex];

  return grid.map((row, rowIndex) => {
    if (rowIndex == originRowIndex) {
      return replaceEntry(row, originColumnIndex, targetTileValue);
    }

    if (rowIndex === originRowIndex + 1) {
      return replaceEntry(row, originColumnIndex, originTileValue);
    }

    return row;
  });
}
