import { type Tile, type TileGrid } from "../../../types";
import { getManhattenDistance as getManhattenDistanceForGrid } from "../../grid/get-manhatten-distance/get-manhatten-distance";

export function getManhattenDistance(grid: TileGrid, targetGrid: TileGrid) {
  const isValidTarget = (tile: Tile, targetTile: Tile) => {
    if (tile.type === '*') return true;
    if (targetTile.type === '*') return true;

    return tile.type === targetTile.type
  }

  return getManhattenDistanceForGrid(grid, targetGrid, isValidTarget);
}
