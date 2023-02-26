import { TileGrid, GridPosition } from "../../types";

import { Move, MoveType, MOVE_SET } from "./moves";

export function applyMoveToGrid(grid: TileGrid, move: Move): TileGrid {
  const applyMoveFunction = MOVE_SET[move.type];
  return applyMoveFunction(grid, move.originTilePosition);
}
