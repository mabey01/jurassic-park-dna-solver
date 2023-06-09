import { type TileGrid } from "../../../types";
import { applyMoveToGrid } from "../../apply-move-to-grid/apply-move-to-grid";
import { type Move, type MoveType } from "../../apply-move-to-grid/moves";
import { getFlatGrid } from "../../grid/get-flat-grid/get-flat-grid";
import { getGridPositionByFlatIndex } from "../../grid/get-grid-position-by-flat-index/get-grid-position-by-flat-index";

interface NeighborObject {
  grid: TileGrid;
  move: Move;
}

function getNeighborObject(
  grid: TileGrid,
  moveType: MoveType,
  flatGridIndex: number
): NeighborObject | undefined {
  const tilePosition = getGridPositionByFlatIndex(grid, flatGridIndex);

  if (tilePosition == null) {
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
  const allNeighborObjects: NeighborObject[] = [];

  for (
    let enabledMoveIndex = 0;
    enabledMoveIndex < enabledMoves.length;
    enabledMoveIndex++
  ) {
    for (
      let flatGridIndex = 0;
      flatGridIndex < flatGrid.length;
      flatGridIndex++
    ) {
      const neighborObject = getNeighborObject(
        grid,
        enabledMoves[enabledMoveIndex]!,
        flatGridIndex
      );
      if (neighborObject != null) {
        allNeighborObjects.push(neighborObject);
      }
    }
  }

  return allNeighborObjects;
}
