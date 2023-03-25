import { TileType, TILE_TYPES } from "../../../types";

export function isTileType(tileType: string): tileType is TileType {
  return TILE_TYPES.includes(tileType as TileType);
}
