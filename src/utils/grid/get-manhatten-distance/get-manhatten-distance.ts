import { type GridPosition } from "../../../types";
import { getDistanceByPositions } from "../../grid/get-distance-between/get-distance-by-position";
import { getFlatGrid } from "../../grid/get-flat-grid/get-flat-grid";
import { getGridPositionByFlatIndex } from "../../grid/get-grid-position-by-flat-index/get-grid-position-by-flat-index";

export function getManhattenDistance<T>(
  grid: T[][],
  targetGrid: T[][],
  isEntryValidTarget: (tile: T, targetTile: T) => boolean
) {
  const flatGrid = getFlatGrid(grid);
  const targetFlatGrid = getFlatGrid(targetGrid);

  return flatGrid.reduce((manhattenDistance, tile, flatGridIndex) => {
    const tilePosition = getGridPositionByFlatIndex(grid, flatGridIndex);
    const validTargetIndices = targetFlatGrid
      .map((targetTile, index) =>
        isEntryValidTarget(tile, targetTile) ? index : NaN
      )
      .filter(isFinite);

    if (validTargetIndices.length === 0) return NaN;

    const validTargetPositions = validTargetIndices.map((targetFlatGridIndex) =>
      getGridPositionByFlatIndex(targetGrid, targetFlatGridIndex)
    ) as GridPosition[];

    const distances = validTargetPositions.map((targetPosition) =>
      getDistanceByPositions(tilePosition, targetPosition)
    );

    return manhattenDistance + Math.min(...distances);
  }, 0);
}
