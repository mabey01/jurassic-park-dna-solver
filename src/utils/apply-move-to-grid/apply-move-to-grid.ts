import { type TileGrid } from "../../types";

import { type Move, MOVE_SET } from "./moves";

export function applyMoveToGrid(grid: TileGrid, move: Move): TileGrid {
  const applyMoveFunction = MOVE_SET[move.type]!;
  return applyMoveFunction(grid, move.originTilePosition);
}
