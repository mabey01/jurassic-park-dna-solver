// worker.ts
import { TileGrid } from "../types";
import { MoveType } from "../utils/apply-move-to-grid/moves";
import { getShortestSolveMoves } from "../utils/tile-grid-solver/get-shortest-solve-moves/get-shortest-solve-moves";
export const getGridSolvingPath = (
  originGrid: TileGrid,
  targetGrid: TileGrid,
  moves: MoveType[]
) => {
  return getShortestSolveMoves(originGrid, targetGrid, moves);
};
