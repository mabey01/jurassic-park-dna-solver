import { GridPosition } from "../../../types";
import { getGridDimensions } from "../get-grid-dimensions/get-grid-dimensions";

export function getGridPositionByFlatIndex<T>(
  grid: T[][],
  flatIndex: number
): GridPosition | undefined {
  const { numberOfColumns } = getGridDimensions(grid);
  if (flatIndex === -1) return undefined;

  return [
    Math.floor(flatIndex / numberOfColumns),
    Math.floor(flatIndex % numberOfColumns),
  ];
}
