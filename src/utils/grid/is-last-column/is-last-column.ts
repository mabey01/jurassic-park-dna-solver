import { type TileGrid } from "../../../types";

export function isLastColumn(grid: TileGrid, columnIndex: number) {
  return columnIndex === grid[0].length - 1;
}
