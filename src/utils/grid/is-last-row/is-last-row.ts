import { TileGrid } from "../../../types";

export function isLastRow(grid: TileGrid, rowIndex: number) {
  return rowIndex === grid.length - 1;
}
