import { Tile, TileGrid } from "../../../types";
import { getManhattenDistance as getManhattenDistanceForGrid } from "../../grid/get-manhatten-distance/get-manhatten-distance";

export function getManhattenDistance(grid: TileGrid, targetGrid: TileGrid) {
  const isValidTarget = (tile: Tile, targetTile: Tile) =>
    tile.type === targetTile.type;

  return getManhattenDistanceForGrid(grid, targetGrid, isValidTarget);
}
