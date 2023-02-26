import { TileGrid } from "../../../types";
import { applyMoveToGrid } from "../../apply-move-to-grid/apply-move-to-grid";
import { Move, MoveType } from "../../apply-move-to-grid/moves";
import { getFlatGrid } from "../../grid/get-flat-grid/get-flat-grid";
import { getGridPositionByFlatIndex } from "../../grid/get-grid-position-by-flat-index/get-grid-position-by-flat-index";

type NeighborObject = {
  grid: TileGrid;
  move: Move;
};

function getNeighborObject(
  grid: TileGrid,
  moveType: MoveType,
  flatGridIndex: number
): NeighborObject | undefined {
  const tilePosition = getGridPositionByFlatIndex(grid, flatGridIndex);

  if (!tilePosition) {
    return undefined;
  }

  const move: Move = {
    type: moveType,
    originTilePosition: tilePosition,
  };

  try {
    const newTileGrid = applyMoveToGrid(grid, move);
    return {
      grid: newTileGrid,
      move,
    };
  } catch (e) {
    return undefined;
  }
}

export function getAllNeighborObjects(
  grid: TileGrid,
  enabledMoves: MoveType[]
): NeighborObject[] {
  const flatGrid = getFlatGrid(grid);

  const neighborsMatrix = enabledMoves.map((enabledMove) => {
    return flatGrid
      .map((tile, flatGridIndex) => {
        return getNeighborObject(grid, enabledMove, flatGridIndex);
      })
      .filter(Boolean) as NeighborObject[];
  });

  return neighborsMatrix.flat();
}
