import { type TileGrid, type GridPosition } from "../../../types";

export function getTilePositionById(
  grid: TileGrid,
  tileId: string
): GridPosition | undefined {
  const numberOfColumns = grid[0]!.length;

  const tileIndex = grid.flat().findIndex((tile) => tile.id === tileId);

  if (tileIndex === -1) return undefined;

  return [
    Math.floor(tileIndex / numberOfColumns),
    Math.floor(tileIndex % numberOfColumns),
  ];
}
