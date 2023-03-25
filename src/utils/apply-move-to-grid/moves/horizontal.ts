import { type TileGrid, type GridPosition } from "../../../types";
import { switchEntries } from "../../arrays/switch-entries/switch-entries";

export function applyHorizontalMoveToGrid(
  grid: TileGrid,
  [originRowIndex, originColumnIndex]: GridPosition
) {
  if (originColumnIndex === grid[originRowIndex].length - 1) {
    throw new Error("Cannot switch rightmost element");
  }

  return grid.map((row, rowIndex) => {
    if (rowIndex === originRowIndex) {
      return switchEntries(row, originColumnIndex, originColumnIndex + 1);
    }

    return row;
  });
}
